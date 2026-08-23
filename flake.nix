{
  description = "CompBio Team website";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});

      nodejs = pkgs: pkgs.nodejs_22;
    in
    {
      packages = forEachSystem (pkgs: rec {
        default = website;

        website = (pkgs.buildNpmPackage.override { nodejs = nodejs pkgs; }) {
          pname = "compbioteam-website";
          version = "0.1.0";

          src = ./.;

          # Refresh after any package-lock.json change:
          #   nix run nixpkgs#prefetch-npm-deps -- package-lock.json
          npmDepsHash = "sha256-zflsXNJhYix2MbZTyk+eFn1X0J+Nd/MUZVKJkDfqIEo=";

          npmBuildScript = "build";
          dontNpmInstall = true;

          installPhase = ''
            runHook preInstall
            cp -r _site "$out"
            runHook postInstall
          '';

          meta = {
            description = "Built static site for compbioteam.github.io";
            homepage = "https://compbioteam.github.io";
          };
        };
      });

      devShells = forEachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = [ (nodejs pkgs) ];

          shellHook = ''
            echo "Eleventy dev shell — node $(node --version), npm $(npm --version)"
            echo "  npm ci                       install dependencies"
            echo "  npx @11ty/eleventy --serve   dev server with live reload on :8080"
            echo "  npm run build                production build -> _site/"
            echo "  node bin/bib.mjs check       validate _data/pubs.bib"
            echo "  node bin/bib.mjs to-json     preview the data the site will render"
          '';
        };
      });

      apps = forEachSystem (pkgs: rec {
        default = serve;

        serve = {
          type = "app";
          program = pkgs.lib.getExe (pkgs.writeShellApplication {
            name = "serve";
            runtimeInputs = [ (nodejs pkgs) ];
            text = ''
              [ -d node_modules ] || npm ci --no-audit --no-fund
              exec npx @11ty/eleventy --serve "$@"
            '';
          });
        };

        # Check _data/pubs.bib, or dump it as the site's JSON data.
        #   nix run .#bib -- check
        #   nix run .#bib -- to-json
        bib = {
          type = "app";
          program = pkgs.lib.getExe (pkgs.writeShellApplication {
            name = "bib";
            runtimeInputs = [ (nodejs pkgs) ];
            text = ''
              [ -d node_modules ] || npm ci --no-audit --no-fund
              exec node bin/bib.mjs "$@"
            '';
          });
        };
      });

      formatter = forEachSystem (pkgs: pkgs.nixpkgs-fmt);
    };
}

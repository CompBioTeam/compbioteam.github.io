# CompBioTeam Website

## Testing the website

### With Nix (recommended)

The repository ships a flake that pins the whole toolchain. Run

```bash
nix run .#serve
```

to install all dependencies and serve the site at <http://localhost:8080> with live reload.

**Maintainers:** after changing dependencies (`package.json` / `package-lock.json`), refresh the
dependency hash in `flake.nix`:

```
nix run nixpkgs#prefetch-npm-deps -- package-lock.json
```

and paste the printed hash into `npmDepsHash`. To pick up newer package versions from nixpkgs, run
`nix flake update`.

### Without Nix

You will need [Node.js](https://nodejs.org/) 22 and to install the 11ty package from
[here](https://www.11ty.dev/docs/). Ensure that installation is a local install and not a global
install. Once the packages have been installed, you can deploy the website locally on your machine
using:
```
npm ci
npx @11ty/eleventy --serve
```

Please refer the documentation for more information.

## Instructions to students/alumni/collaborators

All students are required to only add information to the ```_data``` directory and to not edit files in any other files in the repository. Everything there is hand-edited: team and project data as JSON, publications as BibTeX (see below). You should fill in the ```students_ms.json``` or the ```students_phd.json``` files with your information as in individual entry in the members array. For collaborators, the relevant file is ```colab.json```. You are required to add the link to your isu profile. Each entry to the json file looks like:

```
{
  "name": "",
  "photo": "",
  "info": "",
  "website": "",
  "email": "",
  "interests": "[""]",
  "about": "",
  "github": "#"
}
```

You are required to upload a profile pic to the ```assets/images/team/``` directory as well and mention only the file name in the json entry. 

### Home Page

The homepage template is in ```index.md```. In order to change the homepage, you can simply edit the text in the homepage at the ```index.md``` file. Be careful to not alter any import section on any of the template files

### Home Page Carousel

To change the hompage carousel, please replace the image you want in place of one of the existing images. The new image must use the same name as the one it is replacing. Only four images will display in the carousel.

### Projects

If you would like to list your projects on the ASL website, you can add the link to the codebase on github in the ```projects.json``` in the ```_data```. Each entry to the json file looks like:

```
{
  "name": "",
  "photo": "",
  "github": "",
  "website": "",
  "about": ""
}
```
You are required to upload a profile pic to the ```assets/images/projects/``` directory as well and mention only the file name in the json entry.

`photo` and `website` are both optional. If the project has a deployed page (like but not necessarily GitHub Pages, usually `https://<owner>.github.io/<repo>/`) put its URL in `website` and a **Website** button appears at the bottom right of the card, beside the GitHub button. Leave the field out and no button renders. 

### Publications

Lab publications are listed in `_data/pubs.bib`.

```bibtex
@article{markin2022rf,
  title = {RF-Net 2: fast inference of virus reassortment and hybridization networks},
  author = {Markin, Alexey and Wagle, Sanket and Anderson, Tavis K and Eulenstein, Oliver},
  year = {2022},
  journal = {Bioinformatics},
  volume = {38},
  number = {8},
  pages = {2144--2152},
  url = {https://doi.org/10.1093/bioinformatics/btac075}
}
```

**Preprints** are detected automatically and shown in their own section above the year-by-year list. An entry counts as a preprint if it is on bioRxiv/medRxiv/arXiv. Alternatively, add `keywords = {preprint}` to the `.bib` entry to force it.

```bibtex
@article{smith2026something,
  title = {A Preprint About Supertrees},
  author = {Smith, Jane and Eulenstein, Oliver},
  year = {2026},
  journal = {bioRxiv},
  doi = {10.1101/2026.01.15.123456}
}
```

To check your work before committing, run

```bash
nix run .#bib -- check
```

to identify missing titles/years/authors, duplicate cite keys, and author fields that look like several names crammed together. `nix run .#bib -- to-json` prints the data exactly as the site will render it.

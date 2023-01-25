# ASL Website

## Testing the website

To test the website locally, you will need to install the 11ty package from [here](https://www.11ty.dev/docs/). ensure that installation is a local install and not a global install. once the packages have been installed, you can deploy the website locally on your machine using:
```
npx @11ty/eleventy --serve
```

Please refer the documentation for more information.

## Instructions to students/alumni/collaborators

All students are required to only add information to the ```_data``` directory and to not edit files in any other files in the repository. You should fill in the ```students_ms.json``` or the ```students_phd.json``` files with your information as in individual entry in the members array. For collaborators, the relevant file is ```colab.json```. You are required to add the link to your isu profile. Each entry to the json file looks like:

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
  "about": ""
}
```
You are required to upload a profile pic to the ```assets/images/projects/``` directory as well and mention only the file name in the json entry. 

### Publications

If you would like to list your publications on the ASL website, you can add the link to the publication and optionally on github in the ```pubs.json``` in the ```_data```, which is in BibJSON format. A sample entry to the json file looks like:

```
{
   "type": "article",
   "id": "markin2022rf",
   "citekey": "markin2022rf",
   "collection": "name",
   "title": "RF-Net 2: fast inference of virus reassortment and hybridization networks",
   "year": "2022",
   "author": [
    {
     "name": "Markin, Alexey"
    },
    {
     "name": "Wagle, Sanket"
    },
    {
     "name": "Anderson, Tavis K"
    },
    {
     "name": "Eulenstein, Oliver"
    }
   ],
   "journal": {
    "name": "Bioinformatics",
    "volume": "38",
    "number": "8",
    "pages": "2144--2152"
   }
  },
```

# <img src="https://raw.githubusercontent.com/enricobertolotti/xliff-translate/master/src/assets/icons/logos/icon_colorful.png" height=25/> Xliff Translation Web Interface
This is the repository for the web app currently hosted at 🌍 http://xliff-translate.s3-website-eu-west-1.amazonaws.com/. 

For new feature requests please shoot me an email at 📨hello@enricobertolotti.com! I'll try to get around to implementing them as soon as I can.



## Description


### 🗃️ Background
Sometimes (usually I think) translators are not programmers or engineers, and when faced with an XLIFF filto break something. Alternatives are either expensive, lack-features, or are coe they need to translate they are overwhelmed with all the XML tags and are scared nfusing to use. This web-app aims to solve those problems.

### 📜 Features
Here is a list of all current and planned features. For a more detailed overview of future features check out the [trello board](https://trello.com/b/HHcgwnXx/xliff-translate-web-app).

#### ✅ Current: 
* Batch upload and parse any XML file with an XLIFF tag in it. *⚠️ Warning: Some special characters are not supported yet and could display partially, incorrectly or not at all! Do not use for anything serious yet!*
* Stores the documents and translation progress in your browsers local storage so you dont lose them when you close the tab / browser / restart your computer. <sup>1</sup>
* All edits are automatically saved while you work.
* Download single xml file as well as download all current files as a .zip file.
* Show notes for each section if there are any.
* Display XML Version as well as source and target language of the XLIFF file.

#### 🚧 Planned:
* Add information pop-up to illustrate workflow. 
* Add possibility to add account and backup documents to firebase for syncing across devices.
* Automatically name zip file based on its contents.
* Add sections around linebreak and other special characters to make it impossible to break the XML. 
* Add translation suggestion on hover.


## Contributing

You want to contribute to the project? Awesome! 🍾 Fork the repository and follow the steps below to get started. You can also join the [discord server](https://discord.gg/hGjMAqaYQC) to chat about your ideas! Hope to see you there. 

### Install all project dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

*📝 Authors Note: As my first project truly meant for public contribution and targeted to be open source, any feedback and/or suggestions are very welcome!*

---

<sup>1</sup> If you clear your browsers cache all data including the documents will be deleted.

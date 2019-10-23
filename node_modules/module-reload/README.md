# module-reload

Reload required node modules


## Install:


```bash

  npm install module-reload

```


## Usage:


```javascript

  var reload = require("module-reload");

  // Require class MyAwesomeClass
  var MyAwesomeClass = reload("./my-awesome-class.js");

  // Require class MyAwesomeClass2 and reload class MyAwesomeClass
  var MyAwesomeClass2 = reload("./my-awesome-class2.js");

  // Reload both classes: MyAwesomeClass and MyAwesomeClass2
  reload();

```

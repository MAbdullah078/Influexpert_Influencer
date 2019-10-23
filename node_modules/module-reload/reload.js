var ReloadHistory = function() {
  var modules = [];
  var path = require("path");

  this.getModules = function() {
    return modules; 
  }

  this.resolvePath = function(module) {
    var realPath = module;
    if (realPath.indexOf("/") > -1) {
      realPath = path.resolve(realPath);   
    }
    return realPath;
  }

  this.addModule = function(module) {
    if (this.findModule(module) === false) {
      modules.push(module);
    }
    return modules.length - 1;
  }

  this.removeModule = function(module) {
    var index = findModule(module);
    return modules.splice(index, 1);
  }

  this.findModule = function(module) {
    for (var i = 0, l = modules.length; i < l; ++i) {
      if (modules[i] == module) {
        return i; 
      }
    } 
    return false;
  }

  this.reloadModule = function(module) {
    if (module) {
      var realPath = this.resolvePath(module);
      var required = this.requireModule(realPath);
      if (required) {
        this.addModule(realPath); 
        return required;
      }
    }
    return false;
  }

  this.requireModule = function(module) {
    try { 
      delete require.cache[require.resolve(module)];
      return require(module);
    } catch(error) {
      return false;
    }
  }

  this.reloadModules = function() {
    if (modules.length > 0) {
      var module = null;
      for (index in modules) {
        module = modules[index]; 
        this.reloadModule(module);
      } 
    }
    return this;
  }

  this.reload = function() {
    this.reloadModules(); 
    var module = null;
    for (var i = 0, l = arguments.length; i < l; ++i) {
      module = arguments[i];
      if (module) {
        return this.reloadModule(module);
      }
    }
  }
}

var reloadHistory = new ReloadHistory;

var reloadModule = function(module) {
  return reloadHistory.reload(module);
}

module.exports = reloadModule;

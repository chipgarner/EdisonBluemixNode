//Loads org, type, id, and authtoken as per Bluemix from a given file
//Throws an error if anything is missing

exports = module.exports = {};

var properties = require('properties');
 
exports.configuration = function(configFile, theConfig) {
        
  var configResult = function(config){
    theConfig(config);
  }
  
  properties.parse(configFile, { path: true }, function (err, config){
    if (err) throw err;

    if(!config.org){
        throw "Configuration should include an org field that specifies your organization.";
    }

    if(!config.type){
        throw "Configuration should include a type field that specifies your device type.";
    }

    if(!config.id){
        throw "Configuration should include an id field that specifies your device id.";
    }
    if(!config["auth-token"]){
      throw "Configuration should include an authorization token.";
    }

    configResult(config);

  });
}


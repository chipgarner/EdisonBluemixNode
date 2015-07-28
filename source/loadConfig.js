//Loads org, type, id, and authtoken as per Bluemix from a given file
//Throws an error if anything is missing

exports = module.exports = {};

var properties = require('properties');
 
exports.configuration = function(configFile, theConfig) {
 
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

    theConfig(connectConfig(config));

  });
}

var connectConfig = function(config) {
  var PROTOCOL = 'mqtt';
  var BROKER = config.org + '.messaging.internetofthings.ibmcloud.com';
  var PORT = 1883;

  //Create the url string
  var URL = PROTOCOL + '://' + BROKER;
  URL += ':' + PORT; 
  //url is e.g. 'mqtt://xrxlila.messaging.internetofthings.ibmcloud.com:1883'

  var CLIENTID = 'd:' + config.org;
  CLIENTID += ':' + config.type;
  CLIENTID += ':' + config.id;
  //CLIENTID -s e.g. d:xrxila:edison-air:784b87a81234

  var AUTHMETHOD = 'use-token-auth';//As of July 15 2015 this is the only one that works on Bluemix
  var  AUTHTOKEN = config['auth-token'];
    
  var requireds = { clientId: CLIENTID, username: AUTHMETHOD, password: AUTHTOKEN };
    
  var mqttConfig = { 'url' : URL, 'requireds' : requireds };
  return mqttConfig;
}


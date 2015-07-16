/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
Node.js application for connecting the Intel Edison Arduino to IBM Bluemix.
Sends data from an analog sensor on analog pin zero.
Requires registration on Bluemix. Edit the following to your Bluemix registration values:
ORG
TYPE
ID
AUTHTOKEN
*/

//Uses mqtt.js, see package.json. More info at: 
//https://www.npmjs.com/package/mqtt
var mqtt    = require('mqtt');
var client;

var org = 'comxyz';
var type = 'edison-dohickey';
var id = '123456789101';
var authtoken = 'ThisIsSecret';

var configFile = '/node_app_slot/device.cfg';
console.log(configFile);
var properties = require('properties');
//Asynchronous call makes no sense for a configuration file.
properties.parse(configFile, { path: true }, function (err, config){
  if (err) return console.error (err);

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

    org = config.org;
    type = config.type;
    id = config.id;
    authtoken = config['auth-token'];
    
    mqttConnect();

});

var mqttConnect = function() {
    var PROTOCOL = 'mqtt';
    var BROKER = org + '.messaging.internetofthings.ibmcloud.com';
    var PORT = 1883;

    //Create the url string
    var URL = PROTOCOL + '://' + BROKER;
    URL += ':' + PORT; 
    //URL is e.g. 'mqtt://xrxlila.messaging.internetofthings.ibmcloud.com:1883'

    var CLIENTID= 'd:' + org;
    CLIENTID += ':' + type;
    CLIENTID += ':' + id;
    //CLIENTID -s e.g. d:xrxila:edison-air:784b87a81234

    var AUTHMETHOD = 'use-token-auth';//As of July 15 2015 this is the only one that works on Bluemix

    client  = mqtt.connect(URL, { clientId: CLIENTID, username: AUTHMETHOD, password: authtoken });

    var TOPIC = 'iot-2/evt/status/fmt/json';

    client.on('connect', function () {
      setInterval(function(){
        client.publish(TOPIC, '{"d":{"Volts":' + analogVolts() + '}}');//Payload is JSON
      }, 2000);//Keeps publishing every 2000 milliseconds.
    });

}

//Connect to an analog sensor on Edison Arduino pin A0.
//Uses mraa included with Edison image.  More info at: 
//http://iotdk.intel.com/docs/master/mraa/index.html
//Edison Arduino returns drifting values if you have no sensor; you can see
//the "data" on Bluemix if you have no sensor connected on pin A0.
var mraa = require('mraa'); 
var pin0 = new mraa.Aio(0);
var analogVolts = function() {
  var counts = pin0.read();
  var volts = counts * 4.95 / 1023;
  return parseFloat(volts).toFixed(4);
};

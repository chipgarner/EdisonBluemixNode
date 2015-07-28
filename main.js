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
var mqtt = require('mqtt');

var configFile = '/node_app_slot/device.cfg';
var loadConfig = require('./source/loadConfig.js');
var client;

loadConfig.configuration(configFile, function(config){
    
  client  = mqtt.connect(config.url, config.requireds); 
  client.on('connect', function () {
   
    setInterval(function(){
      var TOPIC = 'iot-2/evt/status/fmt/json';
      client.publish(TOPIC, '{"d":{"Volts":' + getFakeVolts() + '}}');//Payload is JSON
    }, 2000);//Keeps publishing every 2000 milliseconds.
        
  });
})


//Connect to an analog sensor on Edison Arduino pin A0.
//Uses mraa included with Edison image.  More info at: 
//http://iotdk.intel.com/docs/master/mraa/index.html
//Edison Arduino returns drifting values if you have no sensor; you can see
//the "data" on Bluemix if you have no sensor connected on pin A0.

/* mraa broke!
var mraa = require('mraa'); 
var pin0 = new mraa.Aio(0);
var analogVolts = function() {
  var counts = pin0.read();
  var volts = counts * 4.95 / 1023;
  return parseFloat(volts).toFixed(4);
}; */

var fakeVolts =0.0;
var getFakeVolts = function() {
  var volts = fakeVolts;
  fakeVolts = fakeVolts +0.1;
  if (fakeVolts > 1.0) { fakeVolts = 0.0; }
  return volts;
}

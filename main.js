/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
Node.js application for connecting the Intel Edison Arduino to IBM Bluemix
using Quickstart.
Sends data from an analog sensor on analog pin zero (A0).
*/

//Change the following to your Edison's MAC address
var MAC = '784b87a801ee';

//Uses mqtt.js, see package.json. More info at: 
//https://www.npmjs.com/package/mqtt
var mqtt    = require('mqtt');

var PROTOCOL = 'mqtt';
var BROKER = 'quickstart.messaging.internetofthings.ibmcloud.com';
var PORT = 1883;

//Create the url string
var URL = PROTOCOL + '://' + BROKER;
URL += ':' + PORT; 
//URL is 'mqtt://quickstart.messaging.internetofthings.ibmcloud.com:1883'

var CLIENTID= 'd:quickstart:iotquick-edison:' + MAC;
var TOPIC = 'iot-2/evt/status/fmt/json';

var client  = mqtt.connect(URL, { clientId: CLIENTID });

client.on('connect', function () {
  setInterval(function(){
    client.publish(TOPIC, '{"d":{"Volts":' + analogVolts() + '}}');//Payload is JSON
  }, 2000);//Keeps publishing every 2000 milliseconds.
});

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

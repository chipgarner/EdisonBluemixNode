/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
Node.js application for connecting the Intel Edison Arduino to IBM Bluemix.

Sends data from an analog sensor on analog pin zero.
*/

//Uses mqtt.js, see package.json. More info at: https://www.npmjs.com/package/mqtt
var mqtt    = require('mqtt');

var protocol = 'mqtt';
var broker = 'quickstart.messaging.internetofthings.ibmcloud.com';// 'localhost' for local testing
var port = 1883;

var url = protocol + '://' + broker;
url += ':' + port; //url is e.g. 'mqtt://quickstart.messaging.internetofthings.ibmcloud.com:1883'

var mac = '784b87a801e9';
var clientid = 'd:quickstart:iotquick-edison:' + mac;
var topic = 'iot-2/evt/status/fmt/json';

var client  = mqtt.connect(url, { clientId: clientid });

client.on('connect', function () {
    // Uncomment for local testing:
    //client.subscribe(topic);
    
    setInterval(function(){
        client.publish(topic, '{"d":{"Volts":' + analogVolts() + '}}');
    }, 2000);//Keeps publishing every 2000 milliseconds.
});

//Un-comment for local testing
//client.on('message', function (topic, message) {
//  console.log(message.toString());
//});

//Connect to an analog sensor on pin 0.
//Uses mraa included with Edison image
var mraa = require('mraa'); 
console.log('MRAA Version: ' + mraa.getVersion());
var pin0 = new mraa.Aio(0);
var analogVolts = function() {
    var counts = pin0.read();
    var volts = counts * 4.95 / 1023;
    return parseFloat(volts).toFixed(4);
};
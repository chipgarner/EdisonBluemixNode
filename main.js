/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A simple node.js application intended to read data from Analog pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/



var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
var analogValue = analogPin0.read(); //read the value of the analog pin
console.log(analogValue); //write the value of the analog pin to the console

var mqtt    = require('mqtt');

//quickstart.messaging.internetofthings.ibmcloud.com
var client  = mqtt.connect('mqtt://quickstart.messaging.internetofthings.ibmcloud.com:1883', { clientId: 'd:quickstart:iotquick-edison:784b87a801e9' });

client.on('connect', function () {
    //client.subscribe('iot-2/evt/status/fmt/json');
   // var index = 0;
   // while (index < 10)
    //{
        setInterval(function(){
        client.publish('iot-2/evt/status/fmt/json', '{"d":{"Volts":' + analogVolts() + '}}');
        //index ++;
        }, 2000);
        
   // }
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  //client.end();
});

var analogVolts = function() {
    var counts = analogPin0.read();
    var volts = counts * 4.95 / 1023;
    return parseFloat(volts).toFixed(4);
};
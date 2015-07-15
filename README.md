Edison Bluemix App
============================
Node.js application intended to read data from Analog pin A0 on the Intel(R) Edison with Arduino breakout board and send it to IBM Bluemix.
Instructions are avaialble at https://developer.ibm.com/remix/tutorials/intel-edison/

Requires registration on Bluemix. Edit the following to your Bluemix registration values:
ORG
TYPE
ID
AUTHTOKEN

Intel(R) XDK 
-------------------------------------------
This app uses the Intel(R) XDK IoT Edition. 
See: https://software.intel.com/en-us/iot/library/edison-getting-started.

mraa
--------------------------------------------
* Included on the IoTDevkit Linux Image 

* source:  https://github.com/intel-iot-devkit/mraa
* license:  https://github.com/intel-iot-devkit/mraa/blob/9d488c8e869e59e1dff2c68218a8f38e9b959cd7/cmake/modules/LICENSE_1_0.txt

mqtt
--------------------------------------------
* source:  https://github.com/mqttjs/MQTT.js
* MIT license:  https://www.npmjs.com/package/mqtt#license
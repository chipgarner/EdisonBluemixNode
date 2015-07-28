//Install mocha globall:
//npm install -g mocha
//Install chai in your project directory:
//npm install chai
//Note that you don't want these on the Edison

var expect = require('chai').expect;
var loadConfig = require('../source/loadConfig.js');
 
describe('LoadConfig', function(){
  describe('#configuration()', function(){ 
      
    it('should load correct results', function(done){          
      loadConfig.configuration('testdevice.tst', function(results){
        expect(results).to.have.a.property('url', 'mqtt://blerg.messaging.internetofthings.ibmcloud.com:1883');
        expect(results.requireds).to.have.a.property('clientId', 'd:blerg:verynice-type:79c4b87a80f3a');
        expect(results.requireds).to.have.a.property('username', 'use-token-auth');
        expect(results.requireds).to.have.a.property('password', 'whatever');
        done();
      });
    });
      
  });
});


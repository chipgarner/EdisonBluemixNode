//Install mocha globall:
//npm install -g mocha
//Install chai in your project directory:
//npm install chai
//Note that you don't want these on the Edison

var expect = require('chai').expect;
var loadConfig = require('../source/loadConfig.js');
 
describe('LoadConfig', function(){
  describe('#configuration()', function(){ 
      
    it('should load without error', function(done){          
      loadConfig.configuration('testdevice.tst', function(results){
        done();
      });
    });
      
    it('should load correct results', function(done){          
      loadConfig.configuration('testdevice.tst', function(results){
        expect(results).to.have.a.property('org', 'blerg');
        expect(results).to.have.a.property('type', 'verynice-type');
        expect(results).to.have.a.property('id', '79c4b87a80f3a');
        expect(results).to.have.a.property('auth-token', 'whatever');
        done();
      });
    });
      
  });
});
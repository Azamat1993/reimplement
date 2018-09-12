var Promise = require('../src/promise');

describe('Promise', function(){
  it('should be defined', function(){
    expect(Promise).toBeDefined();
  });

  it('should set value with then', function(done) {
    var promise = new Promise(function(resolve) {
      resolve(42);
    });

    promise.then(function(res) {
      expect(res).toBe(42);
      done();
    });
  });

  it('should be able to subscribe to promise before resolving', function(done){
    var number = 42;

    var promise = new Promise(function(resolve) {
      setTimeout(function(){
        resolve(number);
      }, 100);
    });

    promise.then(function(res) {
      expect(res).toBe(number);
      done();
    });
  });
});

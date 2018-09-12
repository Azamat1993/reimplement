function Promise(fn) {
  var state = 'pending';
  var value;
  var deferred;

  function resolve(newValue) {
    if (newValue && typeof newValue.then === 'function') {
      newValue.then(resolve);
      return;
    }

    value = newValue;
    state = 'resolved';

    if (deferred) {
      handle(deferred);
    }
  }

  function handle(handler) {
    if (state === 'pending') {
      deferred = handler;
      return;
    }

    if (!handler.onResolved) {
      handler.resolve(value);
      return;
    }

    var rt = handler.onResolved(value);
    handler.resolve(rt);
  }

  this.then = function(onResolved) {
    return new Promise(function(resolve) {
      handle({
        onResolved: onResolved,
        resolve: resolve
      })
    })
  }

  fn(resolve);
}

module.exports = Promise;

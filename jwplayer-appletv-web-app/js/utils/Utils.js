var Utils = (function () {

  /**
   * Generates a random id with the specified length.
   */
  function genId(len) {
    return new Array(len + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, len);
  }

  /**
   * Utility method for extending objects.
   */
  function extend(obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index];
      var keys = [];
      for (var i in source) {
        if (source.hasOwnProperty(i)) {
          keys.push(i);
        }
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        obj[key] = source[key];
      }
    }
    return obj;
  }

  return {
    genId: genId,
    extend: extend
  }
})();

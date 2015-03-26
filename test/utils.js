var utils = require('../public/js/utils');
var assert = require('assert');

describe('public/js/utils.js', function() {
  it('should return the minute given seconds', function() {
    assert.equal(utils.getMinute(431), 7);
  });

  it('should return the second given seconds', function() {
    assert.equal(utils.getSecond(431), 11);
  });

  it('should parse seconds into minute, second', function() {
    assert.deepEqual(utils.parseTime(431), { min: 7, sec: 11 });
  });

  it('should return artists of a track', function() {
    assert(false);
  });
});

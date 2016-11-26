if (typeof require !== 'undefined') {
	var assert = require('chai').assert,
		AppUtil = require('../../../app/modules/utils/util.js').AppUtil;
} else {
	var assert = chai.assert,
		AppUtil = App.Util;
}

describe('App.Util', function() {

  beforeEach(function() {
	 config = {
	 		color : {
			none : 0,
			available : {
				red : 1,
				blue : 2,
				orange : 3,
				yellow : 4,			
				gray : 5
			}
		}
	 };
  });

  describe('#getNbColors()', function() {
  	
    it('should return the number of available colors in the config object', function() {
  		assert.equal(5, AppUtil.getNbColors());
    });

  });

});
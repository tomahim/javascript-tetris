var assert = chai.assert;

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
      assert.equal(5, App.Util.getNbColors());
    });

  });

});
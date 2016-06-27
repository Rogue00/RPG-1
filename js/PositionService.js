var PositionService = (function () {
	this.positions = [];

	var findPosition = function(elm) {
		for(var i=0;i<this.positions.length;i++) {
			if(this.positions[i][0]===elm) {
				return this.positions[i];
			}
		}
		return null;
	}

	this.setPosition = function(obj,x,y) {
		var elm = findPosition(obj);
		if(elm==null) {
			this.positions.push([obj,x,y]);
		} else {
			elm[1] = x;
			elm[2] = y;
		}
	}
	
	this.getPosition = function(obj) {
		var elm = findPosition(obj);
		if(elm==null) {
			return null;
		} else {
			return {x: elm[1], y: elm[2]};
		}
	}
	
	return this;
})();
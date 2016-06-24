var PositionService = (function () {
	this.positions = [];

	var findPosition = function(element, index) {
		return element[0]==this;
	}

	this.setPosition = function(obj,x,y) {
		var elm = this.positions.find(findPosition,obj);
		if(elm===undefined) {
			this.positions.push([obj,x,y]);
		} else {
			elm[1] = x;
			elm[2] = y;
		}
	}
	
	this.getPosition = function(obj) {
		var elm = this.positions.find(findPosition,obj);
		if(elm===undefined) {
			return null;
		} else {
			return {x: elm[1], y: elm[2]};
		}
	}
	
	return this;
})();
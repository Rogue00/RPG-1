var CollisionService = new function() {

	this.hitTest = function(obj,collisionSet,movement) {
		var hits = [];
		var a = {
			position: { x: obj.position.x + movement.x, y: obj.position.y + movement.y},
			size: {w: obj.size.w, h: obj.size.h}
		}

		for(var i=0;i<collisionSet.colliders.length;i++) {
			var hitTest = this.checkCubicHit(a,collisionSet.colliders[i]);
			if(hitTest.length > 0) {
				hits.push({hitRect:hitTest, collidor: collisionSet.colliders[i]});
			}
		}
		
		return hits;
	}

	this.checkCubicHit = function(a,b) {
		var out = {
			top: (a.position.y + a.size.h) < (b.position.y) ? true: false,
			bottom: a.position.y > (b.position.y + b.size.h) ? true: false,
			left: ((a.position.x + a.size.w) < b.position.x) ? true: false,
			right: a.position.x > (b.position.x + b.size.w) ? true: false
		}
		if(!(out.top || out.bottom || out.left || out.right)) {
			var x = Math.max(a.position.x, b.position.x);
			var y = Math.max(a.position.y, b.position.y);
			var num1 = Math.min(a.position.x + a.size.w, b.position.x + b.size.w);
			var num2 = Math.min(a.position.y + a.size.h, b.position.y + b.size.h);
			return [x << 0, y << 0, (num1 - x) << 0, (num2 - y)<<0];
		}
	
		return [];
	}

};





	
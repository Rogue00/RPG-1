Fire.prototype = Object.create(PlateContent.prototype);
Fire.prototype.constructor = PlateContent;
	
var fireTexture = new Image();
fireTexture.src = "img/fire.png";


function Fire(x,y) {
	PlateContent.call(this,64,64);
	
	this.getPosition = function() {
		return {
			x: x,
			y: y
		}
	}
	var locked = false;
	this.handleHit = function(hitObj) {
		if(KeyboardService.keysPressed.space) {
			console.log(locked);
			if(!locked) {
				locked = true;
				setTimeout(function(){locked=false},1000);
			}
		}
	}

	fireTexture.addEventListener('load',function() {
		this.needsRedraw = true;
		this.draw();
	}.bind(this));
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.fillStyle = this.context.createPattern(fireTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
}
Fire.prototype = Object.create(PlateContent.prototype);
Fire.prototype.constructor = PlateContent;



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
			if(!locked) {
				locked = true;
				DialogService.addMessage("I am hungry...");
				setTimeout(function(){locked=false},1000);
			}
		}
	}
	
	this.loop = function() {
	}

	var fireTexture = new Image();
	fireTexture.src = "img/fire.png";
	fireTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.draw = function() {
		console.log("FIRE");
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.fillStyle = this.context.createPattern(fireTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
}
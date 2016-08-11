function PlateContent(width,height,x,y) {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
    
  this.needsRedraw = false;
  
  this.position = {
    x:x,
    y:y 
  }
  
  this.spritePosition = {x:0,y:0};
  
  this.getPosition = function() {
		return {
			x: this.position.x,
			y: this.position.y
		}
	} 
  
  this.size = {
		w: width,
		h: height
	}
  
  this.colliders = [];
  
	this.loop = function() {
    for(var i=0;i<this.colliders.length;i++) {
      var collider = this.colliders[i];
      collider.loop();
      if(collider.needsRedraw) {
        this.needsRedraw = true;
      }
    }
		return this.needsRedraw;
	}
  
  this.draw = function() {
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
  
}
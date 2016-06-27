function PlateContent(width,height) {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  this.needsRedraw = false;
  
  this.getCanvas = function() {
    return this.canvas;
  }
  
  this.size = {
		w: width,
		h: height
	}
  
  this.loop = function() {
  }
  
  this.draw = function() {
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}
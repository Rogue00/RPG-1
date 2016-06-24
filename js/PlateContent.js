function PlateContent(width,height,text) {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  this.needsRedraw = false;
  
  var bgColor = '#'+Math.random().toString(16).substr(-6);
  
  this.getCanvas = function() {
    return this.canvas;
  }
  
  this.size = {
		w: width,
		h: height
	}
  
  this.loop = function() {
    if(this.needsRedraw) this.draw();
  }
  
  this.draw = function() {
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.fillStyle = bgColor;
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    //context.strokeRect(0,0,canvas.width,canvas.height);
    this.context.fillStyle = '#fff';
    this.context.font='30px Arial';
    this.context.fillText(text,10,30);
    
  }
  this.draw();
}
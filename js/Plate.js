function Plate(width, height) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  var content = null;
  this.needsRedraw = false;
  
  this.getCanvas = function() {
    return canvas;
  }
  
  this.clearContent = function() {
    try {
      content.destroy();
      content = null;
      this.needsRedraw = true;
    } catch(ex) {
      
    }
  }
  
  this.setContent = function(contentCanvas) {
    content = contentCanvas;
    this.needsRedraw = true;
  }
  
  this.getContent = function() {
    return content;
  }
  
  this.loop = function() {
    if(content!=null) {
      content.loop();
      if(content.needsRedraw) {
        this.needsRedraw = true;
      }
    }
  }
  
  this.draw = function() {
    if(content!=null) {
      content.draw();
    }
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    context.clearRect(0,0,canvas.width,canvas.height);
    
    if(content.getCanvas()!=null)
      context.drawImage(content.getCanvas(),0,0);
  }
  
}
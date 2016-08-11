function Plate(width, height) {
  this.canvas = document.createElement('canvas');
  var context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  var content = null;
  this.needsRedraw = false;
 
  
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
    return this.needsRedraw;
  }
  
  this.draw = function() {
    if(content!=null) {
      content.draw();
    }
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    //context.clearRect(0,0,this.canvas.width,this.canvas.height);
    
    if(content.canvas!=null)
      context.drawImage(content.canvas,0,0);
  }
  
}
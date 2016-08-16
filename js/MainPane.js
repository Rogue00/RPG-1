MainPane.prototype = Object.create(Drawable.prototype);
MainPane.prototype.constructor = Drawable;
	
function MainPane(width, height, contentPlates) {
	Drawable.call(this,0,0,width,height);
  
  this.currentColliderSet = null;
  
  this.translation = {
    x: 0,
    y: 0
  }; 
 
  //Calculate Start Position
  var cX = -1;
  var cY = -1;
  
  this.size = {
    w: width,
    h: height
  } 
  
  //Draw 3x3 plates
  for(var i=0;i<3;i++) { 
    for(var b=0;b<3;b++) { 
      this.content.push(new Drawable(b*AppConfig.appWidth,i*AppConfig.appHeight,AppConfig.appWidth,AppConfig.appHeight)); 
    } 
  } 
  
  this.getColliderSet = function() {
    return this.currentColliderSet;
  }
  
  this.generateColliderSet = function() {
    var colliderSet = {
      offset: 0,
      colliders: []
    }
    for(var i=0;i<3;i++) {
      for(var b=0;b<3;b++) {
        var colliders = this.content[(i*3)+b].content[0].colliders;
        if(colliders!=undefined) {
          for(var j=0;j<colliders.length;j++) {
            var collider = colliders[j];
            colliderSet.colliders.push({
              obj: collider,
              size: collider.size,
              position: {
                x: collider.position.x + ((cX-1)*this.canvas.width/3) + (b*this.canvas.width/3),
                y: collider.position.y + ((cY-1)*this.canvas.height/3) + (i*this.canvas.height/3)
              }
            });
          }
        }
      }
    }
    this.currentColliderSet = colliderSet;
  }
  
  this.goto = function(x,y) {
    cY = y;
    cX = x;
    this.translation = {
      x: this.canvas.width/3,
      y: this.canvas.height/3
    }; 
    this.rearrange();
  }
  
  this.getPosition = function() {
    return {
      x: (cX-1)*(this.size.w/3)+this.translation.x,
      y: (cY-1)*(this.size.h/3)+this.translation.y
    }
  }
  
  this.getPlatesOffset = function() {
    return {
      x: (cX-1)*(this.size.w/3),
      y: (cY-1)*(this.size.h/3)
    }
  }
  
  this.userLoop = function() {
    this.generateColliderSet();
  }
  
  
  this.center = function(x,y) {
    var newCX = (x/(this.size.w/3)<<0);
    var newCY = (y/(this.size.h/3)<<0);
    if((newCX!=cX && newCX>=0 && newCX<contentPlates.length-1) || (newCY!=cY && newCY>=0 && newCY<contentPlates[0].length-1)) {
      cX = newCX > 0 && newCX < contentPlates.length-1 ? newCX : newCX<1 ? 1 : contentPlates.length-2;
      cY = newCY > 0 && newCY < contentPlates[0].length-1 ? newCY : newCY < 1 ? 1 : contentPlates[0].length-2
      this.rearrange();
    }

    this.translation = {
      x: x-(cX-1)*this.canvas.width/3-(this.canvas.width/3/2),
      y: y-(cY-1)*this.canvas.height/3-(this.canvas.height/3/2)
    }
    
    if(this.translation.x<0) {
      this.translation.x = 0;
    }
    if(this.translation.y<0) {
      this.translation.y = 0;
    }
    
    if(this.translation.y > this.canvas.height-(this.canvas.height/3)) {
      this.translation.y = this.size.h-this.canvas.height/3;
    }
    
    if(this.translation.x > this.canvas.width-(this.canvas.width/3)) {
      this.translation.x = this.size.w-this.canvas.width/3;
    } 
       
  }
  
  this.rearrange = function() {
    for(var i=0;i<3;i++) {
      for(var b=0;b<3;b++) {
        this.content[(i*3)+b].content = [contentPlates[cX+b-1][cY+i-1]];
        this.content[(i*3)+b].needsRedraw = true;
      } 
    }
    this.generateColliderSet();
    this.needsRedraw = true;
  }

}
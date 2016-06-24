
function MainPane(width, height, contentPlates) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  this.needsRedraw = false;
  this.currentColliderSet = null;
  
  canvas.width = width;
  canvas.height = height;
  this.translation = {
    x: canvas.width/3,
    y: canvas.height/3
  }; 
 
  
  this.size = {
    w: width,
    h: height
  } 
  
  var plates = []; 
  for(var i=0;i<3;i++) { 
    plates[i] = []; 
    for(var b=0;b<3;b++) { 
      plates[i].push(new Plate(960,544)); 
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
    
    for(var i=0;i<plates.length;i++) {
      for(var b=0;b<plates[i].length;b++) {
        if(plates[i][b].getContent()) {
          if(plates[i][b].getContent().colliders!=undefined) {
            for(var j=0;j<plates[i][b].getContent().colliders.length;j++) {
              colliderSet.colliders.push({
                size: plates[i][b].getContent().colliders[j].size,
                position: {
                  x: plates[i][b].getContent().colliders[j].getPosition().x+((cX-1)*canvas.width/3)+(i*canvas.width/3),
                  y: plates[i][b].getContent().colliders[j].getPosition().y+((cY-1)*canvas.height/3)+(b*canvas.height/3)
                },
                obj: plates[i][b].getContent().colliders[j]
              });
            }
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
      x: canvas.width/3,
      y: canvas.height/3
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
  
  
  
  this.center = function(x,y) {
    var newCX = (x/(canvas.width/3)<<0);
    var newCY = (y/(canvas.height/3)<<0);
    
    if(newCX!=cX || newCY!=cY) {
      cX = newCX > 0 && newCX < contentPlates.length-1 ? newCX : newCX<1? 1 : contentPlates.length-2;
      cY = newCY > 0 && newCY < contentPlates[0].length-1 ? newCY : newCY < 1 ? 1 : contentPlates[0].length-2
      this.rearrange();
    }

    this.translation = {
      x: x-(cX-1)*canvas.width/3-(canvas.width/3/2),
      y: y-(cY-1)*canvas.height/3-(canvas.height/3/2)
    }
    
    if(this.translation.x<0) {
      this.translation.x = 0;
    }
    if(this.translation.y<0) {
      this.translation.y = 0;
    }
    
    if(this.translation.y > canvas.height-(canvas.height/3)) {
      this.translation.y = this.size.h-canvas.height/3;
    }
    
    if(this.translation.x > canvas.width-(canvas.width/3)) {
      this.translation.x = this.size.w-canvas.width/3;
    } 
       
  }
  
  //Calculate Start Position
  var cX = contentPlates.length/2<<0;
  var cY = contentPlates[cX].length/2<<0;
  
  
  this.rearrange = function() {
    for(var i=0;i<plates.length;i++) {
      for(var b=0;b<plates[i].length;b++) {
        plates[i][b].setContent(contentPlates[cX-((plates.length/2<<0)-i)][cY-((plates[i].length/2<<0)-b)]);
      } 
    }
    this.generateColliderSet();
    this.needsRedraw = true;
  }
  
  this.getCanvas = function() {
    return canvas;
  } 
  
  this.loop = function() {
    for(var i=0;i<3;i++) {
      for(var b=0;b<3;b++) {
        plates[i][b].loop();
        if(plates[i][b].needsRedraw) {
          this.needsRedraw = true;
        }
      } 
    }
  }
  
  this.draw = function() {
    for(var i=0;i<3;i++) {
      for(var b=0;b<3;b++) {
        plates[i][b].draw(); 
      } 
    }
    if(!this.needsRedraw) return;
    this.needsRedraw = false;
    
    for(var i=0;i<3;i++) {
      for(var b=0;b<3;b++) {
        context.drawImage(plates[i][b].getCanvas(),i*(canvas.width/3),b*(canvas.height/3));
      } 
    }
    
  } 
  this.rearrange();
}
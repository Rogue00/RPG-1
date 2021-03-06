function Drawable(x,y,width,height) {
  //DOM
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  
  //Properties
  this.needsRedraw = false;
  
  this.hits = false;
  
  this.position = {
    x:x,
    y:y 
  }
  
  this.size = {
		w: width,
		h: height
	}
  
  this.alpha = 1;
  
  this.tweens = [];
  this.content = [];
  this.colliders = [];
  
  this.spritePosition = {x:0,y:0};
  
  
  //Methods
  this.getPosition = function() {
		return this.position;
	}
  
	this.setPosition = function(x,y) {
		this.position.x = x;
		this.position.y = y;
	}
	
	this.move = function(x,y) {
		this.position.x +=x;
		this.position.y +=y;
	}
  
  this.tweenLoop = function() {
    var deleteableTweens = [];
    for(var i=0;i<this.tweens.length;i++) {
      var tween = this.tweens[i];
      if(tween.deleteable) {
        deleteableTweens.push(tween);
      }
      tween.tick();
    }
    for(var i=0;i<deleteableTweens.length;i++) {
      this.tweens.splice(this.tweens.indexOf(deleteableTweens[i]),1);
    }
  }
  
  
  
	this.loop = function() {
    this.tweenLoop();
    
    for(var i=0;i<this.colliders.length;i++) {
      var collider = this.colliders[i];
      collider.loop();
      if(collider.needsRedraw) {
        this.needsRedraw = true;
      }
    }
    
    for(var i=0;i<this.content.length;i++) {
      var content = this.content[i];
      if(content.loop()) {
        this.needsRedraw = true;
      }
    }
    
    if(this.userLoop!=undefined) {
      this.userLoop();
    }
    
		return this.needsRedraw;
    
	}
  
  this.needsRepaint = false;
  this.rePaint = function() {
    
  }
  
  this.draw = function() {
    if(!this.needsRedraw) return;
    AppConfig.dpl++;
    this.context.clearRect(0,0,this.size.w,this.size.h);
    
    this.needsRedraw = false;
    this.context.globalAlpha = this.alpha;
    
    if(this.userDraw!=undefined) {
      this.userDraw();
    }
    
    for(var i=0;i<this.content.length;i++) {
			this.content[i].draw();
      this.context.drawImage(this.content[i].canvas,this.content[i].position.x,this.content[i].position.y);	  
		}
    
    for(var i=0;i<this.colliders.length;i++) {
			this.colliders[i].draw();
      this.context.drawImage(this.colliders[i].canvas,this.colliders[i].position.x,this.colliders[i].position.y);	      
		}
    
  }
  
}
function App(initCanvas) {
  var canvas = initCanvas;
  canvas.style.backgroundColor = '#000';
  canvas.width = "960";
  canvas.height = "544";
  
  var context = canvas.getContext('2d');
  var contentPlates = [];
  
  var SHIFTSPEED = 5;
  
  for(var i=0;i<50;i++) {
    contentPlates[i] = [];
    for(var b=0;b<50;b++) {
      var rnd = Math.random();
      if(rnd<0.25) {
        contentPlates[i].push(new Grassland(960,544,"X:"+i+"| Y:"+b));
      } else if(rnd>0.5) {
        contentPlates[i].push(new Streetland(960,544,"X:"+i+"| Y:"+b));
      } else {
        contentPlates[i].push(new MazeLand(960,544,"X:"+i+"| Y:"+b));
      }
    }
  }
  
  
  var mainPane = new MainPane(3*canvas.width,3*canvas.height,contentPlates);
  mainPane.draw();
  
  this.goto = function(x,y) {
    mainPane.goto(x,y);
  }
  
  var hero = new Hero();
  //Set Hero start Position
  PositionService.setPosition(hero,2400,1360);
  
  var loop = function() {
    window.requestAnimationFrame(loop);
    
    var movement = {
      x:0,
      y:0
    };
    if(KeyboardService.keysPressed.right) {
      movement.x += SHIFTSPEED;      
    }
    
    if(KeyboardService.keysPressed.left) {
      movement.x -= SHIFTSPEED;
    }
        
    if(KeyboardService.keysPressed.up) {
      movement.y -= SHIFTSPEED;
    }
    
    if(KeyboardService.keysPressed.down) {
      movement.y += SHIFTSPEED;
    }
    
    if(hero.getPosition().x+movement.x<0) {
      movement.x = -hero.getPosition().x;
    }
    
    if(hero.getPosition().x + movement.x + hero.size.w > (contentPlates[0].length)*canvas.width) {
      movement.x = (contentPlates[0].length)*canvas.width - hero.getPosition().x - hero.size.w;
    }
    
    
    if(hero.getPosition().y+movement.y<=0) {
      movement.y = -hero.getPosition().y;
    }
    
  
    if(hero.getPosition().y + movement.y + hero.size.h>(contentPlates.length)*canvas.height) {
      movement.y = (contentPlates.length)*canvas.height - hero.getPosition().y - hero.size.h;
    }
    
    var colliderSet = mainPane.getColliderSet();
    var hitRects = CollisionService.hitTest(hero,colliderSet,movement);
    hero.handleHit(hitRects,movement);
    
    hero.move(movement.x,movement.y);
    mainPane.center(hero.getPosition().x,hero.getPosition().y);
    
    
    mainPane.loop();
    mainPane.draw();
    
    context.drawImage(mainPane.getCanvas(),
						mainPane.translation.x,
						mainPane.translation.y, 
						mainPane.size.w - mainPane.translation.x,
						mainPane.size.h - mainPane.translation.y,
						0,
						0,
						mainPane.size.w  - mainPane.translation.x,
						mainPane.size.h - mainPane.translation.y);
    

    
    
    
    
    hero.loop();
    hero.draw();

    /*
    context.fillStyle = '#fff';
    context.font='30px Arial';
    context.fillText(hero.getPosition(hero).x+"|"+hero.getPosition(hero).y,50,90);
    */
    
    
    
    context.drawImage(hero.getCanvas(), hero.getPosition().x-mainPane.getPosition().x, hero.getPosition().y-mainPane.getPosition().y);
       
  }
  

  
  loop();
  
}



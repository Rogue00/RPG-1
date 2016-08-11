function App(initCanvas) {
  var canvas = initCanvas;
  canvas.style.backgroundColor = '#000';
  canvas.width = AppConfig.appWidth;
  canvas.height = AppConfig.appHeight;
  
  var context = canvas.getContext('2d');
  var contentPlates = [];
  
  var SHIFTSPEED = 3;
  
  for(var i=0;i<20;i++) {
    contentPlates[i] = [];
    for(var b=0;b<20;b++) {
      var rnd = Math.random();
      if(rnd<0.25) {
        contentPlates[i].push(new Grassland(AppConfig.appWidth,AppConfig.appHeight));
      } else if(rnd>0.5) {
        contentPlates[i].push(new Streetland(AppConfig.appWidth,AppConfig.appHeight));
      } else {
        contentPlates[i].push(new MazeLand(AppConfig.appWidth,AppConfig.appHeight));
      }
    }
  }
  
  var mainPane = new MainPane(3*canvas.width,3*canvas.height,contentPlates);

  var hero = new Hero();
  //Set Hero start Position
  PositionService.setPosition(hero,2400,1160);
  
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
    
    // Check if hero is on the edges
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
    
    // Hittest
    var colliderSet = mainPane.getColliderSet();
    var hitRects = CollisionService.hitTest(hero,colliderSet,movement);
    hero.handleHit(hitRects,movement);
    
    hero.move(movement.x,movement.y);
    
    //Center mainPane on hero position
    mainPane.center(hero.getPosition().x,hero.getPosition().y);
    
    //Tick mainPane and draw
    if(mainPane.loop()) {
      mainPane.draw();
    }
    context.drawImage(mainPane.canvas,
						mainPane.translation.x,
						mainPane.translation.y, 
						mainPane.size.w - mainPane.translation.x,
						mainPane.size.h - mainPane.translation.y,
						0, 0,
						mainPane.size.w  - mainPane.translation.x,
						mainPane.size.h - mainPane.translation.y);
    
    //Tick hero and draw
    if(hero.loop()) {
      hero.draw();
    }
    context.drawImage(hero.canvas, hero.getPosition().x-mainPane.getPosition().x, hero.getPosition().y-mainPane.getPosition().y);
    
    
    
    //Draw inventory
    if(InventoryService.loop()) {
      InventoryService.draw();
    }
    context.drawImage(InventoryService.canvas, canvas.width-InventoryService.canvas.width-10,canvas.height/2-InventoryService.canvas.height/2);
       
       
    //Draw dialogs
    context.drawImage(DialogService.canvas, canvas.width/2-DialogService.canvas.width/2, canvas.height-DialogService.canvas.height);
    
    TweenService.loop();
    mainPane.generateColliderSet();
  }
  
  
  window.setTimeout(function() {
    DialogService.addMessage(["My name's Grimwald Gudmund,", "and I want to be a Viking!" /*,"Look behind you... a three headed dragon!" */], 5000,"#fff","#000")
  }
  ,4000);
  
  loop();
  
}



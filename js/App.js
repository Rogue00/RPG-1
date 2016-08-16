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
        contentPlates[i].push(new Grassland(AppConfig.appWidth,AppConfig.appHeight,b+"|"+i));
      } else if(rnd>0.5) {
        contentPlates[i].push(new Streetland(AppConfig.appWidth,AppConfig.appHeight,b+"|"+i));
      } else {
        contentPlates[i].push(new MazeLand(AppConfig.appWidth,AppConfig.appHeight,b+"|"+i));
      }
    }
  }
  
  var mainPane = new MainPane(3*canvas.width,3*canvas.height,contentPlates);

  var hero = new Hero(2400,1160);
  mainPane.center(hero.position.x,hero.position.y);
    
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
    if(hero.position.x+movement.x<0) {
      movement.x = -hero.position.x;
    }
    
    if(hero.position.x + movement.x + hero.size.w > (contentPlates[0].length)*canvas.width) {
      movement.x = (contentPlates[0].length)*canvas.width - hero.position.x - hero.size.w;
    }
    
    
    if(hero.position.y+movement.y<=0) {
      movement.y = -hero.position.y;
    }
    
  
    if(hero.position.y + movement.y + hero.size.h>(contentPlates.length)*canvas.height) {
      movement.y = (contentPlates.length)*canvas.height - hero.position.y - hero.size.h;
    }
    
    // Hittest
    var colliderSet = mainPane.getColliderSet();
    var hitRects = CollisionService.hitTest(hero,colliderSet,movement);
    hero.handleHit(hitRects,movement);
    
    hero.move(movement.x,movement.y);
    
    //Center mainPane on hero position
    mainPane.center(hero.position.x,hero.position.y);
    
    //Tick mainPane and draw
    mainPane.loop();
    mainPane.draw();
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
    context.drawImage(hero.canvas, hero.position.x-mainPane.getPosition().x, hero.position.y-mainPane.getPosition().y);
    
    
    
    //Draw inventory
    if(InventoryService.loop()) {
      InventoryService.draw();
    }
    context.drawImage(InventoryService.canvas, canvas.width-InventoryService.canvas.width-10,canvas.height/2-InventoryService.canvas.height/2);
       
       
    //Draw dialogs
    context.drawImage(DialogService.canvas, canvas.width/2-DialogService.canvas.width/2, canvas.height-DialogService.canvas.height);
    
    //TweenService.loop();
    //mainPane.generateColliderSet();
    
    context.fillStyle = '#fff';	
		context.font = '18px verdana';
		context.textBaseline = 'top';
		context.fillText('FPS: '+ FPS.getFPS(), 0,0);
  }
  
  
  window.setTimeout(function() {
    DialogService.addMessage(["My name's Grimwald Gudmund,", "and I want to be a Viking!" /*,"Look behind you... a three headed dragon!" */], 5000,"#fff","#000")
  }
  ,4000);
 
  
  loop();
  
}



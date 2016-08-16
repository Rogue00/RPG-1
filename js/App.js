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
    context.drawImage(hero.canvas, hero.position.x-mainPane.getPosition().x, hero.position.y-mainPane.getPosition().y);
    
    //Draw inventory
    if(Inventory.loop()) {
      Inventory.draw();
    }
    context.drawImage(Inventory.canvas, canvas.width-Inventory.canvas.width-10,canvas.height/2-Inventory.canvas.height/2);
       
       
    //Draw dialogs
    context.drawImage(Dialog.canvas, canvas.width/2-Dialog.canvas.width/2, canvas.height-Dialog.canvas.height);
    
    context.fillStyle = '#fff';	
		context.font = '18px verdana';
		context.textBaseline = 'top';
		context.fillText('FPS: '+ FPS.getFPS(), 0,0);
  }
  
  
  window.setTimeout(function() {
    Dialog.addMessage(["My name's Grimwald Gudmund,", "and I want to be a Viking!" /*,"Look behind you... a three headed dragon!" */], false,"#fff","#000")
  }
  ,10);
  
  loop();
}



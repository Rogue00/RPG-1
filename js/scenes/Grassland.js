Grassland.prototype = Object.create(Drawable.prototype);
Grassland.prototype.constructor = Drawable;
	
function Grassland(width,height) {
	Drawable.call(this,0,0,width,height);

	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'coin',collectMsg:'cool some coins...'};
	var redFlowerConfig = {type:'redFlower', hits:false,
		handleHit: function(hitObj) {
			Dialog.addMessage("Thats a happy place");
		}
	};
	
	var signConfig = {type:'sign', hits:true,
		handleHit: function(hitObj) {
			Dialog.addMessage("To become a franconian you have to try hard or die tryin.");
		}
	};
	
	var benchConfig = {type:'bench', hits:true};
	var treeConfig = {type:'tree', hits:true};
	var stoneConfig = {type:'stone', hits:true};
	
	
	var fountainConfig = {type:'fountain', handleHit: function(hitObj) {
		if(KeyboardService.keysPressed.space) {
			if(!this.locked) {
				this.locked = true;
				if(Inventory.getSelectedItem()!=undefined) {
						switch(Inventory.getSelectedItem().name) {
							case 'coin':
								if(Inventory.getQty('coin')>0) {
									Inventory.removeItem('coin',1);
									Dialog.addMessage("PLONK... PLONK... PLONK... Blub....");
								}
								break;
							default:
								Dialog.addMessage("That does not work...");
						}
				} else {
					Dialog.addMessage("Heeeeeeeeelllllllllooo TIMMY!!!");
				}
				setTimeout(function(){this.locked=false}.bind(this),1000);
			}			
		}
	}};
	
	var waterspoutFountainConfig = {type:'waterspoutFountain', handleHit: function(hitObj) {
		if(KeyboardService.keysPressed.space) {
			if(!this.locked) {
				this.locked = true;
				Dialog.addMessage("Plitsch platsch... Water games are awesome.");
				setTimeout(function(){this.locked=false}.bind(this),1000);
			}			
		}
	}};
	var waterspoutFountain = new Solid(width/2-45,height/2,96,94,waterspoutFountainConfig);
	
	var coin = new Collectable(90,90,24,24,collectableConfig);
	
	this.tweens.push(TweenService.createTween({
		object: coin,
		repeat: true,
		steps: [
			{x:+120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:+120,d:2000,spritePosition:[0,1]},
			{x:-120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:-120,d:2000,spritePosition:[0,1]},
		]
	}));
	
	var spriteYPosition =Math.round(Math.random())>>0;
	
	this.tweens.push(TweenService.createTween({
		object: waterspoutFountain,
		repeat: true,
		steps: [
			{d:spriteYPosition==0?100:400,spritePosition:[0,spriteYPosition]},
			{d:spriteYPosition==0?100:400,spritePosition:[1,spriteYPosition]},
			{d:spriteYPosition==0?100:400,spritePosition:[2,spriteYPosition]},
			{d:spriteYPosition==0?100:400,spritePosition:[3,spriteYPosition]},
		]
	}));
	
	this.colliders = [
		new Solid(0,0,width/2,32,solidConfig),
		new Solid(width/2+32,0,width/2,32,solidConfig),
		new Solid(0,0,32,height/2,solidConfig),
		new Solid(0,height/2+32,32,height/2,solidConfig),
		
		new Solid(700,200,52,64,fountainConfig),
		new Solid(700,400,9,16,redFlowerConfig),
		new Solid(710,420,9,16,redFlowerConfig),
		new Solid(690,410,9,16,redFlowerConfig),
		new Solid(690,350,62,36,benchConfig),
		new Solid(690,450,56,44,stoneConfig),
		new Solid(720,300,128,153,treeConfig),
		new Solid(720,50,53,52,signConfig),
		coin,
		new Fire(height/2-32,height/2-32),
		waterspoutFountain,
		new Collectable(width/2-100,height/2,24,24,collectableConfig)
	];


	var grassTexture = new Image();
	grassTexture.src = "img/grass.png";
	grassTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(grassTexture,"repeat");
		this.context.fillRect(0,0,this.size.w,this.size.h);
	}
	
}
var Inventory = new function () {
	this.prototype = Object.create(Drawable.prototype);
	this.prototype.constructor = Drawable;
	Drawable.call(this,0,0,40,5*(40+6));
	
	this.items = [];
	this.selectedItem = 0;
	
	this.addItem = function(item,qty) {
		
		for(var i=0;i<this.items.length;i++) {
			var currentItem = this.items[i];
			if(currentItem.name==item) {
				currentItem.qty+=qty;
				this.needsRedraw = true;
				return
			}
		}
		if(this.items.length<5) {
			this.items.push({name:item,qty:qty});
		}
		
		this.needsRedraw = true;
	}
	
	
	this.getQty = function(item) {
		for(var i=0;i<this.items.length;i++) {
			var currentItem = this.items[i];
			if(currentItem.name==item) {
				return currentItem.qty;
			}
		}
		return null;
	}
	
	this.getSelectedItem = function() {
		return this.items[this.selectedItem];
	}
	
	this.removeItem = function(item,qty) {
		for(var i=0;i<this.items.length;i++) {
			var currentItem = this.items[i];
			if(currentItem.name==item) {
				if(currentItem.qty>=qty)
					currentItem.qty-=qty;
			}
		}
		this.checkEmpty();
		this.needsRedraw = true;
	}
	
	this.checkEmpty = function() {
		for(var i=0;i<this.items.length;i++) {
			var item = this.items[i];
			if(item.qty==0) {
				this.items.splice(i,1);
			}
			
		}
	}
	
	var woodTexture = new Image();
	woodTexture.src = "img/wood.png";
	woodTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.userDraw = function() {
		this.context.fillStyle = "#6E4803";
		this.context.lineWidth = 2;
		
		for(var i=0;i<5;i++) {
			this.context.fillStyle = this.context.createPattern(woodTexture,"repeat");
			
			if(this.selectedItem==i) {
				this.context.strokeStyle = "red";
			} else {
				this.context.strokeStyle = "#fff";
			}
			
			this.context.strokeRect(0,i*(40+6),this.size.w,40);
			this.context.fillRect(1,i*(40+6)+1,this.size.w-2,40-1);
			
		}
		
		var cnt = 0;
		for(var i=0;i<this.items.length;i++) {
			var item = this.items[i];
			var img = new Image();
			img.src = 'img/'+item.name +".png";
			img.addEventListener('load', function(cnt,item,img) {
				this.context.drawImage(img,8,cnt*(40+6)+8);
				this.context.fillStyle="#fff";
				this.context.font = 'bold 15px Arial';
				this.context.textAlign = 'right';
				this.context.lineWidth = 1;
				this.context.textBaseline = 'bottom';
				this.context.fillText(item.qty,35,(cnt+1)*(40+6)-8);
			}.bind(this,cnt,item,img));		
			cnt++;
		}
	}
	
	window.addEventListener('KeyboardServiceKeyUp', function() {
		for(var i=0;i<5;i++) {
			if(KeyboardService.keysPressed['n'+(i+1)]) {
				this.selectedItem = i;
				this.needsRedraw=true;
			}
		}
	}.bind(this));
};
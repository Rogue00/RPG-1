var InventoryService = new function () {
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.width = 40;
	this.canvas.height = 300;
	this.needsRedraw = true;	
	this.items = {};
	
	this.addItem = function(item,qty) {
		if(this.items[item]) {
			this.items[item]+=qty;
		} else {
			this.items[item]=qty;
		}
		this.needsRedraw = true;
	}
	
	this.getCanvas = function() {
		return this.canvas;
	}
	
	this.getQty = function(item) {
		if(this.items[item]) {
			return this.items[item];
		} else {
			return 0;
		}
	}
	
	this.removeItem = function(item,qty) {
		if(this.items[item]) {
			this.items[item]-=qty;
			if(this.items[item]<=0) {
				delete this.items[item];
			}
		} else {
			return false;
		}
		this.needsRedraw = true;
	}
	
	this.draw = function() {
		if(!this.needsRedraw) return;
    	this.needsRedraw = false;
    	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.fillStyle = "#cdcdcd";
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		var cnt = 0;
		for(var item in this.items) {
			var img = new Image();
			img.src = 'img/'+item +".png";
			img.addEventListener('load', function(cnt,item) {
				this.context.drawImage(img,0,cnt*40);
				this.context.fillStyle="black";
				this.context.font = 'bold 15px Arial';
				this.context.textAlign = 'center';
				this.context.lineWidth = 1;
				this.context.textBaseline = 'middle';
				console.log(this.items[item]);
				this.context.fillText(this.items[item],30,cnt*40+20);
			}.bind(this,cnt,item));		
			cnt++;
		}
	}
	this.draw();
};
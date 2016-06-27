var DialogService = new function() {
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.width = 500;
	this.canvas.height = 100;
	this.needsRedraw = true;
	
	var messages = [];
	
	this.getCanvas = function() {
		return this.canvas;
	}
	
	this.addMessage = function(message) {
		messages.push(message);
		this.needsRedraw = true;
		this.draw();
	}
	
	window.setInterval(function() {
		this.needsRedraw = true;
		this.draw();
		messages.shift();
	}.bind(this),2000);
	
	this.draw = function() {
		if(!this.needsRedraw) return;
    	this.needsRedraw = false;
    	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		if(messages.length) {
			this.context.fillStyle = "#000";
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
			this.context.fillStyle = "#fff";
			this.context.font = '30pt Verdana';
			this.context.textAlign = 'center';
			this.context.textBaseline = 'middle';
			this.context.fillText(messages[0],this.canvas.width/2,this.canvas.height/2);
		}
	}
	
	this.draw();
};
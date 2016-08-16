var Dialog = new function() {
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.width = AppConfig.appWidth;
	this.canvas.height = 100;
	this.needsRedraw = true;
	var messages = [];
	var timeout = null;
	
	this.addMessage = function(message,displayTime,color,bgColor) {
		if(timeout!=null) 
			clearTimeout(timeout);
		
		if(!displayTime) {
			displayTime = 2000;
		}
		if(!color) {
			color = '#fff';
		}
		if(!bgColor) {
			bgColor = '#000'; 
		}
		if(Array.isArray(message) && message.length>3) {
			console.warn("Message is longer as 3 Lines");
		}
		messages.push({message:message,displayTime:displayTime,color:color,bgColor:bgColor});
		this.needsRedraw = true;
		this.draw();

	}
	
	
	this.draw = function() {
		if(!this.needsRedraw) return;
    	this.needsRedraw = false;
    	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		if(messages.length) {
			if(messages[0].bgColor!='transparent') {
				this.context.fillStyle = messages[0].bgColor;
				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
			}
			this.context.fillStyle = messages[0].color;
			this.context.textAlign = 'center';
			this.context.textBaseline = 'middle';
			
			var tmpFontSize = 25;
			if(Array.isArray(messages[0].message) && messages[0].message.length > 1) {
				this.context.textBaseline = 'top';
				tmpFontSize = 16;
				this.context.font = tmpFontSize+'pt Verdana';
				for(var i=0;i<messages[0].message.length;i++) {
					this.context.fillText(messages[0].message[i],this.canvas.width/2,(57-(17*messages[0].message.length))+(30*i));
				}				
			} else {	
				tmpFontSize = 30;
				this.context.font = tmpFontSize+'pt Verdana';
				while(this.context.measureText(messages[0].message).width>this.canvas.width) {
					tmpFontSize--;
					this.context.font = tmpFontSize+'pt bold Verdana';
				}
				this.context.fillText(messages[0].message,this.canvas.width/2,this.canvas.height/2);

			}
			
			timeout = window.setTimeout(function() {
				this.needsRedraw = true;
				this.draw();
			}.bind(this),messages[0].displayTime);
			
			messages.shift();
		}
	}
	
	this.draw();
};
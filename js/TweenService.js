var TweenService = new function () {
	this.tweens = [];
	
	this.addTween = function(newTween) {
		this.tweens.push(
			{
				config:newTween,
				lastTick: 0,
				firstTick: new Date().getTime(),
				currentStep:-1,
				stepStart:-1,
				deletable: false,
				stepStartPosition: {x:-1,y:-1}
			}
		);		
	}
	
	this.createTween = function(tweenConfig) {
		return {
				config: tweenConfig,
				lastTick: 0,
				firstTick: new Date().getTime(),
				currentStep:-1,
				stepStart:-1,
				stepStartPosition: {x:-1,y:-1},
				tick: function() {
					if(this.currentStep<0) {
						this.currentStep++;
						this.stepStart = new Date().getTime();
						this.stepStartPosition = {x: this.config.object.position.x , y: this.config.object.position.y, a: this.config.object.alpha };
					}
					var now = new Date().getTime();
					
					var currentStep = this.config.steps[this.currentStep];
					var percentage = (now - this.stepStart) / currentStep.d ; 
					
					percentage = percentage > 1 ? 1 : percentage;
					
					if(currentStep.x)
						this.config.object.position.x = this.stepStartPosition.x + (percentage*currentStep.x);
						
					if(currentStep.y)						
						this.config.object.position.y = this.stepStartPosition.y + (percentage*currentStep.y);
					
					if(currentStep.a)	
						this.config.object.alpha = this.stepStartPosition.a + (percentage*currentStep.a);
					
					
					this.config.object.needsRedraw = true;
					
					if(percentage==1) {
						if(this.currentStep+1<this.config.steps.length) {
							this.currentStep++;
						} else {
							if(this.config.repeat) {
								this.currentStep=0;
							} else {
								this.deleteable = true; 
							}
						}
							this.stepStart = new Date().getTime();
							this.stepStartPosition = {x: this.config.object.position.x , y: this.config.object.position.y, a: this.config.object.alpha };
		
					}
				}
		};
	}
	
	this.removeTween = function(tween) {
		this.tweens.splice(this.tweens.indexOf(tween),1);
	}
	
	
	this.loop = function() {
		var now = new Date().getTime();
		for(var i=0;i<this.tweens.length;i++) {
			var tween = this.tweens[i];

			if(tween.currentStep<0) {
				tween.currentStep++;
				tween.stepStart = new Date().getTime();
				tween.stepStartPosition = {x: tween.config.object.position.x , y: tween.config.object.position.y };
			}
			
			var currentStep = tween.config.steps[tween.currentStep];
			var percentage = (now - tween.stepStart) / currentStep.d ; 
			
			percentage = percentage>1 ? 1 : percentage;
			
			tween.config.object.position = {
				x: tween.stepStartPosition.x + (percentage*currentStep.x),
				y: tween.stepStartPosition.y + (percentage*currentStep.y),
			}
			tween.config.object.needsRedraw = true;
			
			if(percentage==1) {
				if(tween.currentStep+1<tween.config.steps.length) {
					tween.currentStep++;
				} else {
					if(tween.config.repeat) {
						tween.currentStep=0;
					} else {
						this.removeTween(tween);
						continue;
					}
				}
					tween.stepStart = new Date().getTime();
					tween.stepStartPosition = {x: tween.config.object.position.x , y: tween.config.object.position.y };

			}
			
		}
	}

};
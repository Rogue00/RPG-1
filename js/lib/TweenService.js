var TweenService = new function () {
	this.createTween = function(tweenConfig) {
		return {
				config: tweenConfig,
				lastTick: 0,
				firstTick: new Date().getTime(),
				currentStep:-1,
				stepStart:-1,
				stepStartPosition: {},
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

					if(currentStep.spritePosition) {
						this.config.object.spritePosition.x = currentStep.spritePosition[0];
						this.config.object.spritePosition.y = currentStep.spritePosition[1];						
					}
					
					this.config.object.needsRedraw = true;
					
					this.config.object.context.clearRect(0,0,this.config.object.size.w,this.config.object.size.h);
					
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
};
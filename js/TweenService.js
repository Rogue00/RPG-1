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
				stepStartPosition: {x:-1,y:-1}
			}
		);		
	}
	
	this.removeTween = function(tween) {
		this.tweens.splice(this.tweens.indexOf(tween),1);
	}
	
	
	this.loop = function() {
		for(var i=0;i<this.tweens.length;i++) {
			var tween = this.tweens[i];

			if(tween.currentStep<0) {
				tween.currentStep++;
				tween.stepStart = new Date().getTime();
				tween.stepStartPosition = {x: tween.config.object.position.x , y: tween.config.object.position.y };
			}
			var now = new Date().getTime();
			
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
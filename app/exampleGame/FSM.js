/* global THREE */

class FSM {
  constructor() 
  {
  	this.activeState;
  	this.timeInState;
  }

  setState(state)
  {
  	this.activeState = state;
    this.timeInState = 0;
  }

  tick(delta)
  {
  	if(this.activeState != null)
  	{
  		this.activeState(delta);
    	this.timeInState += delta;
  	}
  }
}

module.exports = FSM;
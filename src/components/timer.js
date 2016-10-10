import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    // Bind all of the functions
    this.changeGameStatus = this.changeGameStatus.bind(this);
  }

  //
  changeGameStatus(status) {
    this.props.changeGameStatus(status);
    if(!this.props.state.gameStatus) {
      this.props.startTimer();
    }
  }

  render() {
    return(
      <div className="timer">
        {/*<div className="time">{this.props.state.timeLeft}</div>*/}
        {/*<button onClick={() => {this.changeGameStatus('active')}}>Start</button>*/}
        {/*<button onClick={() => {this.changeGameStatus('paused')}}>Pause</button>*/}
      </div>
    );
  }
}

export default Timer;

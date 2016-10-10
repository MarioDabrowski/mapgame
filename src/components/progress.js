import React from 'react';

class Progress extends React.Component {
  constructor() {
    super();

    this.giveUp = this.giveUp.bind(this);
  }

  giveUp() {
    this.props.changeGameStatus('forfeit');
  }

  render() {
    return(
      <div className="progress">
        <div className="progress__countries"><span>Countries - </span> {this.props.state.correctCountries}<span>/</span>{this.props.state.countryCount}</div>
        <div className="progress__capitals"><span>Capitals - </span> {this.props.state.correctCapitals}<span>/</span>{this.props.state.countryCount}</div>
        <button className="btn-giveup" onClick={this.giveUp}>Give Up</button>
      </div>
    );
  }
}

export default Progress;

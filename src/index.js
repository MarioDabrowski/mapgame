import React from 'react';
import { render } from 'react-dom';
import './App.css';
import Timer from './components/timer';
import List from './components/list';
import AnswerBox from './components/answer_box';
import Countries from './countries';
import Progress from './components/progress';
import ColumnHeadings from './components/columnHeadings';
import Map from './components/map';

class App extends React.Component {

  constructor() {
    super();

    this.changeGameStatus = this.changeGameStatus.bind(this);
    this.markCountry = this.markCountry.bind(this);
    this.correctCount = this.correctCount.bind(this);
    this.changeView = this.changeView.bind(this);

    this.state = {
      gameStarted: false,
      gameStatus: 'inactive', // inactive, active, paused, finished, forfeit
      view: 'map', // list, map
      countries: Countries,
      countryCount: 0,
      correctCountries: 0,
      correctCapitals: 0,
      continents: [
        {
          location: 'North America',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        },
        {
          location: 'South America',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        },
        {
          location: 'Europe',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        },
        {
          location: 'Africa',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        },
        {
          location: 'Asia',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        },
        {
          location: 'Oceania',
          countries: [],
          correctCountries: 0,
          correctCapitals: 0
        }
      ]
    };

    // Split out the countries into seperate continent objects
    for (let i = 0; i < this.state.continents.length; i++) {
      for (let a = 0; a < this.state.countries.length; a++) {
        if(this.state.countries[a].region === this.state.continents[i].location && this.state.countries[a].independent) {
          this.state.continents[i].countries.push(this.state.countries[a]);
        }
      }
    }

    // Figure out how many countries we got
    for (let i = 0; i < this.state.countries.length; i++) {
      if(this.state.countries[i].independent) {
        this.state.countryCount++;
      }
    }
  }

  changeGameStatus(status) {
    this.setState({gameStatus: status});
  }

  changeView(view) {
    this.setState({view});
  }

  markCountry(countryIndex, answerCategory) {
    var newAnswer = this.state.countries;

    if(answerCategory === 'country') {
      newAnswer[countryIndex].answeredCountry = true;
      this.setState({countries: newAnswer});
    } else if(answerCategory === 'capital') {
      newAnswer[countryIndex].answeredCapital = true;
      this.setState({countries: newAnswer});
    }
  }

  correctCount(category, continent) {
    var count;

    if(continent) {
      for (var i = 0; i < this.state.continents.countries.length; i++) {
        if(this.state.continents.countries[i][category]) {
          count++;
        }
      }
    }

    return count;
  }

  render() {
    return(
      <div className="app">
        <div className="header">
          <Timer changeGameStatus={this.changeGameStatus} state={this.state} startTimer={this.startTimer} startGame={this.startGame} />
          <AnswerBox state={this.state} markCountry={this.markCountry} changeView={this.changeView} />
          <Progress state={this.state} changeGameStatus={this.changeGameStatus} />
        </div>
        <ColumnHeadings state={this.state} />
        {(this.state.view === 'list') ? <List state={this.state} correctCount={this.correctCount} /> : <Map state={this.state} />}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

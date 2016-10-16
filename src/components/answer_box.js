import React from 'react';
import leaflet from 'leaflet';

class AnswerBox extends React.Component {
  constructor() {
    super();

    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  submitAnswer(event) {
    if(event.key === 'Enter') {
      var input = this.input;
      var answer = input.value;
      var countries = this.props.state.countries;
      var country = false;
      var capital = false;
      var countryIndex;

      // Run through the countries
      for (var i = 0; i < countries.length; i++) {

        // If the input matches a country name
        if(countries[i].name.toLowerCase() === answer.toLowerCase() && !countries[i].answeredCountry) {
          country = true;
          countryIndex = i;
          break;
        }

        // If the input matches an alternative spelling of the country name
        for (var a = 0; a < countries[i].altSpellings.length; a++) {
          if(countries[i].altSpellings[a].toLowerCase() === answer.toLowerCase() && !countries[i].answeredCountry) {
            country = true;
            countryIndex = i;
            break;
          }
        }

        // If the input matches the capital name
        if(countries[i].capital.toLowerCase() === answer.toLowerCase() && !countries[i].answeredCapital) {
          capital = true;
          countryIndex = i;
          break;
        }

        // If the input matches an alternative spelling of a capital name
        if(countries[i].altCapitalSpellings) {
          for (var b = 0; b < countries[i].altCapitalSpellings.length; b++) {
            if(countries[i].altCapitalSpellings[b].toLowerCase() === answer.toLowerCase() && !countries[i].answeredCapital) {
              capital = true;
              countryIndex = i;
              break;
            }
          }
        }
      }

      //
      if(country) {
        this.props.markCountry(countryIndex, 'country');
        this.props.state.correctCountries++;

        let continent = this.props.state.countries[countryIndex].region;
        let continentIndex;

        for (let i = 0; i < this.props.state.continents.length; i++) {
          if(this.props.state.continents[i].location === continent) {
            continentIndex = i;
          }
        }

        this.props.state.continents[continentIndex].correctCountries++;

        // Kill the map marker
        this.props.state.map.removeLayer(this.props.state.countries[countryIndex].marker);

        //
        this.props.state.map.panTo(new leaflet.LatLng(this.props.state.countries[countryIndex].latlng[0], this.props.state.countries[countryIndex].latlng[1]));

        //
        var countryCode = this.props.state.countries[countryIndex].alpha3Code;
        var shape = document.querySelectorAll('path.' + countryCode);

        for (let i = 0; i < shape.length; i++) {
          shape[i].setAttribute('fill-opacity', 0.3);
        }

        // Reset the input to be blank
        input.value = '';

      } else if(capital) {
        this.props.markCountry(countryIndex, 'capital');
        this.props.state.correctCapitals++;

        let continent = this.props.state.countries[countryIndex].region;
        let continentIndex;

        for (let i = 0; i < this.props.state.continents.length; i++) {
          if(this.props.state.continents[i].location === continent) {
            continentIndex = i;
          }
        }

        this.props.state.continents[continentIndex].correctCapitals++;

        // Reset the input to be blank
        input.value = '';
      }
    }
  }

  changeView(e) {
    if(e.target === this.listView && !this.listView.classList.contains('view__button--active')) {
      e.target.classList.add('view__button--active');
      this.mapView.classList.remove('view__button--active');
      this.props.changeView('list');
    } else if(e.target === this.mapView && !this.mapView.classList.contains('view__button--active')) {
      e.target.classList.add('view__button--active');
      this.listView.classList.remove('view__button--active');
      this.props.changeView('map');
    }
  }

  render() {
    return(
      <div className="answer-box">
        <input ref={(input) => {this.input = input}} type="text" onKeyPress={this.submitAnswer} />
        <div className="view">
          <button className={(this.props.state.view === 'list') ? "view__button  view__button--active" : "view__button"} ref={(listView) => {this.listView = listView}} onClick={(e) => this.changeView(e)}>List View</button>
          <button className={(this.props.state.view === 'map') ? "view__button  view__button--active" : "view__button"} ref={(mapView) => {this.mapView = mapView}} onClick={(e) => this.changeView(e)}>Map View</button>
        </div>
      </div>
    );
  }
}

export default AnswerBox;

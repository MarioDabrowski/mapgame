import React from 'react';

class ColumnHeadings extends React.Component {
  render() {
    return(
      <div className="columnHeadings">
      {
        this.props.state.continents.map(function(continent) {
          return(
            <div className="list__col" key={continent.location}>
              <div className="list__col__heading">
                <div className="list__col__heading__title">{continent.location}</div>

                <div className="list__col__heading__count-wrapper">
                  <div className="list__col__heading__count">
                    <div className="list__col__heading__count__number">{continent.correctCountries}<span>/</span>{continent.countries.length}</div>
                    <div className="list__col__heading__count__title">Countries</div>
                  </div>
                  <div className="list__col__heading__count">
                    <div className="list__col__heading__count__number">{continent.correctCapitals}<span>/</span>{continent.countries.length}</div>
                    <div className="list__col__heading__count__title">Capitals</div>
                  </div>
                </div>

              </div>
            </div>
          );
        })
      }
      </div>
    );
  }
}

export default ColumnHeadings;

import React from 'react';

class List extends React.Component {
  componentDidMount() {
    var listColHeading = document.querySelectorAll('.list__col__heading');
    var listColHeadingHeight = listColHeading[0].offsetHeight;
    var listColOl = document.querySelectorAll('.list__col__ol');
    var header = document.querySelector('.header');
    var headerHeight = header.offsetHeight;
    var documentHeight = document.body.offsetHeight;

    function resizeColumns() {
      for (var i = 0; i < listColOl.length; i++) {
        listColOl[i].style.height = (documentHeight - (headerHeight + listColHeadingHeight)) + 'px';
      }
    }

    resizeColumns();

    window.addEventListener('resize', function() {
      documentHeight = document.body.offsetHeight;
      resizeColumns();
    });
  }

  render() {
    var self = this;

    return(
      <div className="list">
        {
          self.props.state.continents.map(function(continent) {
            return(
              <div className="list__col" key={continent.location}>
                <ol className="list__col__ol">
                {
                  continent.countries.map(function(country) {
                    if(country.independent) {
                      return(
                        <li className="list__col__item" key={country.name}>
                          <div className={(country.answeredCountry) ? 'list__col__item__name  list__col__item__name--active' : 'list__col__item__name'} data-giveup={(!country.answeredCountry && self.props.state.gameStatus === 'forfeit') ? 'true' : 'false'}>{(country.answeredCountry || self.props.state.gameStatus === 'forfeit') ? country.name : '\u00A0'}</div>
                          <div className={(country.answeredCapital) ? 'list__col__item__name  list__col__item__name--active' : 'list__col__item__name'} data-giveup={(!country.answeredCapital && self.props.state.gameStatus === 'forfeit') ? 'true' : 'false'}>{(country.answeredCapital || self.props.state.gameStatus === 'forfeit') ? country.capital : '\u00A0'}</div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })
                }
                </ol>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default List;

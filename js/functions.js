// Variables
// Learn to not make these global but be accessible from other files (namespace)
var countryArray = [],
correctAnswers = [],
answerCount = 0,
gamseStatus = false,
independent = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Republic of the Congo', 'Democratic Republic of the Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ivory Coast', 'Iran', 'Iraq', 'Republic of Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Republic of Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Federated States of Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Kosovo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'East Timor', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vatican City', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],

countNorthAmerica = 0,
countSouthAmerica = 0,
countEurope = 0,
countAsia = 0,
countOceania = 0,
countAfrica = 0,

countCorrectNorthAmerica = 0,
countCorrectSouthAmerica = 0,
countCorrectEurope = 0,
countCorrectAsia = 0,
countCorrectOceania = 0,
countCorrectAfrica = 0;

$(document).ready(function(){

  // Retreive the country info from the JSON file
  $.ajax({
    type: 'GET',
    url: 'js/countries.json',
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        var currentItem = data[i],
        currentItemCode = data[i].name;

        if(jQuery.inArray(currentItemCode, independent) !== -1) {
          countryArray.push(currentItem);

          if (currentItem.subregion == 'Northern America' || currentItem.subregion == 'Central America' || currentItem.subregion == 'Caribbean') {
            countNorthAmerica += 1;
          } else if (currentItem.subregion == 'South America') {
            countSouthAmerica += 1;
          } else if (currentItem.region == 'Europe') {
            countEurope += 1;
          } else if (currentItem.region == 'Asia') {
            countAsia += 1;
          } else if (currentItem.region == 'Oceania') {
            countOceania += 1;
          } else if (currentItem.region == 'Africa') {
            countAfrica += 1;
          }
        }

        $('.count-total').text(countryArray.length);
      }

      // Insert the totals into the categories
      $('.continent-list-item[data-region="north-america"] .country-count-total').text(countNorthAmerica);
      $('.continent-list-item[data-region="south-america"] .country-count-total').text(countSouthAmerica);
      $('.continent-list-item[data-region="europe"] .country-count-total').text(countEurope);
      $('.continent-list-item[data-region="asia"] .country-count-total').text(countAsia);
      $('.continent-list-item[data-region="oceania"] .country-count-total').text(countOceania);
      $('.continent-list-item[data-region="africa"] .country-count-total').text(countAfrica);

    }
  });

  // When you typed something into the input and hit enter
  $('.input').keypress(function (e) {
    if (e.which == 13) {

      // If the game hasn't started yet, hide the instructions and begin
      if($('.start-overlay').is(':visible')) {
        $('.start-overlay').hide();
        countDown();
        timerStatus = true;
      }

      // Check if the country exists in the list
      var $this = $(this),
      inputValue = $this.val();

      // Loop through the API to see if the inputed answer is in there
      for (var i = 0; i < countryArray.length; i++){

        if(countryArray[i].name.toLowerCase() == inputValue.toLowerCase() || jQuery.inArray(inputValue.toLowerCase(), $.map(countryArray[i].altSpellings, function(n,i){return n.toLowerCase()})) != -1 && inputValue.length >= 3){

          var currentItem = countryArray[i],
          countryCode = currentItem.alpha2Code;

          // Clear out the input
          $this.val('');

          // Check to see if the country is already in the list
          if(jQuery.inArray('\'' + countryCode + '\'', correctAnswers) == -1){

            // Add the 2 value country code to the array
            correctAnswers.push('\'' + countryArray[i].alpha2Code + '\'');

            // Update the correct continent count
            if (currentItem.subregion == 'Northern America' || currentItem.subregion == 'Central America' || currentItem.subregion == 'Caribbean') {
              countCorrectNorthAmerica += 1;
              $('.continent-list-item[data-region="north-america"]').text(countCorrectNorthAmerica);
              $('.info-drawer[data-region="north-america"]').append(inputValue);
            } else if (currentItem.subregion == 'South America') {
              countCorrectSouthAmerica += 1;
              $('.continent-list-item[data-region="south-america"]').text(countCorrectSouthAmerica);
            } else if (currentItem.region == 'Europe') {
              countCorrectEurope += 1;
              $('.continent-list-item[data-region="europe"]').text(countCorrectEurope);
            } else if (currentItem.region == 'Asia') {
              countCorrectAsia += 1;
              $('.continent-list-item[data-region="asia"]').text(countCorrectAsia);
            } else if (currentItem.region == 'Oceania') {
              countCorrectOceania += 1;
              $('.continent-list-item[data-region="oceania"]').text(countCorrectOceania);
            } else if (currentItem.region == 'Africa') {
              countCorrectAfrica += 1;
              $('.continent-list-item[data-region="africa"]').text(countCorrectAfrica);
            }

            // Trigger a click to allow Google Maps to update (find a better solution for this later)
            $('#invisibleButton').click();

            answerCount = answerCount+1;
            $('.count-correct').text(answerCount);
          }
        }
      }
    }

  });

});

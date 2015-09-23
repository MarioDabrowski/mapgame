// Variables
// Learn to not make these global but be accessible from other files (namespace)
var correctAnswers = [],
answerCount = 0,
gamseStatus = false,
independent = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Republic of the Congo', 'Democratic Republic of the Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ivory Coast', 'Iran', 'Iraq', 'Republic of Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Republic of Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Federated States of Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Kosovo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'East Timor', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vatican City', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
continents = ['north-america', 'south-america', 'europe', 'asia', 'oceania', 'africa'],

countCorrectNorthAmerica = 0,
countCorrectSouthAmerica = 0,
countCorrectEurope = 0,
countCorrectAsia = 0,
countCorrectOceania = 0,
countCorrectAfrica = 0,

listNorthAmerica = [],
listSouthAmerica = [],
listEurope = [],
listAsia = [],
listOceania = [],
listAfrica = [],

countryArray = [];

function updateWithAnswer (count, region) {
  count += 1;
  $('.continent-list-item[data-region="' + region + '"] .continent-count-right').text(count);
  $('.info-drawer[data-region="' + region + '"] .country-list').append('<li class="country-list-item">' + inputValue + '</li>');
}

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
          if (currentItem.subregion == 'Northern America' || currentItem.subregion == 'Central America' || currentItem.subregion == 'Caribbean') {
            listNorthAmerica.push(currentItem);
          } else if (currentItem.subregion == 'South America') {
            listSouthAmerica.push(currentItem);
          } else if (currentItem.region == 'Europe') {
            listEurope.push(currentItem);
          } else if (currentItem.region == 'Asia') {
            listAsia.push(currentItem);
          } else if (currentItem.region == 'Oceania') {
            listOceania.push(currentItem);
          } else if (currentItem.region == 'Africa') {
            listAfrica.push(currentItem);
          }
        }

        countryArray = listNorthAmerica.concat(listSouthAmerica, listEurope, listAsia, listOceania, listAfrica);

        $('.count-total').text(countryArray.length);
      }

      // Insert the totals into the categories
      $('.continent-list-item[data-region="north-america"] .continent-count-total').text(listNorthAmerica.length);
      $('.continent-list-item[data-region="south-america"] .continent-count-total').text(listSouthAmerica.length);
      $('.continent-list-item[data-region="europe"] .continent-count-total').text(listEurope.length);
      $('.continent-list-item[data-region="asia"] .continent-count-total').text(listAsia.length);
      $('.continent-list-item[data-region="oceania"] .continent-count-total').text(listOceania.length);
      $('.continent-list-item[data-region="africa"] .continent-count-total').text(listAfrica.length);

      // Populate the country lists
      for (var i = 0; i < listNorthAmerica.length; i++) {
        $('.info-drawer[data-region="north-america"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }
      for (var i = 0; i < listSouthAmerica.length; i++) {
        $('.info-drawer[data-region="south-america"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }
      for (var i = 0; i < listEurope.length; i++) {
        $('.info-drawer[data-region="europe"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }
      for (var i = 0; i < listAsia.length; i++) {
        $('.info-drawer[data-region="asia"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }
      for (var i = 0; i < listOceania.length; i++) {
        $('.info-drawer[data-region="oceania"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }
      for (var i = 0; i < listAfrica.length; i++) {
        $('.info-drawer[data-region="africa"] .country-list').append('<li class="country-list-item">&nbsp;</li>');
      }

      // Initialize the nano scroller
      $(".nano").nanoScroller();

    }
  });

  // When you typed something into the input and hit enter
  $('.input').keypress(function (e) {
    if (e.which == 13) {

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
              $('.continent-list-item[data-region="north-america"] .continent-count-right').text(countCorrectNorthAmerica);
              $('.info-drawer[data-region="north-america"] .country-list-item:eq(' + listNorthAmerica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            } else if (currentItem.subregion == 'South America') {
              countCorrectSouthAmerica += 1;
              $('.continent-list-item[data-region="south-america"] .continent-count-right').text(countCorrectSouthAmerica);
              $('.info-drawer[data-region="south-america"] .country-list-item:eq(' + listSouthAmerica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            } else if (currentItem.region == 'Europe') {
              countCorrectEurope += 1;
              $('.continent-list-item[data-region="europe"] .continent-count-right').text(countCorrectEurope);
              $('.info-drawer[data-region="europe"] .country-list-item:eq(' + listEurope.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            } else if (currentItem.region == 'Asia') {
              countCorrectAsia += 1;
              $('.continent-list-item[data-region="asia"] .continent-count-right').text(countCorrectAsia);
              $('.info-drawer[data-region="asia"] .country-list-item:eq(' + listAsia.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            } else if (currentItem.region == 'Oceania') {
              countCorrectOceania += 1;
              $('.continent-list-item[data-region="oceania"] .continent-count-right').text(countCorrectOceania);
              $('.info-drawer[data-region="oceania"] .country-list-item:eq(' + listOceania.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            } else if (currentItem.region == 'Africa') {
              countCorrectAfrica += 1;
              $('.continent-list-item[data-region="africa"] .continent-count-right').text(countCorrectAfrica);
              $('.info-drawer[data-region="africa"] .country-list-item:eq(' + listAfrica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + inputValue + '</span>');
            }

            // Trigger a click to allow Google Maps to update (find a better solution for this later)
            $('#invisibleButton').click();

            // Increase the answer count and update the sidebar answer counter
            answerCount += 1;
            $('.count-correct').text(answerCount);

            // If the game hasn't started yet, hide the instructions and begin
            if($('.start-overlay').is(':visible') && answerCount != 0) {
              $('.start-overlay').hide();
              countDown();
              timerStatus = true;
            }
          }
        }
      }
    }
  });


  // Open country drawers by clicking on the continents

  $.each(continents, function(key, value) {
    $('.continent-list-item[data-region="' + value + '"]').on('click', function () {
      var $this = $(this);

      if (!$this.hasClass('active')) {
        var openStatus = $('.continent-list-item').hasClass('active');

        $('.continent-list-item').removeClass('active');
        $('.info-drawer').removeClass('open');

        // Check to see if any of the drawers are open, if they are delay the next drawer while opening so they don't overlap
        if (openStatus == true) {
          setTimeout(function(){
            $('.info-drawer[data-region="' + value + '"]').toggleClass('open');
          }, 400);
          $this.addClass('active');
        } else {
          $('.info-drawer[data-region="' + value + '"]').toggleClass('open');
          $this.addClass('active');
        }

      } else {
        $('.continent-list-item').removeClass('active');
        $('.info-drawer').removeClass('open');
      }

    });
  });


  // On window resize
  $(window).smartresize(function(){
    // Refresh the nano scrollers
    $(".nano").nanoScroller();
  });

});

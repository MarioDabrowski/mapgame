// Variables
// Learn to not make these global but be accessible from other files (namespace)
var correctAnswers = [],
answerCount = 0,
gameStatus = false,
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

function answerIndicator (status) {
  $('.answer-input').addClass(status);

  setTimeout(function () {
    $('.answer-input').removeClass(status);
  }, 200);
}

function disableInput () {
  var answerInput = $('.answer-input'),
      answerInputAttr = answerInput.attr('disabled');

  if (typeof answerInputAttr == typeof undefined && answerInputAttr !== true) {
    $('.answer-input').attr('disabled', true);
  } else {
    $('.answer-input').removeAttr('disabled', false);
  }
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

  // Check to see if the focus is in the input, if not set the focus on keypress

    $(document).keypress(function (e) {
      if (!$('.answer-input').is(':focus')) {
        $('.answer-input').focus();
      }
    });

  // When you typed something into the input and hit enter
  $('.answer-input').keypress(function (e) {
    if (e.which == 13) {

      // Check if the country exists in the list
      var $this = $(this),
      inputValue = $this.val(),
      answerStatus = false;

      // Loop through the API to see if the inputed answer is in there
      for (var i = 0; i < countryArray.length; i++){
        var currentCountry;

        // Figure out which name it is using, primary or the alt
        if (countryArray[i].name.toLowerCase() == inputValue.toLowerCase()) {
          currentCountry = countryArray[i].name;
        } else if (jQuery.inArray(inputValue.toLowerCase(), $.map(countryArray[i].altSpellings, function(value,index){currentCountry = value; return value.toLowerCase()})) != -1) {

        }

        if(countryArray[i].name.toLowerCase() == inputValue.toLowerCase() || jQuery.inArray(inputValue.toLowerCase(), $.map(countryArray[i].altSpellings, function(n,i){return n.toLowerCase()})) != -1 && inputValue.length >= 3){

          var currentItem = countryArray[i],
          countryCode = currentItem.alpha2Code,
          latLng = new google.maps.LatLng( currentItem.latlng[0],  currentItem.latlng[1]);


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
              $('.info-drawer[data-region="north-america"] .country-list-item:eq(' + listNorthAmerica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else if (currentItem.subregion == 'South America') {
              countCorrectSouthAmerica += 1;
              $('.continent-list-item[data-region="south-america"] .continent-count-right').text(countCorrectSouthAmerica);
              $('.info-drawer[data-region="south-america"] .country-list-item:eq(' + listSouthAmerica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else if (currentItem.region == 'Europe') {
              countCorrectEurope += 1;
              $('.continent-list-item[data-region="europe"] .continent-count-right').text(countCorrectEurope);
              $('.info-drawer[data-region="europe"] .country-list-item:eq(' + listEurope.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else if (currentItem.region == 'Asia') {
              countCorrectAsia += 1;
              $('.continent-list-item[data-region="asia"] .continent-count-right').text(countCorrectAsia);
              $('.info-drawer[data-region="asia"] .country-list-item:eq(' + listAsia.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else if (currentItem.region == 'Oceania') {
              countCorrectOceania += 1;
              $('.continent-list-item[data-region="oceania"] .continent-count-right').text(countCorrectOceania);
              $('.info-drawer[data-region="oceania"] .country-list-item:eq(' + listOceania.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else if (currentItem.region == 'Africa') {
              countCorrectAfrica += 1;
              $('.continent-list-item[data-region="africa"] .continent-count-right').text(countCorrectAfrica);
              $('.info-drawer[data-region="africa"] .country-list-item:eq(' + listAfrica.indexOf(currentItem) + ')').append('<span class="country-list-item-text">' + currentCountry + '</span>');
            } else {
              console.log('WTF');
            }

            // Trigger a click to allow Google Maps to update (find a better solution for this later)
            $('#invisibleButton').click();

            // Increase the answer count and update the sidebar answer counter
            answerCount += 1;
            $('.count-correct').text(answerCount);

            // If the game hasn't started yet, hide the instructions and begin
            if($('.start-overlay').is(':visible') && answerCount != 0) {
              gameStatus = true;
              pauseBtn = true; // enable pause
              $('.start-overlay').hide();
              countDown();
              timerStatus = true;

              map.panTo(latLng);
              // map.setZoom( data[2]);

            } else {
              // Answer Indicator
              answerIndicator('correct');
            }

            // Pan to checkbox
            if ($('#panTo').is(':checked')) {
              map.panTo(latLng);
            }

          } else {
            // Country is correct but already entered
            answerIndicator('incorrect');
          }
        }
      }
    }
  });


  // Open country drawers by clicking on the continents

  $.each(continents, function(key, value) {
    $('.continent-list-item[data-region="' + value + '"]').on('click', function () {
      var $this = $(this),
      $currentDrawer = $('.info-drawer[data-region="' + value + '"]'),
      $infoDrawer = $('.info-drawer'),
      $continentListItem = $('.continent-list-item');

      if (!$('.continent-list-item').hasClass('active')) {
        $currentDrawer.toggleClass('open');
        $this.addClass('active');

        setTimeout(function () {
          $infoDrawer.addClass('static');
        }, 500);

      } else {
        if (!$this.hasClass('active')) {
          $continentListItem.removeClass('active');
          $infoDrawer.removeClass('open');

          $currentDrawer.toggleClass('open');
          $this.addClass('active');
        } else {
          $infoDrawer.removeClass('static');
          $continentListItem.removeClass('active');
          $infoDrawer.removeClass('open');
        }
      }

    });
  });

  // Challenge toggle
  $('.game-type-item').on('click', function () {
    var $this = $(this),
        gameType = $this.data('type'),
        parentContainer = $this.parent();

    if (gameType == 'challenge' && !parentContainer.hasClass('pos-1')) {
      parentContainer.removeClass('pos-2').addClass('pos-1');

      $('.game-type-description[data-type="endurance"]').addClass('hidden');

      setTimeout (function () {
        $('.game-type-description[data-type="endurance"]').hide();
        $('.game-type-description[data-type="challenge"]').css('display', 'inline-block');
      }, 200);
      setTimeout (function () {
        $('.game-type-description[data-type="challenge"]').removeClass('hidden');
      }, 250);

    } else if (gameType == 'endurance' && !parentContainer.hasClass('pos-2')) {
      parentContainer.removeClass('pos-1').addClass('pos-2');
      $('.game-type-description[data-type="challenge"]').addClass('hidden');

      setTimeout (function () {
        $('.game-type-description[data-type="challenge"]').hide();
        $('.game-type-description[data-type="endurance"]').css('display', 'inline-block');
      }, 200);
      setTimeout (function () {
        $('.game-type-description[data-type="endurance"]').removeClass('hidden');
      }, 250);
    }
  });

  // When you hit 'give up'
  // Write a function that check to see whether the game has started instead of repeating this if statement in a few places

    $('.btn-give-up').on('click', function () {
      if (gameStatus == true) {
        gameStatus = false;

        // Disabled the input field
        disableInput();

        // Show the game over screen
        $('.gameover-overlay').show();

        // Stop the timer
        if(timerStatus == true) {
          timerStatus = false;
        }

        // Hide the pause overlay if it is visible
        if ($('.pause-overlay').is(':visible')) {
          $('.pause-overlay').hide();
        }

        // Disable the pause button
        $('.btn-pause').on('click', function (e) {
          e.stopPropagation();
        });
      }
    });

  // On window resize
  $(window).smartresize(function(){
    // Refresh the nano scrollers
    $(".nano").nanoScroller();
  });

});

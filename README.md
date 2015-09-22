# Map Game

## Bug List
#### Highlighting
- South Sudan doesn't highlight separately - currently part of Sudan
- Kosovo doesn't highlight separately - currently part of Serbia
- Taiwan doesn't highlight separately - currently part of China
- Western Sahara doesn't highlight as part of Morocco 
- Vatican City doesn't highlight
- Kaliningrad Oblast doesn't highlight as part of Russia

## Future Features
#### Content
- List that includes guessed and not guessed countries or capitals (blank rows), organized alphabetically
- Take answers as you type (i.e., do not have to press enter)
- Ability to play only by continent, possibly multiple
- Click on missed countries or capitals in list to pan to area where they are located on map
- Toggle for independent countries versus both independent countries and dependent territories/states
- Give Up button shows all countries or capitals that were not guessed
- List only version, with ability to peek/switch to map
- Capitals as separate and integrated test
- Double-shade in integrated test when countries and capitals are both correctly entered
- Challenge mode (random countries are shown to user)

#### Stylistic
- Restart button that takes player back to start screen
- Pause button with pattern that blacks out map
- Grey out dependent territories/states on the map that aren't possible answers
- Option for untimed mode
- Prompt or indicator when country or capital has been properly entered, incorrectly entered, or is a repeat entry
- Add toggle for bodies of water labels
- Remove toggle for country, state, and city labels
- How to show long list of countries or capitals by continent in drawer
- Markers for small countries and island countries

#### Add-ons
- About page
- Share buttons for social media
- Provide feedback option
- Leaderboard

## API Modifications
- Base API used: [REST Countries](http://restcountries.eu/)

#### Acceptance of alternative spellings for countries and capitals
- '&' for 'and' in relevant country names
- 'St.' or 'St' for 'Saint' in relevant country names
- Non-accented spellings of relevant countries or capitals
- Omittance of apostrophes, commas, or periods in relevant countries or capitals
- Omittance of country name prefixes (e.g., "Republic of")
- Space instead of hyphen in relevant countries or capitals
- Myanmar/Burma: Nay Pyi Taw or Naypyidaw
- Mongolia: Ulaanbaatar or Ulan Bator
- Ukraine: Kyiv or Kiev
- Yemen: Sana or Sanaa or Sana'a
- Nauru: Yaren District or Yaren
- Kiribati: Tarawa or Tarawa Atoll or South Tarawa
- Tuvalu: Funafuti Atoll or Funafuti

#### Countries or regions
- Consider Turkey as part of Europe instead of Asia
- Palestine not considered as independent country

#### Capital city changes
- India: Sri Jayawardenepura Kotte or Sri Jayewardenepura Kotte or Kotte instead of Colombo
- Vatican City: Vatican City instead of Rome

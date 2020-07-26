// Personal API Key for OpenWeatherMap API
const key = '37e07d71f65e682fa28dc78dad83d1d5';

// api.openweathermap.org/data/2.5/weather?zip= {zip code},{country code}&appid={your api key}
const zipInput = document.getElementById('zip');
const messageInput = document.getElementById('feelings');
const submitBtn = document.getElementById('generate');

// UI Elements
const welcomeField = document.getElementById('welcome');
const cityField = document.getElementById('city');
const temperatureField = document.getElementById('temperature');
const messageField = document.getElementById('message');
const dateField = document.getElementById('date');

// Create date

/* Months Array */
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/* Weekdays Array */
const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

/* Create date object */
const d = new Date();

/* Get year and day of the month */
const currentYear = d.getFullYear();
const currentDay = d.getDate();

/* Get the index of every month and day of the week */
const monthIndex = d.getMonth();
const weekDayIndex = d.getDay();

/* Assign each month and day of the week to their corresponding string value */
const currentMonth = months[monthIndex];
const currentWeekDay = days[weekDayIndex];

/* Months Array */
const formattedDate = `${currentWeekDay}, ${currentDay} ${currentMonth} ${currentYear}`


//Set API variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const countryCode = 'us';

// https://api.openweathermap.org/data/2.5/weather?zip=90001,US&appid=37e07d71f65e682fa28dc78dad83d1d5

// Event listener to add function to existing HTML DOM element
submitBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();

  //Get user zip input value
  const zip = zipInput.value;

  //Get user feeling input value
  const message = messageInput.value;

  getWeatherData(baseURL, countryCode, zip, key)
    .then(data => {

      /* Format temperature */
      const celsiusTemp = data.main.temp - 273.15;
      const formattedTemp = celsiusTemp.toFixed(0) + '°C';

      /* Send data to the server */
      postData('/sendInfo', {
        city: data.name,
        date: formattedDate,
        temperature: formattedTemp,
        message: message
      });
    })

    /* Run Update UI function right after */
    .then(() => updateUI())
}

/* Get the project data and update the UI */
const updateUI = async () => {
  const request = await fetch('/all');

  try {
    const allData = await request.json();
    
    welcomeField.style.display = "none";
    cityField.innerHTML = allData[0].city;
    temperatureField.innerHTML = allData[0].temperature;
    dateField.innerHTML = allData[0].date;
    messageField.innerHTML = allData[0].message;
    
  } catch (error) {
    console.log('error', error);
  }
}

/* Function to fetch Web API Data*/
const getWeatherData = async (baseURL, countryCode, zip, key) => {
  try {
    const res = await fetch(`${baseURL}${zip},${countryCode}&appid=${key}`);
    const data = await res.json();
    console.log(data);
    return data;

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

/* Function to post data to server */
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}



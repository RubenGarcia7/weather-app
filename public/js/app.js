// Personal API Key for OpenWeatherMap API
const key = '37e07d71f65e682fa28dc78dad83d1d5';

// api.openweathermap.org/data/2.5/weather?zip= {zip code},{country code}&appid={your api key}
const zipInput = document.getElementById('zip');
const feelingInput = document.getElementById('feelings');
const submitBtn = document.getElementById('generate');
const apiMessage = document.getElementById('api-message');

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
  const feeling = feelingInput.value;

  getWeatherData(baseURL, countryCode, zip, key)
    .then(data => {
      postData('http://localhost:5000/sendInfo', {
        city: data.name,
        comment: feeling
      });
    })
    .then(() => updateUI())
}

/* Update UI Function */
const updateUI = async () => {
  const request = await fetch('http://localhost:5000/all');

  try {
    const allData = await request.json();
    console.log(allData);
    
    document.getElementById('date').innerHTML = allData[0].date;
    
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
  console.log(data);
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


/* Function to GET Project Data */
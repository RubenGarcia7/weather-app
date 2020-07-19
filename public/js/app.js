// Personal API Key for OpenWeatherMap API
const key = '37e07d71f65e682fa28dc78dad83d1d5';

// api.openweathermap.org/data/2.5/weather?zip= {zip code},{country code}&appid={your api key}
const userInput = document.getElementById('zip');
const submitBtn = document.getElementById('generate');
const apiMessage = document.getElementById('api-message');

// Event listener to add function to existing HTML DOM element
submitBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  //Get user input value
  const zipCode = userInput.value;

  //Set other variables
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
  const countryCode = 'us';

  /* Function to fetch Web API Data*/
  const fetchData = async () => {
    try {
      const res = await fetch(`${baseURL}${zipCode},${countryCode}&appid=${key}`);
      const data = await res.json();
      const {
        name,
        visibility
      } = data;
      console.log(visibility + ' ' + name);
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }

  fetchData();
}

/* Function to POST data */
// const postData = async (url = '', data = {}) => {
//   console.log(data);
//   const response = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   try {
//     const newData = await response.json();
//     console.log(newData);
//     return newData
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// postData('/comment', {answer: 42});

const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

postData('/comment', { answer: 42 });



/* Function to GET Project Data */
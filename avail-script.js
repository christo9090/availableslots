
//data

const inspectors = [
  'dbbba336-22b9-5ff7-8b2c-e14d2b28605b',
  '6b986fad-17d7-5139-b364-5693c2f4e775',
  '682fa2f6-f694-5847-a93c-5ad8c29ccba1',
  '5c74bad6-63f9-4495-8f41-8674e3a0bfb4',
  '45b3fa62-9a1a-4e69-90d8-86bf28fe7850',
  '33b5d3a7-fab8-45de-b9d8-27ec11eb41e8',
  'b5540943-8dbc-467d-ae46-78145f645861',
  'b003d043-2215-4ac5-9e3e-41cf34e346aa',
  'e27cd442-a787-43a2-b2ad-98095d23b6e4', ];

const serviceType = '61ba9388-c53d-11e1-bfb4-b15dbfa5fbfd';
const daysAhead = 5;


const isnUsername = 'Christo90'
const isnPassword = 'tiger123'
let slots = []
//call function

const getAvailableSlots = async () => {
  let zipCodeOfInsp = document.getElementById('zipCodeOfInsp').value;
  // let zipCodeOfInsp = document.forms[0].id;
  console.log(zipCodeOfInsp)
  const urlToFetch = `https://inspectionsupport.com/scotthomeinspection/rest/availableslots?username=${isnUsername}&password=${isnPassword}&daysahead=${daysAhead}&zip=${zipCodeOfInsp}&services=${serviceType}`;



  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      let slots2 = jsonResponse.slots
      //loop through inspectors
      for (i = 0; i < slots2.length; i++) {
        if (inspectors.indexOf(slots2[i].userid) !== -1) {
          slots.push(slots2[i]);
        }
      };
      //sort the array by date.
      slots.sort(function(a, b) {
       var dateA = new Date(a.start), dateB = new Date(b.start);
       return dateA - dateB;
      });
      //If no availability return the following.
      if (slots.length > 0) {
        returnTimes()
      } else {
        document.getElementById('availableSlotsReturn').innerHTML = '<p>Sorry, there are no inspection slots available in the next 5 days for a pre-purchase home inspection in that zip code.</p><p>Give us a call for more options.';
      };


    } else {
  throw new Error('Request Failed!')}
  } catch (e) {
    console.log(error.message);
  }
};

// Function that modifies the DOM to return the call.
const returnTimes = () => {
  let finalReturn = []
  for (i = 0; i < slots.length; i++) {
    finalReturn.push(slots[i].start + " with " + slots[i].userdisplay + "<br>")
  };
  document.getElementById('availableSlotsReturn').innerHTML = `<p><strong>Available Slots in the next 5 days:</strong><br> ${finalReturn.join('')}</p>`;
  slots = [];
  finalReturn = [];
  newFinalReturn = [];
};

document.getElementById("submitbutton").onclick = function() {getAvailableSlots()};

// getAvailableSlots();

//jshint esversion: 6
/*

Author: Ti Tonito
This project is means to simulate a keyboard,
When the user presses the corresponding key an audio will play with that key as well as the key will be highlighted
The keys are also clickable and the samething will happen upon clicking on a keys

Future Updates:
-Load the keys asynchronously through JS
-There is a lag on the playing of the first key
/Create a "Play Me Something button" that auto-plays a sequence/song
-Add black keys because #BlackKeysMatter
-Make a single function that you can input the key you want to play in and it plays it
-Complete the playButton Function
-Optimize the promise in the sequence
*/

const initPage = () => {
  //Grab all the key elements
  const keys = document.querySelectorAll("button[data-key]");
  //Loop through all the keys
  //Add response events to all keys when they are clicked or pressed
  keys.forEach(key => key.onclick = keyAction);

  //Add event listener to the page so when the keys are pressed an action happens
  document.addEventListener("keydown", keyAction);

  //Add a onclick event for the "Play me something button"
  document.querySelector(".playButton").onclick = playSequence;


};

//Associate the keyboard press with the button
const keyPressToButton = (e) => {
  //Grab the key or keycode value (keyCode is depreciated but supported on old browsers: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
  //Graceful Degradation
  let keyPressed = e.key || e.keyCode;
  //Find the button element with a data-key equal to the key
  let keyButton = document.querySelector(`button[data-key="${keyPressed}"]`);
  //If it exists return it
  if(keyButton) {
    return keyButton;
  }
};

//Handler for all events when a key is clicked, or keyboard button is pressed
const keyAction = (e) => {

  //Determine what type of event it is: keydown or clicked
  //If it's a keydown grab the corresponding button element with the same data-key as the "key" property using the keyPressToButton function
  //If it's someone clicking a key just get the target
  //The buttonKey will hold the html element
  let buttonKey = (e.type === "click") ? e.target : keyPressToButton(e);


  //Pass it to all the functions if it wasn't given a null value (by keyPressToButton)
  if(buttonKey) {
    startTransition(buttonKey);
    transitionEnd(buttonKey);
    playSound(buttonKey);
  }

};

const startTransition = (key) => {
  //Add the playing class to the key
  key.classList.add("playing");
};

const transitionEnd = (key) => {
  //Get the key that was clicked
  //On the end of the transition, remove the playing class from the element
  key.ontransitionend = () => {
    key.classList.remove("playing");
  };
};

const playSound = (key) => {
  //Get the data-key attribute for the element clicked
  //Get the audio element with a data-key that is equal to same key
  let audio = document.querySelector(`audio[data-key="${key.getAttribute("data-key")}"]`);
  //Reset the time and play the audio
  audio.currentTime = 0;
  audio.play();
};

const playSequence = () => {
  //Grab the specific html buttons(f,g,e) and map to vars

  const fKey = document.querySelector(`button[data-key="f"]`);
  const gKey = document.querySelector(`button[data-key="g"]`);
  const eKey = document.querySelector(`button[data-key="e"]`);

  //Play the following sequence: F F G E F G
  //INCOMPLETE
  new Promise(function(resolve, reject) {

  setTimeout(() => playSound(fKey), 1000);
}).then(function(result) {
  setTimeout(() => playSound(fKey), 1000);
}).then(function(result) {
  setTimeout(() => playSound(gKey), 1000);
}).then(function(result) {
  setTimeout(() => playSound(eKey), 1000);
}).then(function(result) {
  setTimeout(() => playSound(fKey), 1000);
}).then(function(result) {
  setTimeout(() => playSound(gKey), 1000);
});

};


initPage();

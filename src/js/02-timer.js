// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_blue.css");
// all modules
import Notiflix from 'notiflix';
const inputPicker=document.getElementById('datetime-picker');

const startBtn=document.querySelector(`[data-start]`);
const timerBody=document.querySelector('.timer');

const daysData=document.querySelector('[data-days]');
const hourData=document.querySelector('[data-hours]');
const minutesData=document.querySelector('[data-minutes]');
const secondsData=document.querySelector('[data-seconds]');

startBtn.disabled='true';

let chooseDate=null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
           
      if (selectedDates[0] >= options.defaultDate) {
        startBtn.disabled = false; 
      }

      if (selectedDates[0] <= options.defaultDate) {
        Notiflix.Notify.failure("Please choose a date in the future");   
      }
      chooseDate=selectedDates[0].getTime();
  },
};

const date = new Date();
startBtn.addEventListener('click',()=>{ timer.startTimer();} )
const flatpickrDateTime = new flatpickr(inputPicker, options);

class Timer {
  constructor ({onTick}){
    this.intervalId = null;
    this.isActive = false;
    this.onTick=onTick;
    this.init();
  }

  init(){
    const time=convertMs(0)
    this.onTick(time);
  }

  startTimer() {
    if (this.isActive){return;}

    this.isActive=true;

  this.intervalId = setInterval(()=>{
      
      const startTime=new Date().getTime();
      const delta=chooseDate-startTime;
     
      if(delta<0){
        clearInterval(this.intervalId)
        this.isActive=false;
        return }

        else {
          const time = convertMs(delta);
          this.onTick(time);
        }
          
    },1000);
  } 

}

const timer=new Timer({
  onTick: updateClockface
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2,'0');
}

function updateClockface({ days, hours, minutes, seconds }){
  daysData.textContent=`${days}`
  hourData.textContent=`${hours}`
  minutesData.textContent=`${minutes}`
  secondsData.textContent=`${seconds}`

}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const field=document.querySelectorAll('.field');

timerBody.style.display='flex';

timerBody.style.justifyContent="center";
timerBody.style.marginTop="60px";

daysData.style.color= getRandomHexColor();
hourData.style.color= getRandomHexColor();
minutesData.style.color= getRandomHexColor();
secondsData.style.color= getRandomHexColor();

fMarginRight()
function fMarginRight(){
  field.forEach(element => {
    element.style.marginRight = "40px";
  });
}

const label=document.querySelectorAll('.label');
const valueSpan=document.querySelectorAll('.value');

labelFontSize(label);

valueSpanFont(valueSpan);

function labelFontSize(array){
  array.forEach(element => {
    element.style.fontSize = "50px";
    element.style.fontWeight = "bolder";
  });
}

function valueSpanFont(array){
  array.forEach(element => {
    element.style.fontSize = "75px";
    element.style.fontWeight = "bolder";
  });
}


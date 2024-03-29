const container = document.querySelector('.contianer');
const closeButton = document.querySelector('.close-button');
const xMark = document.querySelector('.fa-xmark');
  
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
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
    'December',
  ];
  const day_names = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year; 
    let first_day = new Date(year, month);
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div');
    day.classList.add('day');
      
      if (i >= first_day.getDay()) {
        day.innerText = i - first_day.getDay() + 1;

        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);

      day.addEventListener('click', ()=>{
        container.style.display = 'none';
        eventCreator.style.display = 'block';
      })
    }
  };
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentDay = { value: currentDate.getDay()}
  let todaysDate = {value: currentDate.getDate()};
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  
  todayShowDate.textContent = `${day_names[`${currentDay.value}`]}, ${todaysDate.value} ${month_names[`${currentMonth.value}`]} ${currentYear.value}`;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);

  //event-creator script
  
  const eventCreator = document.querySelector('.event-wrapper');
  eventCreator.style.display = 'none';
  
  closeButton.addEventListener('click', () => {
        container.style.display = 'grid';
        eventCreator.style.display = 'none';
  }
  )

//form handling

function showNotification(){
  if ("Notification" in window) {
    // Request permission for notifications
    Notification.requestPermission().then((permission) =>{
      // If the user grants permission, create a notification
      if (permission === "granted") {
        const notification = new Notification("Task Reminder", {
          body: "You have a task due soon!",
        });
        // Close the notification after a few seconds
        setTimeout(notification.close.bind(notification), 5000);
      }
    });
  }
}

const form = document.querySelector(".event-form");
const eventName = document.querySelector("#event");

const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");
const sendButton = document.querySelector(".send-button");

    let result = false;
    let result2 = false;
    let result3 = false;
  
    dayInput.addEventListener("change", () => {
      const siku = dayInput.value;
      const sikuYaLeo = currentDate.getDate();
      const leoLeo = sikuYaLeo.toString();
  
      if (siku === leoLeo) {
        result = true;
      } else {
        result = false;
      }
    });
  
    monthInput.addEventListener("change", () => {
      const monthVal = monthInput.value;
      const mwezi = month_names[currentDate.getMonth()];
  
      if (monthVal === mwezi) {
        result2 = true;
      } else {
        result2 = false;
      }
    });
  
    yearInput.addEventListener("change", () => {
      const yearVal = yearInput.value;
      const mwakahuu = currentDate.getFullYear();
      const miaka = mwakahuu.toString();
  
      if (yearVal === miaka){
        result3 = true;
      } else {
        result3 = false;
      }
    });
  
    window.addEventListener("change", ()=>{
      sendButton.addEventListener("click", ()=>{
        if(result && result2 && result3){

          //showNotification();

          //setInterval(showNotification, 2 * 60 * 60 * 1000)
          setInterval(() => {
            showNotification();
          }, 2 * 60 * 60 * 1000);
        }  
      });
    })

monthInput.addEventListener("change", () => {
  const val = monthInput.value;
  const mwaka = yearInput.value;

  if(val === "january" || val === "march" || val === "may" || val === "july" || val === "august" || val === "october" || val === "december"){
    dayInput.setAttribute("max", "31")
  }
  else if(val === "april" || val === "june" || val === "september" || val === "november"){
    dayInput.setAttribute("max", "30");
  }
  else{
    if(mwaka%4 === 0){
      dayInput.setAttribute("max", "29")
    }
    else if(mwaka%4 !== 0){
      dayInput.setAttribute("max", "28")
    }
  }
})

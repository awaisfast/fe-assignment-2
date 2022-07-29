"use strict";
// let taskInput = document.querySelector("input").textContent;
// taskInput = "awais";
// console.log(taskInput);
// console.log("Awais");

const containerTasks = document.querySelector("#task__list");
const taskButton = document.getElementById("add");

// Class of TODO LIST
let tasksArray = [];

class Todo {
  constructor(title, date, time) {
    this.title = title;
    this.date = date;
    this.time = time;
  }
}

function renderHTML(str) {
  tasksArray.map((el, i) => {
    console.log(el.title);
    const html = `<div class="task">
          <div class="task__content">
            <div class="title">
              <i class="fa-solid fa-list-check"></i>
              <h2>Task ${i + 1}:</h2>
              <p>${el.title}</p>
            </div>
            <div class="date__time"><p>${el.date} @ ${el.time} ${str}</p></div>
            <div class="options">
              <div class="btns">
                <button class="edit">
                  <i class="fa-solid fa-italic"></i>
                </button>
                <button class="complete">
                  <i class="fa-solid fa-circle-check"></i>
                </button>
                <button class="remove">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>`;
    containerTasks.insertAdjacentHTML("afterbegin", html);
  });
}

taskButton.addEventListener("click", function () {
  containerTasks.innerHTML = "";

  const taskInput = document.querySelector("input").value;
  document.querySelector("input").value = "";

  const dateTime = new Date();
  const dateDay = String(dateTime.getDate()).padStart(2, 0);
  const dateMonth = String(dateTime.getMonth() + 1).padStart(2, 0);
  const dateYear = dateTime.getFullYear();
  let str = "";
  let timeHour = dateTime.getHours();
  str = timeHour > 12 ? "PM" : "AM";
  timeHour = timeHour > 12 ? timeHour - 12 : timeHour;
  timeHour = String(timeHour).padStart(2, 0);

  let timeMin = String(dateTime.getMinutes()).padStart(2, 0);

  const date = `${dateDay}/${dateMonth}/${dateYear}`;
  const time = `${timeHour}:${timeMin}`;

  tasksArray.push(new Todo(taskInput, date, time));

  //render
  renderHTML(str);
});

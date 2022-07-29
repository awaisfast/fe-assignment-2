"use strict";

let tasksArray = [];

const containerTasks = document.querySelector("#task__list");
containerTasks.classList.add("displayRemove");
const taskButton = document.getElementById("add");
const completeButton = document.querySelector(".complete");

function completeTask(event, i) {
  tasksArray[i].isComplete = tasksArray[i].isComplete ? false : true;
  renderHTML();
}

function removeTask(event, i) {
  tasksArray.splice(i, 1);
  containerTasks.innerHTML = "";
  renderHTML();
}

// Class of TODO LIST

class Todo {
  constructor(title, date, time, str, isComplete) {
    this.title = title;
    this.date = date;
    this.time = time;
    this.str = str; // AM/PM
    this.isComplete = isComplete;
  }
}

function renderHTML() {
  containerTasks.innerHTML = "";
  let str = "";
  tasksArray.map((el, i) => {
    console.log(el.title, el.isComplete);
    str = el.isComplete ? "completeTask" : "";
    const html = `<div class="task ${str}">
          <div class="task__content">
            <div class="title">
              <i class="fa-solid fa-list-check"></i>
              <h2>Task ${i + 1}:</h2>
              <p>${el.title}</p>
            </div>
            <div class="date__time">
                <p>${el.date} @ ${el.time} ${el.str}</p>
            </div>
            <div class="options">
              <div class="btns">
                <button class="edit">
                  <i class="fa-solid fa-italic"></i>
                </button>
                <button class="complete" onclick="completeTask(event,${i})">
                    <i class="fa-solid fa-circle-check"></i>
                  </button>
                <button class="remove" onclick="removeTask(event,${i})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>`;
    containerTasks.insertAdjacentHTML("beforeend", html);
  });
}

console.log(completeButton.addEventListener("click", () => {}));

taskButton.addEventListener("click", function () {
  containerTasks.innerHTML = "";
  containerTasks.classList.remove("displayRemove");

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

  tasksArray.push(new Todo(taskInput, date, time, str, false));

  //render
  renderHTML();
});

console.log(tasksArray);

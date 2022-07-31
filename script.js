"use strict";
let selectedIndex = 0;
let tasksArray = [];
tasksArray = JSON.parse(localStorage.getItem("lastname"));

const containerTasks = document.querySelector("#task__list");
containerTasks.classList.add("displayRemove");
const taskButton = document.getElementById("add");
const editButton = document.getElementById("edit");
const inputField = document.querySelector("input");
const inputEnter = document.querySelector("input");
const completeButton = document.querySelector(".complete");
const editOption = document.querySelector(".edit");

containerTasks.classList.remove("displayRemove");
renderHTML();

function completeTask(event, i) {
  tasksArray[i].isComplete = tasksArray[i].isComplete ? false : true;
  renderHTML();
}

function removeTask(event, i) {
  tasksArray.splice(i, 1);
  containerTasks.innerHTML = "";
  renderHTML();
}

function editTask(i) {
  console.log("start editinh");
  taskButton.classList.add("displayRemove");
  editButton.classList.remove("displayRemove");
  selectedIndex = i;
}
editButton.addEventListener("click", function () {
  let str = "";
  str = inputField.value;
  tasksArray[selectedIndex].title = str;
  taskButton.classList.remove("displayRemove");
  editButton.classList.add("displayRemove");
  console.log(tasksArray, tasksArray[selectedIndex], selectedIndex);
  renderHTML();
});

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
  inputField.value = "";
  let str = "";
  console.log("hello", tasksArray);
  localStorage.setItem("lastname", JSON.stringify(tasksArray));
  tasksArray.map((el, i) => {
    console.log("map hellow", containerTasks);
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
                <button class="edit" onclick="editTask(${i})">
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

function creatObject() {
  // containerTasks.innerHTML = "";

  containerTasks.classList.remove("displayRemove");

  const taskInput = inputField.value.trim();
  inputField.value = "";

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
}

inputEnter.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    taskButton.click();
  }
});

taskButton.addEventListener("click", function () {
  if (inputField.value.trim().length != 0) {
    creatObject();
    renderHTML();
  }
});

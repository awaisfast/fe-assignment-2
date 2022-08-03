"use strict";
let selectedIndex = 0; //global variable to use index
let tasksArray = []; //to store objects

if (localStorage.getItem("lastname")) {
  tasksArray = JSON.parse(localStorage.getItem("lastname"));
}

const containerTasks = document.getElementById("task__list");
const taskButton = document.getElementById("add");
const editButton = document.getElementById("edit");
const inputField = document.querySelector("input");
const inputEnter = document.querySelector("input");
const completeButton = document.querySelector(".complete");

renderHTML();

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

completeTask = (event, i) => {
  tasksArray[i].isComplete = tasksArray[i].isComplete ? false : true;
  renderHTML();
};

removeTask = (event, i) => {
  tasksArray.splice(i, 1);
  renderHTML();
};

editTask = (i) => {
  //add and remove addTask/editTask buttons
  taskButton.classList.add("displayRemove");
  editButton.classList.remove("displayRemove");
  selectedIndex = i;
};
editButton.addEventListener("click", () => {
  let str = inputField.value.trim();
  //checking if input field is not empty
  tasksArray[selectedIndex].title =
    str.length > 0 ? str : tasksArray[selectedIndex].title;
  taskButton.classList.remove("displayRemove");
  editButton.classList.add("displayRemove");
  renderHTML();
});

renderHTML = () => {
  containerTasks.innerHTML = "";
  inputField.value = "";
  let str = "";
  localStorage.setItem("lastname", JSON.stringify(tasksArray));
  console.log(tasksArray);
  if (tasksArray) {
    tasksArray.map((el, i) => {
      //checking if the task is complete orn not
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
};

function calcDate() {
  const dateTime = new Date();
  const dateDay = String(dateTime.getDate()).padStart(2, 0);
  const dateMonth = String(dateTime.getMonth() + 1).padStart(2, 0);
  const dateYear = dateTime.getFullYear();
  const date = `${dateDay}/${dateMonth}/${dateYear}`;
  return date;
}

function createTask() {
  const taskInput = inputField.value.trim();
  inputField.value = "";

  //getting date and time in dd/mm/yyyy format

  let str = "";
  let timeHour = dateTime.getHours();
  str = timeHour > 12 ? "PM" : "AM";
  timeHour = timeHour > 12 ? timeHour - 12 : timeHour;
  timeHour = String(timeHour).padStart(2, 0);
  let timeMin = String(dateTime.getMinutes()).padStart(2, 0);

  const date = calcDate();
  const time = `${timeHour}:${timeMin}`;

  tasksArray.push(new Todo(taskInput, date, time, str, false));
}

inputEnter.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    //checking is enter pressed for edit or add task
    taskButton.classList.contains("displayRemove")
      ? editButton.click()
      : taskButton.click();
  }
});

taskButton.addEventListener("click", () => {
  if (inputField.value.trim().length != 0) {
    createTask();
    renderHTML();
  }
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let todos = "";

function addToList() {
  const inp = document.querySelector(".js-input");
  const dueDate = document.querySelector(".js-date");
  const today = new Date();
  const dateObj = new Date(dueDate.value);
  const tdate = today.getDate();
  const duedate = dateObj.getDate();
  const tmonth = today.getMonth() + 1;
  const duemonth = today.getMonth() + 1;

  if (inp.value.trim() !== "" && dateObj != "Invalid Date") {
    tasks.push({
      inputvalue: inp.value,
      duedate,
      duemonth,
      checked: false,
    });
  } else {
    alert("Type the task to be completed");
  }

  inp.value = "";
  dueDate.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTodolist();
  setcurrentdate();
}

function renderTodolist() {
  const today = new Date();
  const tdate = today.getDate();
  const tmonth = today.getMonth() + 1;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let lis = document.querySelector(".js-list");
  todos = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let month = months[task.duemonth - 1];
    console.log(tdate);
    console.log(task.duedate);
    if (tdate <= task.duedate) {
      todos += `
      <div class="flex justify-between items-center p-5 bg-white">
        <div class="flex items-center space-x-2">
          <input type="checkbox" 
       onclick="toggleCheckbox(${i})" 
       class="w-5 h-5 accent-blue-500 js-checkbox cursor-pointer" 
       ${task.checked ? "checked" : ""}>

          <p>${task.inputvalue}</p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-sm  bg-gray-200 px-2 py-0.5 rounded text-gray-700">Due: ${month} ${
        task.duedate
      }</p>
          <button onclick="removelist(${i})" class="text-red-400 text-md hover:text-red-600 cursor-pointer">Remove</button>
        </div>
      </div>`;
    } else {
      todos += `
      <div class="flex justify-between items-center p-5 bg-white">
        <div class="flex items-center space-x-2">
          <input type="checkbox" 
       onclick="toggleCheckbox(${i})" 
       class="w-5 h-5 accent-blue-500 js-checkbox cursor-pointer" 
       ${task.checked ? "checked" : ""}>
          <p>${task.inputvalue}</p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-sm py-0.5 font-light text-red-700 px-2 rounded bg-red-200">Overdue: ${month} ${
        task.duedate
      }</p>
          <button onclick="removelist(${i})" class="text-red-400 text-md hover:text-red-600 cursor-pointer">Remove</button>
        </div>
      </div>`;
    }
    setcurrentdate();
  }
  if (todos != "") {
    renderDelBtn();
  } else {
    removedelBtn();
  }

  lis.innerHTML = todos;
}

function remove() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTodolist();
}

function removelist(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTodolist();
}

function check() {
  if (event.key === "Enter") addToList();
}

function renderDelBtn() {
  const JsRemoveBtn = document.querySelector(".js-remove");
  JsRemoveBtn.innerHTML = ` <button onclick="remove()" class = "text-red-400 hover:text-red-600 pr-1 cursor-pointer">Remove all Tasks</button>`;
}

function removedelBtn() {
  const JsRemoveBtn = document.querySelector(".js-remove");
  JsRemoveBtn.innerHTML = "";
}
function toggleCheckbox(i) {
  tasks[i].checked = !tasks[i].checked;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setcurrentdate() {
  const dateInput = document.querySelector(".js-date");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  dateInput.value = formattedDate;
}
window.addEventListener("load", function () {
  renderTodolist();
  setcurrentdate();
});

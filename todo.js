"use strict";

const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const btnClearAll = document.querySelector("#btnClearAll");
const modal = document.querySelector("#modal");
const btnModalSubmit = document.querySelector(".btnModalSubmit");
const btnExit = document.querySelector(".btnExit");

let data = [];
let cardId;

function getBtn(btn) {
  btn.innerHTML = ""; //очищение содержимого блока чтобы не дублировались новые задачи по неск раз

  data.forEach((task) => {
    btn.innerHTML += `                          
    <div class='${task.done ? "card card_done" : "card"}' id=${task.id}> 
    <span class="title">${task.title}</span>
    <button class='btnDelete'> <strong> Delete </strong> </button>
    <button class='btnDone'> <strong> Done </strong> </button>
    <button class='btnEdit'> <strong> Edit </strong> </button>
    </div>
    `;
  });
}

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault(); //перезагрузка отменяется. отменяет действие браузера по умолчанию

  data.push({
    title: inputText.value,
    done: false,
    id: Date.now(),
  });

  getBtn(todo);

  form.reset(); //очищает инпут
});

btnClearAll.addEventListener("click", (event) => {
  event.preventDefault();
  data = [];
  todo.innerHTML = "";
});

todo.addEventListener("click", (event) => {
  //ниже для проверки чтобы только для кнопки работало
  if (event.target.classList.contains("btnDelete")) {
    const card = event.target.closest(".card"); //находит род.элемент,ближ. с классом кард
    const cardId = +card.id; //ищем по айди элемент // + чтобы добавлялись значения вниз, а не переписывались заново
    const cardIndexInData = data.findIndex((task) => task.id === cardId);
    data.splice(cardIndexInData, 1);

    getBtn(todo);
  }

  if (event.target.classList.contains("btnDone")) {
    const card = event.target.closest(".card");
    const cardId = +card.id;
    const cardIndexInData = data.findIndex((task) => task.id === cardId);
    data[cardIndexInData].done = !data[cardIndexInData].done;

    getBtn(todo);
  }

  if (event.target.classList.contains("btnEdit")) {
    const card = event.target.closest(".card");
    cardId = +card.id; //ищем по айди элемент // + чтобы добавлялись значения вниз, а не переписывались заново
    const title = card.querySelector(".title");
    let info = title.textContent;
    const inputModal = modal.querySelector("#inputModal");
    inputModal.value = info;
    modal.classList.toggle("visible");
  }
});
/// Создаем событие для выхода из модального окна
const closeModal = () => {
  modal.classList.remove("visible");
};
btnExit.addEventListener("click", closeModal);

// создаем функцию для редактирования в инпуте модального окна и добавление в список
const editTask = (event) => {
  event.preventDefault();
  const inputModal = modal.querySelector("#inputModal");
  let info = inputModal.value;
  const cardIndexInData = data.findIndex((task) => task.id === cardId);
  const el = data[cardIndexInData];
  data.splice(cardIndexInData, 1, {
    ...el,
    title: info,
  });
  getBtn(todo);
  closeModal();
};
btnModalSubmit.addEventListener("click", editTask);

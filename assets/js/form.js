const tBody = document.querySelector("tbody");
const ascBtn = document.querySelector(".sort");
const searchInput = document.querySelector("#search");
const allInputs = document.querySelectorAll("form input");
const form = document.querySelector("form");
const addBtn = document.querySelector(".add");
const products = [];
const productsCopy = [];

async function getData() {
  let res = await axios(`${BASE_URL}/products`);
  drawTable(res.data);
}

getData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `  <td>${element.id}</td>
    <td><img src="${element.image}" alt="" /></td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td><i class="fa-solid fa-trash" onclick="deleteElem(${element.id},this)"></i> <i class="fa-solid fa-pen-to-square" onclick="editElem(${element.id})"></i>
    </td>`;
    tBody.append(trElem);
  });
}
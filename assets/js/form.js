const form = document.querySelector("form");
const tBody = document.querySelector("tbody");
const addBtn = document.querySelector(".add");
const allInputs = document.querySelectorAll("form input");
let addId = null;
let products = [];
let productsCopy = [];
let addStatus = false;
const searchInput = document.querySelector("#search");
const ascBtn = document.querySelector(".asc");
async function getData() {
  const res = await axios(`${BASE_URL}/products`);
  drawTable(res.data);
  products = res.data;
  productsCopy = [...res.data];
}
getData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `   <td>${element.id}</td> 
    <td><img src="${element.image}" alt="" /></td>
    <td>${element.title}</td>
 
    <td>${element.price}</td>
    <td><div class="icons"> <i class="fa-solid fa-pen-to-square fa-bounce" onclick=editElem(${element.id})></i> <i class="fa-solid fa-trash fa-bounce" onclick="deleteElem(${element.id},this)"></i></div></td>`;
    tBody.append(trElem);
  });
}
async function deleteElem(id, btn) {
  if (confirm("Are you sure to delete???")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.closest("tr").remove();
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let Obj = {
    image: `./assets/images/${allInputs[2].value.split("\\")[2]}`,
    title: allInputs[0].value,
    price: allInputs[1].value,
  };
  if (!addStatus) {
    if (allInputs[0].value !== "" && allInputs[1].value > 0) {
      await axios.post(`${BASE_URL}/products`, Obj);
    } else {
      Toastify({
        text: "Please fill the fields!!",
        // duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  } else {
    addBtn.textContent = "Add";
    await axios.patch(`${BASE_URL}/products/${addId}`, Obj);
  }
});
async function editElem(id) {
  addId = id;
  addStatus = true;
  addBtn.textContent = "Edit";
  const res = await axios.patch(`${BASE_URL}/products/${id}`);
  allInputs[0].value = res.data.title;
  allInputs[1].value = res.data.price;
}

searchInput.addEventListener("input", function (e) {
  let filtered = menu.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

ascBtn.addEventListener("click", function () {
  let sorted;
  if (ascBtn.textContent === "Ascending") {
    sorted = productsCopy.sort((a, b) =>
      a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
    );
    ascBtn.textContent = "Descending";
  } else if (ascBtn.textContent === "Descending") {
    sorted = productsCopy.sort((a, b) =>
      b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
    );
    ascBtn.textContent = "Default";
  } else {
    sorted = productsCopy;
    ascBtn.textContent = "Ascending";
  }
  drawTable(sorted);
});

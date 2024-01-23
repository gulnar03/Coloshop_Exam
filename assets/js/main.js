$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 3,
      nav: false,
    },
    1000: {
      items: 5,
      nav: true,
      loop: false,
    },
  },
});
const shopCards = document.querySelector(".shop-cards");
const favCount = document.querySelector(".fav-count");
const loadMoreBtn = document.querySelector(".load button");
let limit = 3;
let products = [];
let favorite = getLocaleProduct();
const allBtns = document.querySelectorAll(".card-btn");
getFavCount(favorite.length);
async function getData() {
  const res = await axios(`${BASE_URL}/products`);
  products = res.data;
  drawCard(res.data.slice(0, limit));
}

getData();

function drawCard(data) {
  shopCards.innerHTML = "";
  data.forEach((element) => {
    let shopCard = document.createElement("div");
    shopCard.className = "shop-card";
    shopCard.innerHTML = `  <div class="card-top">
    <img src="${element.image}" alt="" />
    <i class="${
      favorite.some((item) => item.id === element.id)
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart"
    }" onclick="addToFav(${element.id},this)"></i>
  </div>
  <div class="card-content">
    <h4>${element.title}</h4>
    <div class="price">
      <p class="new">$ ${element.price}</p>
      <p>$ ${element?.oldPrice}</p>
    </div>
    <a href="./details.html?id=${element.id}">Read More</a>
  </div>`;
    shopCards.append(shopCard);
  });
}

function addToFav(id, icon) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
  } else {
    icon.className = "fa-regular fa-heart";
  }
  let favs = getLocaleProduct();
  let bool = favs.find((item) => item.id === id);
  let product = products.find((item) => item.id === id);
  if (bool) {
    favs = favs.filter((item) => item.id !== id);
  } else {
    favs.push(product);
  }
  setLocaleProduct(favs);
  getFavCount(favs.length);
}
function getFavCount(count) {
  favCount.textContent = count;
}

loadMoreBtn.addEventListener("click", function () {
  limit += 3;
  if (limit >= products.length) {
    this.remove();
  }
  drawCard(products.slice(0, limit));
});

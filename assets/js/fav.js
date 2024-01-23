const shopCards = document.querySelector(".shop-cards");
const favCount = document.querySelector(".fav-count");
let products = [];
let favorite = getLocaleProduct();
getFavCount(favorite.length);
async function getData() {
  const res = await axios(`${BASE_URL}/products`);
  products = res.data;
  drawCard(favorite);
}

getData();

function drawCard() {
  shopCards.innerHTML = "";
  data.forEach((element) => {
    let shopCard = document.createElement("div");
    shopCard.className = "shop-card";
    shopCard.innerHTML = `  <div class="card-top">
      <img src="${element.image}" alt="" />
      <i class="fa-solid fa-heart" onclick="deletFromFav(${element.id},this)"></i>
    </div>
    <div class="card-content">
      <h4>${element.title}</h4>
      <div class="price">
        <p class="new">$ ${element.price}</p>
        <p>$ ${element?.oldPrice}</p>
      </div>
      <a href="./details.html">Read More</a>
    </div>`;
    shopCards.append(shopCard);
  });
}

function deletFromFav(id, icon) {
  favorite = favorite.filter((item) => item.id !== id);
  icon.closest(".shop-card").remove();
  setLocaleProduct(favs);
  getFavCount(favs.length);
}
function getFavCount(count) {
  favCount.textContent = count;
}

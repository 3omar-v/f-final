const data = document.getElementById("data");

async function api() {
  try {
    const res = await fetch("https://edu-me01.github.io/Json-Data/Hospital.json");
    const final = await res.json();
    display(final.services);

  } catch (error) {
    console.error("API error:", error);
  }
}
function display(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    cartoona += `
      <div class="col-md-4 mb-4 services_11">
        <div class="rounded-3  p-3 h-100  services_12">
          <img src="${item.iconUrl}" class="w-100 rounded-3 mb-3" alt="User Image">               

          <h5 class="text-primary">${item.serviceName}</h5>

          <p class="">${item.shortDescription}</p>

          <p class="mb-1"> price : ${item.price}</p>

          <div class="box_btn d-flex justify-content-between mt-3">
            <button class="btn  btn-sm cart " onclick="addtocart(${item.id})">add to cart</button>
            <button class="btn  btn-sm" onclick="addToFavorites(${item.id})">add to Favorites </button>
          </div>
        </div>
      </div>
    `;
  }

  data.innerHTML = cartoona;
}


function addToFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    Swal.fire({
      title: 'Added',
      text: 'Added to Favorites',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Already Added',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}

function addtocart(id)
{
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire
  ({
    title: 'Added',
    text: 'Added to cart',
    icon: 'success',
    confirmButtonText: 'OK'
  });
}

document.addEventListener("DOMContentLoaded", api);

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
function display(arr,index) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    cartoona += `
  <div class="col-md-4 mb-4 services_11">
    <div class="rounded-3 p-3 h-100 position-relative services_12">
      
      <div class="icon-overlay">
        <i class="fa-regular fa-heart" onclick="addToFavorites(${item.id})" title="Add to Favorites"></i>
        <i class="fa-solid fa-cart-shopping" onclick="addtocart(${item.id})" title="Add to Cart"></i>
      </div>
      <img src="${item.iconUrl}" class="w-100 rounded-3 mb-3" alt="User Image">               
      <h5 class="text-primary h5_444">${item.serviceName}</h5>
      <div style="display:flex; justify-content:center; align-items: center; gap:50px;>
      <div class="box_btn d-flex justify-content-end">
        <button class="details" onclick='showServiceDetails(${JSON.stringify(item)})'>view details</button>
      </div></div>
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

function showServiceDetails(service) {
  const div = document.createElement("div");
  div.classList.add("overly");


  div.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex; justify-content: center; align-items: center;
    z-index: 9999;
    animation: fadeIn 0.4s ease;
  `;

  div.innerHTML = `
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    </style>

    <div class="doc_details" style="
      background: white;
      padding: 20px;
      border-radius: 10px;
      max-width: 500px;
      width: 90%;
      position: relative;
      animation: fadeIn 0.4s ease;
    ">
      <button onclick="this.parentElement.parentElement.remove()" style="
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;">&times;</button>

      <div class="image" style="text-align: center;">
        <img src="${service.iconUrl}" alt="" style="width: 150px; border-radius: 10px;">
      </div>

      <div class="data_11" style="text-align: center; margin-top: 15px;">
        <h4>${service.serviceName}</h4>
        <p>${service.shortDescription}</p>
        <div style="display:flex; justify-content: center; gap: 100px;">
          <p><strong>Price:</strong> ${service.price}</p>
          <p><strong>Rating:</strong> ${service.rating ?? 'Not rated'}</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(div);
}



document.addEventListener("DOMContentLoaded", api);

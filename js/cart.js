const dataContainer = document.getElementById("data");

document.addEventListener("DOMContentLoaded", async () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // حساب التكرارات
  const counts = {};
  cartItems.forEach(id => counts[id] = (counts[id] || 0) + 1);

  try {
    const res = await fetch("https://edu-me01.github.io/Json-Data/Hospital.json");
    const json = await res.json();
    const services = json.services;

    let cartHTML = "";
    let total = 0;

    for (const id in counts) {
      const item = services.find(service => service.id === parseInt(id));
      if (!item) continue;

      const count = counts[id];
      const price = parseFloat(item.price) || 0;
      total += price * count;

      cartHTML += `
        <div class="col-md-12 mb-3">
          <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-3">
              <img src="${item.iconUrl}" alt="" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;">
              <div>
                <h5>${item.serviceName}</h5>
                <p class="mb-0">Price: ${price} EGP</p>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-danger" onclick="decreaseQty(${id})">-</button>
              <span class="px-2">${count}</span>
              <button class="btn btn-outline-success" onclick="increaseQty(${id})">+</button>
            </div>

            <button class="btn btn-danger" onclick="removeItem(${id})">Remove</button>
          </div>
        </div>
      `;
    }

    if (cartItems.length === 0) {
      cartHTML = `<h4 class="text-center p-4 text-muted">Cart is empty</h4>`;
    }

    cartHTML += `
      <div class="d-flex justify-content-between align-items-center mt-4 mb-5">
        <button class="btn btn-danger" onclick="clearCart()">Clear All</button>
        <div class="d-flex gap-4 align-items-center">
          <h5>Total: ${total.toFixed(2)} EGP</h5>
          <button class="btn btn-success" onclick="buyNow()">Buy</button>
        </div>
      </div>
    `;

    dataContainer.innerHTML = cartHTML;
  } catch (err) {
    console.error("Failed to fetch services:", err);
    dataContainer.innerHTML = `<p class="text-danger text-center">Error loading cart data</p>`;
  }
});

// زيادات ونقصان الكمية
function increaseQty(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function decreaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.indexOf(id);
  if (index !== -1) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

function buyNow() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    Swal.fire("Oops", "Cart is already empty!", "info");
    return;
  }

  Swal.fire({
    title: "Success",
    text: "Your order has been placed!",
    icon: "success",
    confirmButtonText: "OK"
  }).then(() => {
    localStorage.removeItem("cart");
    location.reload();
  });
}

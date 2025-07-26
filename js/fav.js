async function loadFavorites() 
{
    const favoritesContainer = document.getElementById("favoritesGrid");
    const emptyState = document.getElementById("emptyState");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    try 
    {
        const res = await fetch("https://edu-me01.github.io/Json-Data/Hospital.json");
        const data = await res.json();

        const services = data.services.filter(service => favorites.includes(service.id));

        if (services.length === 0) {
        emptyState.classList.remove("d-none");
        favoritesContainer.innerHTML = "";
        return;
        }

        emptyState.classList.add("d-none");

        let cards = "";

        for (const item of services) {
        cards += `
            <div class="col-md-4 mb-4 cards_2222">
            <div class="card shadow-sm p-3 h-100">
                <img src="${item.iconUrl}" class="card-img-top rounded mb-3" alt="${item.serviceName}">
                <div class="card-body">
                <h5 class="card-title text-primary">${item.serviceName}</h5>
                <p class="card-text">${item.shortDescription}</p>
                <p class="card-text"><strong>Price:</strong> ${item.price}</p>
                <button class="btn btn-danger btn-sm remove_22" onclick="removeFromFavorites(${item.id})">
                    Remove from Favorites
                </button>
                </div>
            </div>
            </div>
        `;
        }

        favoritesContainer.classList.add("row");
        favoritesContainer.innerHTML = cards;

    } catch (error) {
        console.error("Error fetching API:", error);
    }
    }

    function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(itemId => itemId !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();

    Swal.fire({
    icon: "success",
    title: "Removed",
    text: "Item removed from favorites"
    });
}

document.getElementById("clearAllBtn").addEventListener("click", () => {
    localStorage.removeItem("favorites");
    loadFavorites();

    Swal.fire({
    icon: "success",
    title: "Cleared",
    text: "All favorites removed"
    });
});

document.addEventListener("DOMContentLoaded", loadFavorites);

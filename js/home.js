fetch("https://edu-me01.github.io/Json-Data/Hospital.json")
.then(res => res.json())
.then(data => {
    let carouselItems = '';
    let cardsGroup = '';

    data.users.forEach((user, index) => 
        {
        cardsGroup += `
            <div class="card text-center" style="width: 18rem;">
                <img src="${user.profileImageUrl}" class="card-img-top" alt="${user.name}">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text p_1">${user.phone}</strong></p>
                    <p class="card-text">${user.bio}</p>
                </div>
            </div>
        `;

        if ((index + 1) % 3 === 0 || index === data.users.length - 1) 
            {
            const isActive = carouselItems === '' ? 'active' : '';
            carouselItems += `
                <div class="carousel-item none ${isActive}">
                    <div class="d-flex justify-content-center gap-4 flex-wrap">
                        ${cardsGroup}
                    </div>
                </div>
            `;
            cardsGroup = ''; 
            }
        });

    document.querySelector("#cardCarousel").innerHTML = `
        <div class="carousel-inner">
            ${carouselItems}
        </div>
        <button class="carousel-control-prev b111"  type="button" data-bs-target="#cardCarousel" data-bs-slide="prev">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="carousel-control-next b111" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
});

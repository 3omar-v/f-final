fetch("https://edu-me01.github.io/Json-Data/Hospital.json")
    .then(res => res.json())
    .then(data => {
    let carouselItems = '';
    let cardsGroup = '';
    let allUsers = [];

    data.users.forEach((user, index) => {
        allUsers.push(user); 

        cardsGroup += `
        <div class="card text-center" style="width: 18rem;">
            <img src="${user.profileImageUrl}" class="card-img-top" alt="${user.name}">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
            </div>
            <button class="details" data-index="${index}">view details</button>
        </div>
        `;

        if ((index + 1) % 3 === 0 || index === data.users.length - 1) {
        const isActive = carouselItems === '' ? 'active' : '';
        carouselItems += `
            <div class="carousel-item ${isActive}">
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

    
    document.querySelectorAll(".details").forEach(button => {
        button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const user = allUsers[index];
        div_overly(user);
        });
    });

    function div_overly(user) {
        const div = document.createElement("div");
        div.classList.add("overly");

        div.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.6);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
        `;

        div.innerHTML = `
            <div class="doc_details" style="background: white; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%; position: relative;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px;">&times;</button>
                <div class="image" style="text-align: center;">
                    <img src="${user.profileImageUrl}" alt="" style="width: 150px; border-radius: 50%;">
                </div>
                <div class="data_11" style="text-align: center; margin-top: 15px;">
                    <h4>${user.name}</h4>
                    <p>Phone: ${user.phone}</p>
                    <p>Bio: ${user.bio}</p>
                </div>
            </div>
        `;

        document.body.appendChild(div);
    }
    });

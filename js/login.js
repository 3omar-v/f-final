document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim(); 

        try {
            const res = await fetch("https://edu-me01.github.io/Json-Data/Hospital.json");
            const data = await res.json();

            const matchedUser = data.users.find(user => user.email === email && user.name === password);

            if (matchedUser) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${matchedUser.name}!`,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    localStorage.setItem("userName", matchedUser.name);
                    window.location.href = "home.html"; 
                }); 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.'
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("There was an error logging in. Please try again later.");
        }
    });
});

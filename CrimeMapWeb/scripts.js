// Nav Display Menu
const navArrow = document.querySelector('.arrow');
const navMenu = document.querySelector('.nav-menu');

navArrow.addEventListener("click", () => {
    navArrow.classList.remove("right");
    navArrow.classList.add("left");
    
});

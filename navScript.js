const navBtn = document.querySelector('.hambar');
const mobileLinks = document.querySelector('.mobileLinks');

function getNav() {
    console.log("sd")
    mobileLinks.classList.toggle('hidden');
}

navBtn.addEventListener('click', getNav);
document.addEventListener("scroll", () => mobileLinks.classList.add("hidden"))
window.addEventListener('resize', () => mobileLinks.classList.add("hidden"))
console.log(navBtn, "shiteaters")
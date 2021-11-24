const navBtn = document.querySelector('.hambar');
const mobileLinks = document.querySelector('.mobileLinks');
const container = document.querySelector('.section-1');
const container2 = document.querySelector('.container');


if(Number(screen.width) < 1900) {
    console.log("small resolution")
    container.classList.add('smallRes');
    container2.classList.add('smallResM');
}

function getNav() {
    console.log("sd")
    mobileLinks.classList.toggle('hidden');
}

navBtn.addEventListener('click', getNav);
document.addEventListener("scroll", () => mobileLinks.classList.add("hidden"))
window.addEventListener('resize', () => mobileLinks.classList.add("hidden"))
console.log("Email me at jerome0caruso@gmail.com");
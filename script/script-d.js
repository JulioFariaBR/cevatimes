const divButton = document.getElementById('mode-button-div');

function darkMode() {
    const body = document.body;
    const imagens = document.querySelectorAll('.prin-sect-b--div-img');
    const iconButton = document.getElementById('mode-button-icon');
    body.style.filter = 'invert(100%)';
    body.style.backgroundImage = 'url("../assets/background-b.png")';
    imagens.forEach((img) => {
        img.style.filter = 'invert(100%)';
        img.style.border = '0.9vh solid #FFFFFF';
    });
    iconButton.src = '../assets/assets-g.png';
    iconButton.style.filter = 'invert(0%)';
    iconButton.alt = 'Escuro';
}

function lightMode() {
    const body = document.body;
    const imagens = document.querySelectorAll('.prin-sect-b--div-img');
    const iconButton = document.getElementById('mode-button-icon');
    body.style.filter = 'invert(0%)';
    body.style.backgroundImage = 'url("../assets/background-a.png")';
    imagens.forEach((img) => {
        img.style.filter = 'invert(0%)';
        img.style.border = '0.9vh solid rgb(32, 32, 32)';
    });
    iconButton.src = '../assets/assets-f.png';
    iconButton.style.filter = 'invert(0%)';
    iconButton.alt = 'Claro';

}

let isDarkMode = false;

divButton.addEventListener('click', () => {
    if (!isDarkMode) {
        darkMode();
        isDarkMode = true;
    } else {
        lightMode();
        isDarkMode = false;
    }
})
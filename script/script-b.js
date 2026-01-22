async function busca() {
    let url = `https://docs.google.com/spreadsheets/d/1mEDo2i0R-Lw-PSK6_mPVgSimHhgWNjdMk6EvPpBXkaM/gviz/tq?tqx=out:json`

    let data = await fetch(url)
        .then(res => res.text())
        .then(text => JSON.parse(text.substr(47).slice(0, -2)))
    extraindodados(data.table.rows);
}

let manchetes = [];
let subtitulos = [];
let lides = [];
let textoDasReportagens = [];
let datasDasPublicacoes = [];
let horasDasPublicacoes = [];
let fistImages = [];
let secondImages = [];
let thirdImages = [];
let forthImages = [];
let fifthImages = [];
let sexthImages = [];
let authors = [];

const canvaPrincipal = document.querySelector('#canva');

function extraindodados(dados) {
    dados.forEach((elemento, _index) => {
        manchetes.push(elemento.c[2].v)
        subtitulos.push(elemento.c[3].v)
        lides.push(elemento.c[4].v)
        textoDasReportagens.push(elemento.c[5].v)
        datasDasPublicacoes.push(elemento.c[6].f)
        horasDasPublicacoes.push(elemento.c[7].f)
        fistImages.push(elemento.c[8].v)
        authors.push(elemento.c[14].v)
    })
    preencherPagina();
}

function formatarDataExtenso(dataStr) {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const [dia, mes, ano] = dataStr.split("/");

    return `${dia} de ${meses[parseInt(mes, 10) - 1]} de ${ano}`;
}

function formatarHora(horaStr) {
    const [hora, minuto] = horaStr.split(":");
    return `${hora}:${minuto}`;
}

function driveLinkToImageSrc(driveUrl) {
    const match = driveUrl.match(/id=([^&]+)/);
    if (!match) return null;

    const fileId = match[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
}

function preencherPagina() {
    manchetes.forEach((elemento, index) => {
            canvaPrincipal.innerHTML = `<div class="prin-sect-b--div" onclick="goTo(${index})">
                    <img src="${driveLinkToImageSrc(fistImages[index])}"
                        class="prin-sect-b--div-img">
                    <h3 class="prin-sect-b--div-h3">Publicado: ${formatarDataExtenso(datasDasPublicacoes[index])}, ás ${formatarHora(horasDasPublicacoes[index])}.</h3>

                    <h4 class="prin-sect-b--div-h4">${elemento}</h4>
                    <p class="prin-sect-b--div-p">${subtitulos[index]}</p>
                </div>${canvaPrincipal.innerHTML}`
    })
}

function goTo(index) {
    window.location.href = `${window.location.origin}/pages/notice.html?${index}`
}
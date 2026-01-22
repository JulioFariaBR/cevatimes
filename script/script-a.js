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

const elManchete = document.querySelector('#manchete');
const elSubtitulo = document.querySelector('#subtitulo');
const elLide = document.querySelector('#lide');
const elTextoDaReportagem = document.querySelector('#texto-da-reportagem');
const elInfoDaPublicacao = document.querySelector('#infos');
const canvaDaImagemPrin = document.querySelector('#imagemprincipal');
const canvaDaImagens = document.querySelector('#imagenscanvas');
let imagesDaReportagem = []

function extraindodados(dados) {
    dados.forEach((elemento, _index) => {
        manchetes.push(elemento.c[2].v)
        subtitulos.push(elemento.c[3].v)
        lides.push(elemento.c[4].v)
        textoDasReportagens.push(elemento.c[5].v)
        datasDasPublicacoes.push(elemento.c[6].f)
        horasDasPublicacoes.push(elemento.c[7].f)
        fistImages.push(elemento.c[8].v)

        if (elemento.c[9] === null) {
            secondImages.push(null)
        } else {
            secondImages.push(elemento.c[9].v)
        }

        if (elemento.c[10] === null) {
            thirdImages.push(null)
        } else {
            thirdImages.push(elemento.c[10].v)
        }

        if (elemento.c[11] === null) {
            forthImages.push(null)
        } else {
            forthImages.push(elemento.c[11].v)
        }

        if (elemento.c[12] === null) {
            fifthImages.push(null)
        } else {
            fifthImages.push(elemento.c[12].v)
        }

        if (elemento.c[13] === null) {
            sexthImages.push(null)
        } else {
            sexthImages.push(elemento.c[13].v)
        }

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
    const url = window.location.href;
    const queryValue = url.split('?')[1];
    const numero = queryValue !== undefined ? Number(queryValue) : null;

    manchetes.forEach((elemento, index) => {
        if (index === numero) {
            elManchete.innerText = elemento;
            elSubtitulo.innerText = subtitulos[index];
            elLide.innerText = lides[index];
            elTextoDaReportagem.innerText = textoDasReportagens[index];
            elInfoDaPublicacao.innerText = `Escrito: ${authors[index]}; Dia ${formatarDataExtenso(datasDasPublicacoes[index])}, ás ${formatarHora(horasDasPublicacoes[index])}.`;
            canvaDaImagemPrin.src = driveLinkToImageSrc(fistImages[index]);
            if (secondImages[index] !== null) {
                imagesDaReportagem.push(driveLinkToImageSrc(secondImages[index]));
            }
            if (thirdImages[index] !== null) {
                imagesDaReportagem.push(driveLinkToImageSrc(thirdImages[index]));
            }
            if (forthImages[index] !== null) {
                imagesDaReportagem.push(driveLinkToImageSrc(forthImages[index]));
            }
            if (fifthImages[index] !== null) {
                imagesDaReportagem.push(driveLinkToImageSrc(fifthImages[index]));
            }
            if (sexthImages[index] !== null) {
                imagesDaReportagem.push(driveLinkToImageSrc(sexthImages[index]));
            }
            canvaDaImagens.src = driveLinkToImageSrc(secondImages[index]);
        }
    })
}

let indexCarrossel = 0;

function nextfotos() {
    if (indexCarrossel < imagesDaReportagem.length - 1) {
        indexCarrossel++;
        canvaDaImagens.src = imagesDaReportagem[indexCarrossel];
    } else {
        indexCarrossel = 0;
        canvaDaImagens.src = imagesDaReportagem[indexCarrossel];
    }
}

function prevfotos() {
    if (indexCarrossel > 0) {
        indexCarrossel--;
        canvaDaImagens.src = imagesDaReportagem[indexCarrossel];
    } else {
        indexCarrossel = imagesDaReportagem.length - 1;
        canvaDaImagens.src = imagesDaReportagem[indexCarrossel];
    }
}
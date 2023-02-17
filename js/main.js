let chave = "c3dcc39ad88701f521e07fafa7bae16f";
let inputCidade = document.querySelector("[data-input]");
let botaoBusca = document.querySelector("[data-botao]");

let container = document.querySelector("[data-container]");

botaoBusca.addEventListener("click", (e) => {
    e.preventDefault();
    const cidadeInput = inputCidade.value;
    if (cidadeInput !== "") {
        pegaCoordenadas(cidadeInput, chave, container);
    } else {
        alert("Favor adicionar uma cidade para prosseguir!");
    }

})

async function pegaCoordenadas(cidadeInput, chave, container) {
    try {
        let pegaLink = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidadeInput}&limit=1&appid=${chave}`);
        let linkConvertido = await pegaLink.json();

        let latitude = linkConvertido[0].lat;
        let longitude = linkConvertido[0].lon;

        conectaAPI(latitude, longitude, container, cidadeInput, chave);

    } catch (erro) {
        alert(erro.name,':', erro.code);
    }
}


async function conectaAPI(latitude, longitude, container, cidadeInput, chave) {
    try {
        let conexao = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=${chave}&units=metric`);
        let conexaoConvertida = await conexao.json();

        let temperatura = conexaoConvertida.main.temp.toFixed(0);
        let descricao = conexaoConvertida.weather[0].description;
        let icon = conexaoConvertida.weather[0].icon;
        let umidade = conexaoConvertida.main.humidity;
        let sensacaoTermica = conexaoConvertida.main.feels_like.toFixed(0);

        mostraDados(container, cidadeInput, temperatura, icon, descricao, umidade, sensacaoTermica);

    } catch (erro) {
        alert(erro.name,':', erro.code);
    }
}

function mostraDados(container, cidadeInput, temperatura, icon, descricao, umidade, sensacaoTermica) {
    container.innerHTML = `
        <h2 class="container__titulo">Clima na cidade - ${cidadeInput}</h2>
        <h2 class="container__temperatura">${temperatura}°c</h2>
        <div class="container__clima">
            <img class="clima__img" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icone do clima">
            <p class="clima__titulo">${descricao}</p>
        </div>
        <p class="container__umidade">Umidade: ${umidade}%</p>
        <p class="container__descricao">Sensação terminca: ${sensacaoTermica}°c</p>
        <button class="container__botao-recarregar" data-botao-reload>Verificar outra cidade</button>
    `
    const botaoReload = document.querySelector("[data-botao-reload]");

    botaoReload.addEventListener("click", () => {
        window.location.reload();
    })
}
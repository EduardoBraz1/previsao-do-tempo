const chaveApiImagem = "33696278-36a08a62332aca52ad0636bc2";
const bodyPrincipal = document.querySelector("[data-body]");

botaoBusca.addEventListener("click", (e) => {
    e.preventDefault();
    const cidadeInput = inputCidade.value;

    pegaApiFoto(cidadeInput, chaveApiImagem, bodyPrincipal);
})

async function pegaApiFoto(cidadeInput, chaveApiImagem, bodyPrincipal) {
    try {
        let conexao = await fetch(`https://pixabay.com/api/?q=${cidadeInput}&lang=pt&image_type=photo&per_page=3&category=citys&key=${chaveApiImagem}`);
        let conexaoConvertida = await conexao.json();

        const imagemApi = conexaoConvertida.hits[0].webformatURL;

        bodyPrincipal.style.background = `url("${imagemApi}")`;
        bodyPrincipal.style.backgroundSize = 'Cover';
        bodyPrincipal.style.backgroundRepeat = 'no-repeat';

    } catch (erro) {
        console.log(erro.name,':', erro.code);
    }
}

function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
    /*RECEBE UMA LISTA DE OBJETOS COM CHAVE E VALOR, ACESSA CADA UM DESSES OBJETOS E EXTRAI APENAS O VALOR DO MESMO, E DEPOIS OS JUNTA EM UMA ÚNICA STRING*/
};

async function checaStatus(listaURLs){ /*VALIDA OS LINKS VERIFICANDO SEUS STATUS*/
    const arrStatus = await Promise.all( /*ALL É UM MÉTODO DO OBJETO PROMISE QUE RECEBE UMA LISTA DE PROMESSAS PENDENTES, RESOLVE, E DEPOIS RETORNA A LISTA*/
        listaURLs.map(async (url) => { /*USADA PARA PASSAR CADA URL PELA VALIDAÇÃO*/
            const response = await fetch(url); /*FECTH É UMA LIB DE NODE QUE FAZ ESSE ACESSO NA URL E OBTÉM UMA RESPOSTA DO STATUS DESSA URL*/
            return response.status;
    })
    );
    return arrStatus;
};

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return status;
}

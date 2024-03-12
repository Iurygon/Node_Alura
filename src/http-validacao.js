function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
    /*RECEBE UMA LISTA DE OBJETOS COM CHAVE E VALOR, ACESSA CADA UM DESSES OBJETOS E EXTRAI APENAS O VALOR DO MESMO, E DEPOIS OS JUNTA EM UMA ÚNICA STRING*/
};

export default function listaValidada(listaDeLinks){
    return extraiLinks(listaDeLinks);
}

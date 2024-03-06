import chalk from 'chalk'   /*IMPORTA A BIBLIOTECA CHALK, USADA PARA ESTILIZAR CORES NO TERMINAL */
import fs from 'fs'         /*IMPORTA A BIBLIOTECA FS, FILE SYSTEM, PARA ACESSAR ARQUIVOS EXTERNOS*/

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório.')); 
    /*THROW É USADO NO TRATAMENTO DE ERROS PARA CRIAR, NESSE CASO, UMA NOVA INSTÂNCIA DE ERRO, QUE IRÁ APRESENTAR A MENSAGEM DEFINIDA*/
};

// function pegaArquivo(caminhoArquivo){
//     const enconding = 'utf-8';
//     fs.readFile(caminhoArquivo, enconding,  (erro, texto) => { /*MÉTODO PRÓPRIO DA BIBLIOTECA FS*/
//         if(erro){
//             trataErro(erro)
//         };
//         console.log(chalk.green(texto));

//     });
// };

/*O CÓDIGO ACIMA FOI COMENTADO PORQUE, COMO NÃO HÁ COMO SABER O TAMANHO DO ARQUIVO QUE SERÁ PASSADO, É INVIÁVEL SEGUIR COM O CÓDIGO DE MANEIRA SÍNCRONA, AGUARDANDO ATÉ QUE TENHA O RETORNO FUNÇÃO. POR ISSO, ELE FOI SUBSTITUÍDO PELO CÓDIGO A SEGUIR QUE AJE DE MANEIRA ASSÍNCRONA*/

function pegaArquivo(caminhoArquivo){
    const enconding = 'utf-8';
    fs.promises /*AQUI É TAMBÉM USADO O MÉTODO '.PROMISES' DA BIBLIOTECA FS, MÉTODO ESSE QUE É USADO PARA TRABALHAR COM CÓDIGO ASSÍCRONO. ESSAS PROMISES, OU PROMESSAS, É JUSTAMENTE QUANDO FALAMOS DE CÓDIGO ASSÍNCRONO*/
        .readFile(caminhoArquivo, enconding) 
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro);
        /*ESSES TRÊS MÉTODOS FUNCIONAM JUNTOS. O 'READFILE' DEVOLVE UMA PROMESSA QUE SERÁ RECEBIDA E TRATADA POR 'THEN', E CASO HAJA ALGUM ERRO DURANTE SEU TRATAMENTO, ELA SERÁ LANÇADO PARA 'CATCH' */
};

pegaArquivo('texto.md')

/*ESSE PRIMEIRO MÉTODO DE CÓDIGO ASSÍNCRONO FOI FEITO UTILIZANDO O .THEN(). TAMBÉM É POSSÍVEL UTILIZANDO AS PALAVRAS CHAVE ASYNC E AWAIT, OU O PRÓPRIO OBJETO PROMISE E SEUS MÉTODOS. UTILIZANDO O MÉTODO ASYNC/AWAIT, NÓS PODEMOS REESCREVER ESSA FUNÇÃO DE FORMA MAIS SIMPLES, DA SEGUINTE FORMA*/

async function pegaArquivo2(caminhoArquivo){ /*ASYNC É USADO NO INÍCIO, NA DECLARAÇÃO DA FUNÇÃO, PARA IN FORMAR QUE SE TRATA DE UMA FUNÇÃO ASSÍNCRONA */
    try{ 
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding); /*AWAIT É USADO EM TODOS OS TRECHOS DO CÓDIGO QUE ESPERAM O RETORNO DE UMA PROMESSA */
        extraiLinks(texto);
    }
    catch(erro){
        trataErro(erro)
    };
};

/*NOTE QUE TEMOS UM BLOCO TRY / CATCH, EM QUE O TRY SERÁ JUSTAMENTE O BLOCO DE CÓDIGO QUE SERÁ TENTARÁ SER EXECUTADO NA PROMISE, INCLUINDO O IRÁ ACONTECER EM CASO DE ACERTO, JÁ O BLOCO CATCH INDICA JUSTAMENTE PARA O CASO DE ERRO, CASO A PROMISE NÃO TENHA NENHUM RETORNO, O QUE É QUE ACONTECERÁ.
EXISTE TAMBÉM UM ÚLTIMO BLOCO, O FINALLY, QUE É EXECUTADO INDEPENDENTE SE OCORRE ALGUMA EXCEÇÃO (ERRO) OU NÃO, E DIFERENTE DO CATCH, ELE NÃO RECEBE NENHUM PARÂMETRO DENTRO DOS PARÊNTESES. NÓS PODEMOS FAZER UMA ADIÇÃO NA FUNÇÃO COLOCANDO, POR EXEMPLO, UM BLOCO FINALLY PARA EXIBIR UMA MENSAGEM INFORMANDO QUE A OPERAÇÃO FOI CONCLUÍDA.
DETALHE: AMBOS CATCH E FINALLY SÃO OPCIONAIS, MAS O TRY PRECISA ESTAR ACOMPANHAO DE ALGUM DELES*/

/*REGEX*/

/*AGORA, PARA RETIRAR DO ARQUIVO DE TEXTO EXATEMENTE OS LINKS QUE PRECISAMOS PARA QUE NOSSA API FUNCIONE, FAREMOS USO DE REGEX, OU REGULAR EXPRESSIONS, QUE NADA MAIS É DO QUE COMANDOS PRÓPRIOS EM CADA LINGUAGEM QUE VÃO FUNCIONAR PARA TRATAR O TEXTO E RETIRAR SOMENTE AQUILO QUE BUSCAMOS*/

const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.'

/*DECLARAMOS UM TEXTO TESTE QUE SERÁ USADO PARA FAZER A VISUALIZAÇÃO DE COMO FUNCIONA O REGEX*/

// function extraiLinks(texto) {
//     const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; /*ESSE É O COMANDO REGEX QUE IRÁ EXTRAIR SOMENTE O QUE PRECISAMOS DO TEXTO*/
//     const capturas = regex.exec(texto); /*E ESTE É UM COMANDO PRÓPRIO DO OBJETO REGEX NO JAVASCRIPT QUE IRÁ APRESENTAR O RESULTADO*/
//     console.log(capturas);
// };
/*E DEPOIS FAZEMOS A DECLARAÇÃO DA FUNÇÃO QUE USARÁ DE REGEX E SEUS MÉTODOS PARA EXTRAIR OS LINKS DO TEXTO TESTE*/

/*PORÉM, FAREMOS A FUNÇÃO DA SEGUINTE FORMA, PARA RETORNAR TODOS OS RESULTADOS NECESSÁRIOS AO INVÉS DE APENAS UM, COMO ESTAVA SENDO*/
function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]; /*MATCHALL É UM MÉTODO PARA COMBINAR TODAS AS OCORRÊNCIAS DO NOSSO REGEX*/
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]})); /*O USO DOS COLCHETES SÃO NECESSÁRIOS QUANDO PASSAMOS UM ELEMENTO DE UM ARRAY COMO CHAVE DE UM OBJETO. ALÉM DO MAIS, O USO DOS PARÊNTESES SERVE PARA QUE O SISTEMA RECONHEÇA QUE É UMA CHAVE DE UM OBJETO E NÃO DE UMA FUNÇÃO*/
    console.log(resultados)
}

/*extraiLinks(textoTeste)*/

export default pegaArquivo
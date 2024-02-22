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

pegaArquivo('./arquivos/texto.md')

/*ESSE PRIMEIRO MÉTODO DE CÓDIGO ASSÍNCRONO FOI FEITO UTILIZANDO O .THEN(). TAMBÉM É POSSÍVEL UTILIZANDO AS PALAVRAS CHAVE ASYNC E AWAIT, OU O PRÓPRIO OBJETO PROMISE E SEUS MÉTODOS. UTILIZANDO O MÉTODO ASYNC/AWAIT, NÓS PODEMOS REESCREVER ESSA FUNÇÃO DE FORMA MAIS SIMPLES, DA SEGUINTE FORMA*/

async function pegaArquivo2(caminhoArquivo){ /*ASYNC É USADO NO INÍCIO, NA DECLARAÇÃO DA FUNÇÃO, PARA IN FORMAR QUE SE TRATA DE UMA FUNÇÃO ASSÍNCRONA */
    try{ 
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding); /*AWAIT É USADO EM TODOS OS TRECHOS DO CÓDIGO QUE ESPERAM O RETORNO DE UMA PROMESSA */
        console.log(chalk.green(texto));
    }
    catch(erro){
        trataErro(erro)
    };
};

/*NOTE QUE TEMOS UM BLOCO TRY / CATCH, EM QUE O TRY SERÁ JUSTAMENTE O BLOCO DE CÓDIGO QUE SERÁ TENTARÁ SER EXECUTADO NA PROMISE, INCLUINDO O IRÁ ACONTECER EM CASO DE ACERTO, JÁ O BLOCO CATCH INDICA JUSTAMENTE PARA O CASO DE ERRO, CASO A PROMISE NÃO TENHA NENHUM RETORNO, O QUE É QUE ACONTECERÁ.
EXISTE TAMBÉM UM ÚLTIMO BLOCO, O FINALLY, QUE É EXECUTADO INDEPENDENTE SE OCORRE ALGUMA EXCEÇÃO (ERRO) OU NÃO, E DIFERENTE DO CATCH, ELE NÃO RECEBE NENHUM PARÂMETRO DENTRO DOS PARÊNTESES. NÓS PODEMOS FAZER UMA ADIÇÃO NA FUNÇÃO COLOCANDO, POR EXEMPLO, UM BLOCO FINALLY PARA EXIBIR UMA MENSAGEM INFORMANDO QUE A OPERAÇÃO FOI CONCLUÍDA.
DETALHE: AMBOS CATCH E FINALLY SÃO OPCIONAIS, MAS O TRY PRECISA ESTAR ACOMPANHAO DE ALGUM DELES*/
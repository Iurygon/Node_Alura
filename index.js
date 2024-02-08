import chalk from 'chalk'   /*IMPORTA A BIBLIOTECA CHALK, USADA PARA ESTILIZAR CORES NO TERMINAL */
import fs from 'fs'         /*IMPORTA A BIBLIOTECA FS, FILE SYSTEM, PARA ACESSAR ARQUIVOS EXTERNOS*/

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório.'));
};

function pegaArquivo(caminhoArquivo){
    const enconding = 'utf-8';
    fs.readFile(caminhoArquivo, enconding,  (erro, texto) => { /*MÉTODO PRÓPRIO DA BIBLIOTECA FS*/
        if(erro){
            trataErro(erro)
        };
        console.log(chalk.green(texto));

    });
};

pegaArquivo('./arquivos/texto.md')

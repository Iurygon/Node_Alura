import chalk from 'chalk'   /*IMPORTA A BIBLIOTECA CHALK, USADA PARA ESTILIZAR CORES NO TERMINAL */
import fs from 'fs'         /*IMPORTA A BIBLIOTECA FS, FILE SYSTEM, PARA ACESSAR ARQUIVOS EXTERNOS*/

function pegaArquivo(caminhoArquivo){
    const enconding = 'utf-8';
    fs.readFile(caminhoArquivo, enconding,  (_, texto) => { /*MÉTODO PRÓPRIO DA BIBLIOTECA FS*/
        console.log(chalk.green(texto));
    });
};

pegaArquivo('./arquivos/texto.md')

/*ESTE ARQUIVO SERÁ ONDE DAREMOS CONTINUIDADE NO CURSO*/

import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';
import listaValidada from "./http-validacao.js";

const caminho = process.argv

/*O 'PROCESS' É UM OBJETO DO NODE QUE CAPTURA O QUE FOI PASSADO VIA CONSOLE, OU SEJA, OS ARGUMENTOS, E A SUA PROPRIEDADE PROCESS TRAZ OS VALORES DESSES ARGUMENTOS. ISSO É EXTREMAMENTE ÚTIL, JÁ QUE DIVERSAS VEZES PRECISAMOS TRABALHAR UTILIZANDO O CONSOLE DO TERMINAL.
NO CASO DO NOSSO PROJETO, ELE SERÁ UTILIZADO PARA QUE, AO CHAMARMOS A FUNÇÃO 'PEGARQUIVO', POSSAMOS INFORMAR ATRAVÉS DO CONSOLE QUAL O PARÂMETRO QUE ELA IRÁ RECEBER.

ANALISANDO NO CONSOLE.LOG QUE FIZEMOS ACIMA, VEMOS QUE SERÁ RETORNAD PELO SISTEMA UM ARRAY COM ALGUMAS INFORMAÇÕES SOBRE O CAMINHO DOS ARQUIVOS, MAS SE USARMOS NA HORA DE EXECUTAR O COMANDO PELO CONSOLE, POR EXEMPLO, O COMANDO 'NODE CLI.JS TESTE', VAMOS VER QUE APRESENTARÁ NESTE ARRAY UMA STRING 'TESTE'

SENDO ASSIM, PODEMOS USAR DISSO PARA PASSAR O CAMINHO DO ARQUIVO QUE QUEREMOS ATRAVÉS DA POSIÇÃO DO ARRAY DA SEGUINTE FORMA:*/

function imprimeLista(valida, resultado, identificaArquivo = ''){
    if(valida){
        console.log(
            chalk.yellow('Lista validada:'),
            chalk.black.bgGreen(identificaArquivo),
            listaValidada(resultado)
        );
    }
    else{
        console.log(
            chalk.yellow('Lista de links:'),
            chalk.black.bgGreen(identificaArquivo),
            resultado
        );
    };
};

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try{
        fs.lstatSync(caminho) /*Verifica se o caminho passado no console realmente existe ou não. Caso não exista, será chamado o erro*/
    }
    catch(erro){
        if(erro.code === 'ENOENT'){ /*ENOENT VEM DE ERROR NO ENTITY*/
            console.log(chalk.red('Arquivo ou diretório não encontrado'));
            return;
        };
    }
    if(fs.lstatSync(caminho).isFile()){    /*VERIFICA SE O CAMINHO PASSADO NO CONSOLE É UM ARQUIVO*/ 
        const resultado = await pegaArquivo(caminho); /*ESSE ARQUIVO É PASSADO PARA A FUNÇÃO 'PEGAARQUIVO'*/
        imprimeLista(valida, resultado) /*E É EXIBIDO O RESULTADO COM A FUNÇÃO 'IMPRIMELISTA' */
    }
    else if(fs.lstatSync(caminho).isDirectory()){   /*VERIFICA SE O CAMINHO PASSADO NO CONSOLE É UM DIRETÓRIO*/
        const arquivos = await fs.promises.readdir(caminho);    /*ESSA FUNÇÃO PROMISE FAZ UMA LEITURA DO DIRETÓRIO E GERA UM ARRAY COM OS ARQUIVOS*/
            arquivos.forEach(async (nomeDeArquivo) => {   /*EM CADA ARQUIVO DO ARRAY É CHAMADA UMA FUNÇÃO QUE IRÁ CHAMAR 'PEGAARQUIVO' PASSANDO O CAMINHBO DO ARQUIVO*/
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        })
    };
};

processaTexto(caminho)

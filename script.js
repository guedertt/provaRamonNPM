//importacões
import fs from 'fs';
import { v4 } from 'uuid';  
import express from 'express'

const app = express()
const porta = 3000
const path = "logs.txt";
const novoID = gerarID();
const dataHoraAtual = new Date();
const conteudoArquivo = `${novoID} - ${dataHoraAtual.toISOString()} - Guilherme Guedert\n`; // formata como uma string o conteudo do arquivo

//gerar id
function gerarID() { 
    return v4();  
}

//adicionar mensagem no arquivo
function adicionarMensagens() {
    fs.appendFile(path, conteudoArquivo, (err) => { //escreve ao final do arquivo
        if (err) {
            console.error("Erro ao escrever no arquivo:", err);
        } else {
            console.log("Mensagem adicionada com sucesso!");
        }
    });
}

app.listen(porta,()=>{
    console.log(`ouvindo na porta ${porta}`)
} )

adicionarMensagens();

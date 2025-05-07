// importações
import fs from 'fs';
import { v4 } from 'uuid';  
import express from 'express';
import { log } from 'console';

const app = express();
const porta = 3000;
const path = "logs.txt";

app.use(express.json());

// Função para gerar ID
function gerarID() { 
    return v4();  
}

// funcao para adicionar mensagens no arquivo
function adicionarMensagens(conteudoArquivo) {
    fs.appendFile(path, conteudoArquivo, (err) => { // escreve ao final do arquivo
        if (err) {
            console.error("Erro ao registrar log", err);
        } else {
            console.log("Mensagem adicionada com sucesso!");
        }
    });
}

// rota POST /logs
app.post('/logs', (req, res) => {
    // recebe o nome do aluno do corpo da requisição
    const { nomeAluno } = req.body;
    
    // caso não tenha nomeAluno
    if (!nomeAluno) {
        return res.status(400).json({ mensagem: 'Insira o nome do aluno' });
    }

    // gera um novo ID
    const novoID = gerarID();

    // obtém a data e hora atual
    const dataHoraAtual = new Date().toISOString();

    // formata a mensagem para o arquivo
    const conteudoArquivo = `${novoID} - ${dataHoraAtual} - ${nomeAluno}\n`;

    // adiciona a mensagem em outra linha do arquivo
    adicionarMensagens(conteudoArquivo);

    // retorna o ID gerado e a mensagem de sucesso
    res.status(200).json({
        id: novoID,
        mensagem: 'Log registrado com sucesso!',
    });
});

app.get('/logs/:id',(req,res) => {
    const {id} = req.params

    fs.readFile(path,'utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({mensagem : 'erro ao ler o arquivo'})
        }

        const logs = data.split('\n')

        const logsEncontrado = logs.find(log => log.includes(id))

        if (logsEncontrado){
            return res.status(200).json({
                id: id,
                mensagem: 'Log encontrado',
                log: logsEncontrado,
            })
        }
        else{
            res.status(404).json({mensagem: 'Log nao encontrado'})
        }
    })

})

// teste para ver se está ouvindo na porta correta
app.listen(porta, () => {
    console.log(`Servidor ouvindo na porta ${porta}`);
});

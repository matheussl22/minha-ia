import express from 'express';
import bodyParser from 'body-parser';
import { PdfReader } from 'pdfreader';

const app = express();

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = process.env.PORT || 4000; // define a porta do servidor
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

import EasyGPT from "easygpt";
const gpt = new EasyGPT();
gpt.addRule('Não responda nada até que eu pergunte de fato, agora é só pra ensinar vc!');
gpt.addRule('Vc deve conversar sempre em cima dos dados que eu te ensinar!');
gpt.setApiKey("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");

app.get('/ask/:message', (req, res) => {
    gpt.addMessage(req.params.message);
    gpt.ask().then(response => {
        const responseData = {
            content: response.content
        };
        console.log(responseData);
        res.json(responseData);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    });
});

let text = ''; // variável para armazenar o texto extraído
new PdfReader().parseFileItems('./pdfs/florida.pdf', function(err, item) {
    if (err) {
        console.log(err);
    } else if (!item) {
        //ENVIAR PARA O GPT
        console.log('ENVIANDO PARA O GPT');
        gpt.addMessage(text).ask();
    } else if (item.text) {
        // item de texto encontrado
        text += item.text;
    }
});


//AINDA EM TESTE
app.post('/upload', (req, res) => {
    const data = req.body; // Obter o objeto JSON do corpo da solicitação
    console.log('Objeto recebido:', data);
    // Realizar ação com o objeto aqui
    res.status(200).send('Solicitação bem-sucedida');
});







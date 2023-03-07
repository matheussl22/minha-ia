import express from 'express';
import bodyParser from 'body-parser';

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

app.post('/upload', (req, res) => {
    const data = req.body; // Obter o objeto JSON do corpo da solicitação
    console.log('Objeto recebido:', data);
    // Realizar ação com o objeto aqui
    res.status(200).send('Solicitação bem-sucedida');
});








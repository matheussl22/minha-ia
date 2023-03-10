import React from 'react';
import '../style/Chat.css';
import DOMPurify from 'dompurify';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.messageInput = React.createRef();
    }

    handleSendMessage = (message) => {
        const messages = [...this.state.messages];
        messages.push({ content: message, type: 'sent' }); // adiciona a propriedade type com valor "sent" para as mensagens enviadas

        fetch(`http://localhost:4000/ask/${message}`)
            .then(response => response.json())
            .then(data => {
                const content = data.content.replace(/\n/g, '<br>');
                messages.push({ content: DOMPurify.sanitize(content), type: 'received' }); // adiciona a propriedade type com valor "received" para as mensagens recebidas
                this.setState({ messages });
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });

        this.setState({ messages });
    }

    handleSendClick = () => {
        const message = this.messageInput.current.value;
        this.handleSendMessage(message);
        this.messageInput.current.value = '';
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const message = this.messageInput.current.value;
            this.handleSendMessage(message);
            this.messageInput.current.value = '';
        }
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Minha IA</h2>
                </div>
                <div className="chat-messages">
                    {this.state.messages.map((message, index) => (
                        <div key={index} className={`chat-message chat-message-${message.type}`}> {message.content} </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input className="chat-input-field" type="text" placeholder="Digite sua mensagem aqui" ref={this.messageInput} onKeyDown={this.handleKeyDown}/>
                    <button className="chat-send-button" onClick={this.handleSendClick}>Enviar</button>
                </div>
            </div>
        );
    }
}

export default Chat;
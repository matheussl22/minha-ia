import React from 'react';
import '../style/Menu.css';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu-container">
                <div className="menu">
                    <a href="#">CONVERSA 1</a><br />
                    <a href="#">CONVERSA 2</a><br />
                    <a href="#">CONVERSA 4</a><br />
                    <a href="#">CONVERSA 5</a><br />
                    <a href="#">CONVERSA 6</a><br />

                    <button>Sair</button><br />
                </div>
            </div>
        );
    }
}

export default Menu;
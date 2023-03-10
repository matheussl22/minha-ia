import React from 'react';
import '../style/Body.css';
import Chat from "./Chat";
import FileUploader from "./FileUploader";
class Body extends React.Component {
    render() {
        return (
            <div className="page-content">
               <Chat/>
                {/*<div>*/}
                {/*    <h1>Upload de Arquivo</h1>*/}
                {/*    <FileUploader />*/}
                {/*</div>*/}
            </div>
        );
    }
}
export default Body;
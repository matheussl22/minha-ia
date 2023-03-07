import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader(props) {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const fileContents = reader.result;
            // const minhaStringEncoded = encodeURIComponent(fileContents);
            // const base64pdf = btoa(minhaStringEncoded);
            let dataForm = {content: fileContents};

            console.log(dataForm);
            fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
                .then(response => {
                    console.log('Upload bem-sucedido:', response);
                })
                .catch(error => {
                    console.error('Erro ao fazer upload:', error);
                });
        };
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Arraste e solte o arquivo aqui</p>
            ) : (
                <p>Arraste e solte o arquivo aqui ou clique para selecionar um arquivo</p>
            )}
        </div>
    );
}

export default FileUploader;
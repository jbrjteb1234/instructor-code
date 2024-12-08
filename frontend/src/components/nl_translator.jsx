import React, { useState } from 'react';
import axios from 'axios';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

    async function handleTranslateCode() {
        try{
            const response = await axios.post('http://localhost:5000/translate');
            setTranslatorOutput(response);
        }catch(e){
            setTranslatorOutput('Error');
        }
    }

    const translatorStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
    };

    function handleSetNLInput(e){
        setInput(e.target.value);
    }

    return (
        <div className="nl-translator" style = {translatorStyle}>

            <h2>Instructor Code Assistance</h2>

            <textarea
                style = {{flex: 7}}
                readOnly
                value={translatorOutput}
            />

            <textarea
                style = {{flex: 2}}
                value={input}
                onChange={handleSetNLInput}
            />

            <button onClick={handleTranslateCode} style = {{flex: 1}}>
                Enter
            </button>

        </div>
    );
}

export default NLTranslator;
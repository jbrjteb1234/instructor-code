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

    function handleSetNLInput(e){
        setInput(e.target.value);
    }

    return (
        <div className="nl-translator">

            <h2>Instructor Code Assistance</h2>

            <textarea
                value={input}
                onChange={handleSetNLInput}
            />

            <button onClick={handleTranslateCode}>
                Enter
            </button>

        </div>
    );
}

export default NLTranslator;
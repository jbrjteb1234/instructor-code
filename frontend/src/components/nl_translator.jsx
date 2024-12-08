import React, { useState } from 'react';
import axios from 'axios';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

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

    async function retrieveOutput(type){
        try{
            const data = {code: code};
            const response = await axios.post('http://localhost:5000/'+type, code);
            setTranslatorOutput(response);
        }catch(e){
            setTranslatorOutput('Error');
        }
    }

    function handleTranslateCode() {
        retrieveOutput('prompt-assistance');
    }


    function handleQueryError(){
        retrieveOutput('query-error');
    }

    return (
        <div className="nl-translator" style = {translatorStyle}>

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
            
            <div style={{flex: 1, display: 'flex'}}>

                <button onClick={handleTranslateCode} style = {{flex: 3}}>
                    Enter
                </button>

                <button onClick={handleQueryError} style={{flex: 1}}>
                    Query Error
                </button>

            </div>
        </div>
    );
}

export default NLTranslator;
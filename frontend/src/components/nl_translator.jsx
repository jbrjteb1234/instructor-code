import React, { useState } from 'react';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

    function handleTranslateCode() {
        
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
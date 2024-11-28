import React, { useState } from 'react';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

    function handleSetTranslatedCode() {
        
    }

    function handleSetCodeInput(e){
        setInput(e.target.value);
    }

    return (
        <div className="nl-translator">
            <h2>Natural Language Translator</h2>
            <textarea
                value={input}
                onChange={handleSetCodeInput}
            />
        </div>
    );
}

export default NLTranslator;
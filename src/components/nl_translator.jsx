import React, { useState } from 'react';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

    function handleSetTranslatedCode() {
        
    }

    function handleSetCodeInput(){

    }

    return (
        <div className="nl-translator">
            <h2>Natural Language Translator</h2>
        </div>
    );
}

export default NLTranslator;
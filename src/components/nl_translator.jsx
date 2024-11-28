import React from 'react'

function NLTranslator( {code} ) {

    const [input, set_input] = useState('');
    const [translator_output, set_translator_output] = useState('')

    function handle_set_translated_code() {
        
    }

    function handle_set_input(){

    }

    return (
        <div className="nl-translator">
            <h2>Natural Language Translator</h2>
        </div>
    );
}

export default NLTranslator;
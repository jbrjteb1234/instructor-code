import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function NLTranslator( {code} ) {

    const [input, setInput] = useState('');
    const [translatorOutput, setTranslatorOutput] = useState('')

    const translatorContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
        overflow: 'hidden',
    };

    const translatorOutputStyle = {
        flex: 7, 
        paddingLeft: '10px',
        paddingRight: '10px', 
        fontFamily: 'Arial, sans-serif', 
        overflowY: 'scroll'
    };

    const translatorInputStyle = {
        flex: 1, 
        paddingLeft: '1px', 
        paddingRight: '6px', 
        paddingBottom: '5px',
        fontFamily: 'Arial, sans-serif',
    }

    function handleSetNLInput(e){
        setInput(e.target.value);
    }

    async function retrieveOutput(type){
        console.log(`Making request to: http://localhost:5000/${type}`);
        try{
            const response = await axios.post(
                `http://localhost:5000/${type}`,

                {
                    code: code,
                    prompt: input
                },

                {
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                }

            );

            setTranslatorOutput(response.data || "No response");
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
        <div className="nl-translator" style = {translatorContainerStyle}>

            
            <div style = {translatorOutputStyle}>
                <ReactMarkdown>{translatorOutput}</ReactMarkdown>
            </div>

            <div style = {translatorInputStyle}>
                <textarea
                    style = {{height: '100%', width: '100%'}}
                    value={input}
                    onChange={handleSetNLInput}
                />
            </div>
            
            <div style={{flex: 1, display: 'flex', height: '100%', width: '100%'}}>

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
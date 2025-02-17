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
        overflowY: 'scroll',
        backgroundColor: 'rgb(255,255,255)',
        userSelect: 'none',
        pointerEvents: 'none',
    };

    const translatorInputStyle = {
        flex: 1, 
        resize: 'none',
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
                    withCredentials: true
                }

            );

            setTranslatorOutput(response.data || "No response");
        }catch(e){
            if(response.status==403){
                setTranslatorOutput("LLM Assistance unavailable.");
                return;
            }
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

            <textarea
                style = {translatorInputStyle}
                value={input}
                onChange={handleSetNLInput}
            />
        
            <div style={{flex: 1, display: 'flex', flexGrow: 0, flexShrink: 0}}>

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
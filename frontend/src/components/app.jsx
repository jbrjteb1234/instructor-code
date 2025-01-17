import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PythonEditor from './python_editor.jsx';
import NLTranslator from './nl_translator.jsx';
import CodeOutput from './output.jsx';

function App() {

    const [code, setCode] = useState('');
    const [state, setState] = useState('');

    //checks the server is operational and if an exam is loaded
    useEffect(() => {
        async function statusCheck() {
            try {
                response = await fetch('http://localhost:5000/status')
                payload = await response.json();

                if(response.ok){
                    setState(true);
                    console.log('Established connection with server.');
                }else{
                    console.log('Error establishing connection with server.\nResponse code: ${response.status},\nResponse text: ${response.statusText}');
                }
            }catch(e){
                console.error('Unexpected error: ${e}');
            }    
        }

        statusCheck();
    },[])

    const containerStyle = {
        height: '100vh', 
        display: 'flex',
    };

    const columnContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1, 
        flexDirection: 'column',
    };

    return (
        <div style={containerStyle}>

            <div style={columnContainerStyle}>

                <div style={{flex: 1}}>
                    <NLTranslator code={code} />
                </div>

                <div style={{flex: 1}}>
                    <CodeOutput code={code} />
                </div>

            </div>

            <div style={{flex: 1}}>

                <PythonEditor code={code} setCode={setCode} />

            </div>
            
        </div>
    );
}

export default App;
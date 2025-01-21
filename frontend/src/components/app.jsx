import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PythonEditor from './python_editor.jsx';
import NLTranslator from './nl_translator.jsx';
import CodeOutput from './output.jsx';
import Exam from './exam.jsx';

function App() {

    const [code, setCode] = useState('');
    const [examEnabled, setExamEnabled] = useState('');
    const [examExpanded, setExamExpanded] = useState(false);
    const [examBegan, setExamBegan] = useState(false);
    const [examText, setExamText] = useState('');

    async function beginExam(){
        if(!examBegan){
            setExamBegan(true);
            setExamExpanded(true);

            let response = await fetch('http://localhost:5000/begin-exam');
            let payload = await response.json();

            if(response.ok){
                let timeRemaining = payload.examTime;
                setExamText(payload.exam);
            }else{
                console.log(`Error communicating with begin exam endpoint.\nResponse code: ${response.status},\nResponse text: ${response.statusText}`)
            }

        }
    }

    //checks the server is operational and if an exam is loaded
    useEffect(() => {
        async function statusCheck() {
            try {
                let response = await fetch('http://localhost:5000/status');
                let payload = await response.json();

                if(response.ok){
                    console.log(`Established connection with server.`);
                    setExamEnabled(payload.examLoaded);
                }else{
                    console.log(`Error establishing connection with server.\nResponse code: ${response.status},\nResponse text: ${response.statusText}`);
                }
            }catch(e){
                console.error(`Unexpected error: ${e}`);
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

            {examExpanded ?
                
                <Exam examText={examText} />

            :
                <div style={columnContainerStyle}>
                    
                    <div style={{flex: 1}}>
                        <NLTranslator code={code} />
                    </div>
                    
                    <div style={{flex: 1}}>
                        <CodeOutput code={code} examEnabled={examEnabled} examBegan={examBegan} beginExam={beginExam} setExamExpanded={setExamExpanded} />
                    </div>
                
                </div>
            }

            <div style={{flex: 1}}>
                <PythonEditor code={code} setCode={setCode} />
            </div>
            
        </div>
    );
}

export default App;
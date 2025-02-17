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
    const [examTimeRemaining, setExamTimeRemaining] = useState('');
    const [pyodide, setPyodide] = useState(null);

    //countdown timer for exam
    useEffect(() => {
        if (!examBegan || !examTimeRemaining) return;

        const timer = setInterval(()=>{
            setExamTimeRemaining((prevTime)=>{
                if(prevTime <= 1){
                    setExamExpanded(false);
                    setExamBegan(false);
                    clearInterval(timer);
                    return 0;
                }
                return prevTime-1;
            });
        },1000);

        return () => clearInterval(timer);

    },[examTimeRemaining]);

    async function beginExam(){
        if(!examBegan){

            let response = await fetch('http://localhost:5000/begin-exam');
            let payload = await response.json();

            if(response.ok){
                setExamBegan(true);
                setExamExpanded(true);    
                setExamTimeRemaining(payload.examTime);
                setExamText(payload.exam);
            }else{
                console.log(`Error communicating with begin exam endpoint.\nResponse code: ${response.status},\nResponse text: ${response.statusText}`)
            }

        }
    }

    //checks the server is operational and if an exam is loaded
    useEffect(() => {
        async function statusCheck() {
            console.log(`Sending server status request`);
            try{
                const response = await axios.get(
                    `http://localhost:5000/status`,

                    {},

                    {
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        withCredentials: true
                    }

                );
                setExamEnabled(response.data.examLoaded);

            }catch(e){
                console.error(`Unexpected error: ${e}`);
            }
        }

        statusCheck();
    },[])

    //preload pyodide
    useEffect(function () {
        async function loadPyodideInstance() {
            try {
                const pyodideInstance = await window.loadPyodide();
                setPyodide(pyodideInstance);
                console.log("Pyodide loaded.")
            } catch (error) {
                console.error('Error loading Pyodide: ', error);
            }
        }

        loadPyodideInstance();
    }, []);

    const containerStyle = {
        height: '100vh', 
        display: 'flex',
        backgroundImage: 'linear-gradient(to bottom, rgb(0, 30, 120), rgb(0,40,60))',
    };

    const columnContainerStyle = {
        width: '50%',
        margin: '10px',
        display: 'flex',
        flex: 1, 
        flexDirection: 'column',
    };

    const componentBorder = '2px solid rgb(40,40,40)';
    const componentMargin = '10px';

    return (
        <div style={containerStyle}>

            {examExpanded ?
                
                <div style={{margin: componentMargin, flex: 1, width: '50%', border: componentBorder}}>
                    <Exam examText={examText} setExamExpanded={setExamExpanded} code={code} examTimeRemaining={examTimeRemaining} setExamBegan={setExamBegan} />
                </div>

            :
                <div style={columnContainerStyle}>
                    
                    <div style={{flex: 1, height: '50%', marginBottom: componentMargin, border: componentBorder}}>
                        <NLTranslator code={code} />
                    </div>
                    
                    <div style={{flex: 1, height: '50%', marginTop: componentMargin, border: componentBorder}}>
                        <CodeOutput code={code} examEnabled={examEnabled} examBegan={examBegan} beginExam={beginExam} setExamExpanded={setExamExpanded} pyodide={pyodide}/>
                    </div>
                
                </div>
            }

            <div style={{flex: 1, margin: componentMargin, width: '50%', border: componentBorder}}>
                <PythonEditor code={code} setCode={setCode} />
            </div>
            
        </div>
    );
}

export default App;
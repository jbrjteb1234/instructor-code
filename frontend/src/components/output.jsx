import React, { useState } from 'react';

function CodeOutput( {code, examEnabled, examBegan, setExamExpanded, beginExam, pyodide} ) {
    const [output, setOutput] = useState('');

    const translatorStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
    }; 

    async function handleExecuteCode() {

        if (!pyodide) {
            setOutput('Python executor loading. Please wait.');
            return;
        }

        try {

            //Redirect stdout to a string variable
            await pyodide.runPythonAsync(`
                import sys
                from io import StringIO
                sys.stdout = StringIO()
            `);
            
            // Execute the user's code
            try{
                await pyodide.runPythonAsync(code);
                setOutput(await pyodide.runPythonAsync('sys.stdout.getvalue()'));
            }catch(e){
                let errorMessage = e.message || e.toString();
                setOutput(errorMessage.split('\n').slice(-2,-1)[0].trim());
            }

        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    }

    function handleBeginExam() {
        beginExam();
    }

    function handleExpandExam() {
        if(examBegan){
            setExamExpanded(true);
        }
    }

    return (
        <div className="code-output" style={translatorStyle}>

            <textarea
                style={{
                    flex: 9,
                    backgroundColor: '#141414',
                    color: '#d8d8d8',          
                    fontFamily: 'monospace',    
                    fontSize: '14px',          
                    overflowY: 'scroll',       
                    whiteSpace: 'pre-wrap',    
                    resize: 'none',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
                value={output}
                readOnly
            />

            {examEnabled ?
                <div style={{display: 'flex', flex: 1, flexGrow: 0, flexShrink: 0}}>
                    
                    <button onClick={handleExecuteCode} style={{ flex: 3 }}>
                        Execute Code
                    </button>

                    {examBegan ? 
                        <button onClick={handleExpandExam} style={{ flex: 1 }}>
                            Show exam brief
                        </button>
                    :
                        <button onClick={handleBeginExam} style={{ flex: 1 }}>
                            Begin exam
                        </button>
                    }

                </div>
            : 
                <button onClick={handleExecuteCode} style={{ flex: 1, flexGrow: 0, flexShrink: 0}}>
                    Execute Code
                </button>
            }

        </div>
    );
}

export default CodeOutput;

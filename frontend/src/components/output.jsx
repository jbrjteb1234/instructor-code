import React, { useEffect, useState } from 'react';

function CodeOutput( {code} ) {
    const [output, setOutput] = useState('');
    const [pyodide, setPyodide] = useState(null);

    const translatorStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
    };

    function handleQueryError(){
        
    }

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
            
            //Execute the user's code
            await pyodide.runPythonAsync(code);

            const result = await pyodide.runPythonAsync('sys.stdout.getvalue()');
            setOutput(result);

        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    }

    return (
        <div className="code-output" style={translatorStyle}>

            <textarea
                style={{flex: 8}}
                value={output} 
                readOnly 
            />

            <div style={{flex: 2, display: 'flex'}}>
                <button onClick={handleExecuteCode} style={{flex: 3}}>
                    Execute Code
                </button>

                <button onClick={handleQueryError} style={{flex: 1}}>
                    Query Error
                </button>
            </div>

        </div>
    );
}

export default CodeOutput;

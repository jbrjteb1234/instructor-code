import React, { useEffect, useState } from 'react';

function CodeOutput( {code} ) {
    const [output, setOutput] = useState('');
    const [pyodide, setPyodide] = useState(null);

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
        <div className="code-output">

            <h2>Python Console Output</h2>

            <textarea
                value={output} 
                readOnly 
                rows="10" 
            />

            <button onClick={handleExecuteCode}>
                Execute Code
            </button>

            <button onClick={handleQueryError}>
                Query error
            </button>

        </div>
    );
}

export default CodeOutput;

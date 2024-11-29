import React, { useState } from 'react';

function CodeOutput( {code} ) {
    const [output, setOutput] = useState('');

    function handleExecuteCode() {
        console.log("Executing code");
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

        </div>
    );
}

export default CodeOutput;

import React, { useState } from 'react'

function PythonEditor( {code, setCode} ) {

    const [output, setOutput] = useState('');

    function handleCodeChange(e) {
        setCode(e.target.value);
    }

    function handleExecuteCode() {
        console.log("Executing code");
    }

    return (
        <div className="editor">

            <h2>Python Editor</h2>

            <textarea
                value={code}
                onChange={handleCodeChange}
            />

            <button onClick={handleExecuteCode}>
                Execute Code
            </button>


        </div>
    );

}

export default PythonEditor;
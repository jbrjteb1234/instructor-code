import React, { useState } from 'react'

function PythonEditor( {code, setCode} ) {

    const [output, setOutput] = useState('');

    function handleCodeChange(e) {
        setCode(e.target.value);
    }

    return (
        <div className="editor">
            <h2>Python Editor</h2>
            <textarea
                value={code}
                onChange={handleCodeChange}
            />
        </div>
    );

}

export default PythonEditor;
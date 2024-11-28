import React, { useState } from 'react'

function PythonEditor( {code, set_Code} ) {

    const [output, setOutput] = useState('');

    function handleExecuteCode() {

    }

    return (
        <div className="editor">
            <h2>Python Editor</h2>
        </div>
    );

}

export default PythonEditor;
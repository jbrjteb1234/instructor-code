import React, { useState } from 'react'
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';

function PythonEditor( {code, setCode} ) {

    function handleCodeChange(newValue) {
        setCode(newValue);
    }

    return (
        <div className="editor">

            <h2>Python Editor</h2>

            <AceEditor
                mode="python"
                name="python_editor"
                width="50%"
                height="400px"
                value={code}
                onChange={handleCodeChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    useWorker: false,
                    tabSize: 4,
                }}
            />

        </div>
    );

}

export default PythonEditor;
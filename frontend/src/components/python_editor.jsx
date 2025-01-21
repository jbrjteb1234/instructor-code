import React from 'react'
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';

function PythonEditor( {code, setCode} ) {

    const editorStyle = {
        height: '100%',
        width: '100%', 
    };

    function handleCodeChange(newValue) {
        setCode(newValue);
    }

    return (
        <div className="editor" style={editorStyle} >
            <AceEditor
                mode="python"
                name="python_editor"
                width="100%"
                height="100%"
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
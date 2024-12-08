import React, { useState } from 'react';
import PythonEditor from './python_editor.jsx';
import NLTranslator from './nl_translator.jsx';
import CodeOutput from './output.jsx';

function App() {

    const [code, setCode] = useState('');

    const containerStyle = {
        height: '100vh', 
        display: 'flex',
    };

    const columnContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1, 
        flexDirection: 'column',
    };

    return (
        <div style={containerStyle}>

            <div style={columnContainerStyle}>

                <div style={{flex: 1}}>
                    <NLTranslator code={code} />
                </div>

                <div style={{flex: 1}}>
                    <CodeOutput code={code} />
                </div>

            </div>

            <div style={{flex: 1}}>

                <PythonEditor code={code} setCode={setCode} />

            </div>
            
        </div>
    );
}

export default App;
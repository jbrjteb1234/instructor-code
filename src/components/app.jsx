import React, { useState } from 'react';
import PythonEditor from './python_editor.jsx';
import NLTranslator from './nl_translator.jsx';
import Output from './output.jsx';

function App() {

    const [code, setCode] = useState('');      // Holds the current Python code

    return (
        <div className="app-container">
            {/* Top row: Code editor and Translator */}
            <div className="top-row">
                <PythonEditor />
                <NLTranslator />
            </div>
            {/* Bottom row: Python console */}
            <div className="bottom-row">
                <Output />
            </div>
        </div>
    );
}

export default App;
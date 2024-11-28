import React, { useState } from 'react';
import Python_editor from './python_editor.jsx';
import NL_translator from './nl_translator.jsx';
import Output from './output.jsx';

function App() {

    const [code, set_code] = useState('');      // Holds the current Python code

    return (
        <div className="app-container">
            {/* Top row: Code editor and Translator */}
            <div className="top-row">
                <Python_editor />
                <NL_translator />
            </div>
            {/* Bottom row: Python console */}
            <div className="bottom-row">
                <Output />
            </div>
        </div>
    );
}

export default App;
import React from 'react';
import Editor from './python_editor.jsx';
import Translator from './nl_translator.jsx';
import Console from './output.jsx';

function App() {
    return (
        <div className="app-container">
            {/* Top row: Code editor and Translator */}
            <div className="top-row">
                <Editor />
                <Translator />
            </div>
            {/* Bottom row: Python console */}
            <div className="bottom-row">
                <Console />
            </div>
        </div>
    );
}

export default App;

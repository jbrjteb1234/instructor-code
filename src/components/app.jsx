import React from 'react';
import Editor from './python_editor.jsx';
import Translator from './nl_translator.jsx';
import Console from './output.jsx';

function App() {

    const [code, set_code] = useState('');      // Holds the current Python code

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
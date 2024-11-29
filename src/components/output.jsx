import React, { useState } from 'react';

function CodeOutput( {code} ) {
    const [output, setOutput] = useState('');

    return (
        <div className="code-output">
            <h2>Python Console Output</h2>
            <textarea
                value={output} 
                readOnly 
                rows="10" 
            />
        </div>
    );
}

export default CodeOutput;

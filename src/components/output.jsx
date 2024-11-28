import React from 'react';

function CodeOutput() {
    const [output, set_output] = useState('');

    return (
        <div className="code-output">
            <h2>Python Console Output</h2>
        </div>
    );
}

export default CodeOutput;

import React, { useState } from 'react';

function code_output( {code} ) {
    const [output, set_output] = useState('');

    return (
        <div className="code-output">
            <h2>Python Console Output</h2>
        </div>
    );
}

export default code_output;

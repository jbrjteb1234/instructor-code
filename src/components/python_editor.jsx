import React, { useState } from 'react'

function python_editor( {code, set_Code} ) {

    const [output, set_output] = useState('');

    function handle_execute_code() {

    }

    return (
        <div className="editor">
            <h2>Python Editor</h2>
        </div>
    );

}

export default Editor;
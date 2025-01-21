import React from 'react';

function Exam( {examText} ){

    const examContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
        overflow: 'hidden',
    };

    const examBriefStyle = {
        flex: 18, 
        paddingLeft: '10px',
        paddingRight: '10px', 
        fontFamily: 'Arial, sans-serif', 
        overflowY: 'scroll'
    };

    function handleSubmitExam(){

    }

    function handleExpandExam(){
        
    }

    return(
        <div className="examContainer" style={examContainerStyle}>

            <textarea
                readOnly
                value={examText}
                style={examBriefStyle}
            />

            <div style={{display: 'flex', flex: 1}}>
                    
                <button onClick={handleSubmitExam} style={{ flex: 3 }}>
                    Submit
                </button>

                <button onClick={handleExpandExam} style={{ flex: 1 }}>
                    Close exam
                </button>

            </div>

        </div>
    );
}

export default Exam;
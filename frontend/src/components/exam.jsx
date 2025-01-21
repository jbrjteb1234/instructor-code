import React from 'react';
import axios from 'axios';

function Exam( {examText, setExamExpanded, code, examTimeRemaining} ){

    const examContainerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
        overflow: 'hidden',
    };

    const examBriefStyle = {
        flex: 19, 
        paddingLeft: '10px',
        paddingRight: '10px', 
        fontFamily: 'Arial, sans-serif', 
        overflowY: 'scroll'
    };

    const examTimerStyle = {
        flex: 1,
        backgroundColor: '#141414',
        color: '#d8d8d8',          
        fontFamily: 'monospace',  
        fontSize: '2rem',      
        textAlign: 'center', 
        whiteSpace: 'pre-wrap',    
        resize: 'none',
        overflow: 'hidden'
    };

    async function handleSubmitExam(){
        try{
            const response = await axios.put(
                `http://localhost:5000/submit-exam`,

                {
                    submission: code,
                },

                {
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                }

            );
            console.log("Submission complete.")
        }catch(e){
            console.log(`Unexpected error submitting exam\nStatus code: ${e.response.status}`);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60; 
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }    

    function handleExpandExam(){
        setExamExpanded(false);
    }

    return(
        <div className="examContainer" style={examContainerStyle}>

            <textarea
                readOnly
                value={examText}
                style={examBriefStyle}
            />

            <div style={{display: 'flex', flex: 1, flexGrow: 0, flexShrink: 0}}>

                <textarea
                    readOnly
                    value={formatTime(examTimeRemaining)}
                    style={examTimerStyle}
                />
                    
                <button onClick={handleSubmitExam} style={{ flex: 2 }}>
                    Submit
                </button>

                <button onClick={handleExpandExam} style={{ flex: 1 }}>
                    Close exam brief
                </button>

            </div>

        </div>
    );
}

export default Exam;
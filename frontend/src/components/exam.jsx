import React from 'react';
import axios from 'axios';

function Exam( {examText, setExamExpanded, code} ){

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
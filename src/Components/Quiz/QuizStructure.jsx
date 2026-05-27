import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Showresult from './Showresult';

export default function QuizStructure({ Questions, path }) {
    const [currQues, setCurrQues] = useState(0);
    const [ans, setAns] = useState("");
    const [result, setResult] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const navigate = useNavigate();

    // Determine the quiz topic dynamically
    let topic = "AI";
    if (path.toLowerCase().includes("java")) {
        topic = "Java";
    } else if (path.toLowerCase().includes("fullstack")) {
        topic = "Full Stack";
    } else if (path.toLowerCase().includes("react")) {
        topic = "React JS";
    } else if (path.toLowerCase().includes("javascript")) {
        topic = "JavaScript";
    }

    let Score = () => {
        if (ans === Questions[currQues].Answer) {
            setResult(result + 1);
        }
    }

    let nextHandle = () => {
        if (!ans) {
            alert("Please select an option before moving to the next question.");
            return;
        }
        Score();
        setAns("");
        if (currQues < Questions.length - 1) {
            setCurrQues(currQues + 1);
        } else {
            setIsLast(true);
        }
    }

    let resetAll = () => {
        setCurrQues(0);
        setAns("");
        setResult(0);
        setIsLast(false);
    }

    const handleCancel = () => {
        navigate("/test");
    };

    return (
        <div className="py-5" style={{ backgroundColor: "#0b0f19", color: "#f8fafc", minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="p-5 border-0 shadow-sm" style={{ 
                            backgroundColor: "#111827", 
                            borderRadius: "15px", 
                            border: "1px solid #1f2937",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                        }}>
                            {isLast ? (
                                <Showresult result={result} total={Questions.length} tryAgain={resetAll} path={path} />
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <h3 className="text-white" style={{ fontWeight: "700" }}>{topic} quiz</h3>
                                        <div style={{ width: "50px", height: "3px", backgroundColor: "#8b5cf6", marginTop: "8px" }}></div>
                                    </div>

                                    {/* Question Text */}
                                    <div className="mb-4 text-white" style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.5" }}>
                                        <span>{currQues + 1}. {Questions[currQues].Question}</span>
                                    </div>

                                    {/* Radio Options List */}
                                    <div className="mb-4">
                                        {Questions[currQues].Options.map((el, i) => (
                                            <div 
                                                key={i} 
                                                className="d-flex align-items-center p-3 mb-3" 
                                                onClick={() => setAns(el)}
                                                style={{
                                                    borderRadius: "10px",
                                                    border: `1px solid ${ans === el ? "#8b5cf6" : "#1f2937"}`,
                                                    backgroundColor: ans === el ? "rgba(139, 92, 246, 0.08)" : "#1f2937",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                {/* Circular Radio Icon */}
                                                <div 
                                                    className="me-3 d-flex align-items-center justify-content-center" 
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "50%",
                                                        border: `2px solid ${ans === el ? "#8b5cf6" : "#9ca3af"}`,
                                                        backgroundColor: ans === el ? "#8b5cf6" : "transparent"
                                                    }}
                                                >
                                                    {ans === el && (
                                                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#fff" }} />
                                                    )}
                                                </div>
                                                
                                                {/* Option Text */}
                                                <span className="text-white" style={{ fontSize: "15px" }}>{el}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-between mt-5">
                                        <button 
                                            className="btn px-4 py-2 text-white" 
                                            onClick={nextHandle}
                                            style={{
                                                backgroundColor: "#8b5cf6",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                transition: "background-color 0.2s"
                                            }}
                                        >
                                            {currQues === Questions.length - 1 ? "Submit Quiz" : "Next Question"}
                                        </button>
                                        <button 
                                            className="btn px-4 py-2 text-white" 
                                            onClick={handleCancel}
                                            style={{
                                                backgroundColor: "#374151",
                                                border: "none",
                                                borderRadius: "8px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

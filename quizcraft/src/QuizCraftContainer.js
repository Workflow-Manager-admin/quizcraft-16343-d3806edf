// PUBLIC_INTERFACE
import React, { useState } from 'react';

// PUBLIC_INTERFACE
function QuizCraftContainer() {
  /**
   * Main container component for QuizCraft.
   * Features:
   *  - Dashboard listing quizzes as cards (edit, preview, share actions)
   *  - "Create Quiz" button and quiz creation form (questions, types, settings)
   *  - Multi-question support (MCQ, True/False, Short Answer)
   *  - Instant feedback support for answer checking
   *  - Modern light UI, color scheme: #2D9CDB (primary), #F2F2F2 (secondary), #27AE60 (accent)
   */
  const COLOR_PRIMARY = "#2D9CDB";
  const COLOR_SECONDARY = "#F2F2F2";
  const COLOR_ACCENT = "#27AE60";
  const TEXT_DARK = "#222";
  const TEXT_LIGHT = "#ffffff";

  // Quiz data and UI state
  const [quizzes, setQuizzes] = useState([
    // Demo quiz objects (in a real app, use API/localstorage)
    {
      id: 1,
      title: "General Knowledge",
      description: "Test your trivia skills across a range of topics.",
      questions: [
        {
          type: "multiple-choice",
          question: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          correct: 0,
        },
        {
          type: "true-false",
          question: "The sky is always green.",
          correct: false
        }
      ]
    },
    {
      id: 2,
      title: "Science Quiz",
      description: "Fun questions for science fans!",
      questions: [
        {
          type: "short-answer",
          question: "Who developed the theory of relativity?",
          correct: "Einstein"
        }
      ]
    }
  ]);
  const [mode, setMode] = useState("dashboard"); // "dashboard" | "create" | "edit" | "preview"
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    questions: []
  });
  const [quizFormErrors, setQuizFormErrors] = useState({});
  const [questionForm, setQuestionForm] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    correctBool: true,
    correctShort: ""
  });
  const [previewAnswers, setPreviewAnswers] = useState({});
  const [previewFeedback, setPreviewFeedback] = useState(null);

  // Helpers for styling
  const cardStyle = {
    background: COLOR_SECONDARY,
    color: TEXT_DARK,
    borderRadius: 10,
    boxShadow: "0 2px 12px 0 rgba(44, 104, 166, 0.06)",
    marginBottom: 24,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 180
  };
  const btnStyle = {
    background: COLOR_PRIMARY,
    color: TEXT_LIGHT,
    border: "none",
    borderRadius: 5,
    padding: "10px 20px",
    fontWeight: 500,
    fontSize: 16,
    cursor: "pointer",
    margin: "0 4px",
    transition: "background 0.14s",
  };
  const accentBtnStyle = {
    ...btnStyle,
    background: COLOR_ACCENT,
    color: "#fff"
  };

  // Dashboard: List all quizzes
  function renderDashboard() {
    return (
      <div>
        <h2 style={{color: COLOR_PRIMARY, marginTop: 0}}>Your Quizzes</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px"
        }}>
          {quizzes.length === 0 && (
            <div style={{
              color: "#888",
              margin: "2rem auto"
            }}>No quizzes yet. Click "Create Quiz" to begin!</div>
          )}
          {quizzes.map(qz => (
            <div key={qz.id} style={{...cardStyle, flex: "1 1 320px", maxWidth: 340, minWidth: 260}}>
              <div>
                <h3 style={{margin: 0}}>{qz.title}</h3>
                <div style={{fontSize: 14, color: "#333", marginBottom: 10}}>{qz.description}</div>
                <div style={{fontSize: 13, color: "#888"}}>{qz.questions.length} Questions</div>
              </div>
              <div style={{marginTop: 16}}>
                <button style={accentBtnStyle} onClick={() => openPreview(qz)}>Preview</button>
                <button style={btnStyle} onClick={() => handleEditQuiz(qz)}>Edit</button>
                <button style={{...btnStyle, background: COLOR_PRIMARY, color: "#fff"}} onClick={() => handleShare(qz)}>Share</button>
              </div>
            </div>
          ))}
          <div style={{
            ...cardStyle, 
            border: `2px dashed ${COLOR_PRIMARY}`,
            color: COLOR_PRIMARY, 
            background: "#fff",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            minWidth: 220,
            cursor: "pointer"
          }}
          onClick={startCreate}
          tabIndex={0}>
            <div style={{textAlign: "center"}}>
              <div style={{fontSize: 32, fontWeight: 700, lineHeight:1}}>+</div>
              <div style={{marginTop: 6, fontSize:15}}>Create Quiz</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Document upload UI and state ---
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState('');
  const [fileUploadSuccess, setFileUploadSuccess] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  /**
   * Handles the file upload and triggers the document-to-quiz generation process.
   * After a file is selected/uploaded, immediately generates quiz questions and updates the form.
   * API call stubbed - auto populates quiz form on success.
   * No user confirmation/button click required after file selection.
   */
  async function handleFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    setFileUploadError('');
    setFileUploadSuccess('');
    setUploadFileName('');
    if (!file) return;

    setUploadFileName(file.name);
    setFileUploadLoading(true);

    try {
      // FormData for file upload
      const formData = new FormData();
      formData.append('document', file);

      // Simulate API call to /api/generate-quiz-from-document
      // Replace with real API in production
      // Example: const res = await fetch('/api/generate-quiz-from-document', {method:"POST", body:formData});
      // const data = await res.json();

      // --- API placeholder: Stub logic ---
      await new Promise(res => setTimeout(res, 1700)); // simulate network/API delay

      // Simulated API result; in production, parse from `data`
      const simulatedGeneratedQuestions = [
        {
          type: "multiple-choice",
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Venus", "Mars", "Jupiter"],
          correct: 2
        },
        {
          type: "true-false",
          question: "Water boils at 100°C at sea level.",
          correct: true
        },
        {
          type: "short-answer",
          question: "Who wrote '1984'?",
          correct: "George Orwell"
        }
      ];
      // When quiz questions are generated, auto-populate the form immediately
      setQuizForm(qf => ({
        ...qf,
        questions: simulatedGeneratedQuestions
      }));
      setFileUploadSuccess("Quiz questions generated from document!");
      // Optionally: you could automatically scroll to questions or focus as well, if desired
    } catch (err) {
      setFileUploadError("Failed to generate quiz from the document. Please try again.");
    }
    setFileUploadLoading(false);
  }

  // Quiz editor and creation form
  function renderQuizForm() {
    return (
      <div style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 16px #e4edf5",
        maxWidth: 560,
        margin: "0 auto",
        padding: "36px 34px"
      }}>
        <h2 style={{color: COLOR_PRIMARY, marginTop: 0}}>{mode === "edit" ? "Edit Quiz" : "Create a New Quiz"}</h2>
        {/* --- Document upload block --- */}
        <div style={{
          background: "#f6fbff",
          border: `1.5px dashed ${COLOR_PRIMARY}`,
          padding: "14px 12px",
          marginBottom: 18,
          borderRadius: 7,
          display: "flex",
          gap: "16px",
          alignItems: "center"
        }}>
          <span style={{fontSize:16, fontWeight:500, color: COLOR_PRIMARY}}>Import from Document:</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{
              border: '1px solid #ccc',
              padding: 7,
              fontSize: 14,
              cursor: "pointer",
              background: "#fff",
              minWidth: 180
            }}
            disabled={fileUploadLoading}
            onChange={handleFileUpload}
            aria-label="Upload a document to auto-generate quiz questions"
          />
          {fileUploadLoading && (
            <span style={{
                color: COLOR_ACCENT,
                marginLeft: 10,
                fontWeight: 500,
                fontSize: 15
              }}>
              <span style={{marginRight:6}}>Generating questions...</span>
              <span className="spinner" style={{
                border: "2.3px solid #bce6fa",
                borderTop: `2.3px solid ${COLOR_ACCENT}`,
                borderRadius: "50%",
                display: "inline-block",
                width: "1.1em",
                height: "1.1em",
                animation: "spin 1s linear infinite",
                verticalAlign: "middle"
              }}/>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg);}
                  100% {transform: rotate(360deg);}
                }
              `}</style>
            </span>
          )}
          {fileUploadSuccess && (
            <span style={{color: COLOR_ACCENT, marginLeft: 10, fontSize: 14}}>{fileUploadSuccess}</span>
          )}
          {fileUploadError && (
            <span style={{color: "#e23e3e", marginLeft:10, fontSize:14}}>{fileUploadError}</span>
          )}
        </div>
        {/* --- End Document upload block --- */}

        <div style={{display: "flex", flexDirection: "column", gap: 18}}>
          <label>
            <span style={{fontWeight: 500}}>Quiz Title<span style={{color: "#ea3c3c"}}>*</span></span>
            <input 
              value={quizForm.title}
              onChange={e => setQuizForm(f => ({...f, title: e.target.value}))}
              placeholder="E.g. Science Challenge"
              style={inputStyle(quizFormErrors.title)}
            />
          </label>
          <label>
            <span style={{fontWeight: 500}}>Description</span>
            <textarea
              value={quizForm.description}
              onChange={e => setQuizForm(f => ({...f, description: e.target.value}))}
              rows={2}
              placeholder="Short description of the quiz"
              style={inputStyle()}
            />
          </label>
        </div>
        <hr style={{margin: "28px 0 18px", border: 0, borderTop: "1.5px solid #eee"}}/>
        <h3 style={{marginTop: 0}}>Questions</h3>
        {quizForm.questions.length === 0 &&
          <div style={{color: "#aaa", fontSize: 14, marginBottom: 10}}>No questions yet.</div>}
        <ol style={{margin: 0, paddingLeft: 22}}>
          {quizForm.questions.map((q,i) =>
            <li key={i} style={{marginBottom: 10}}>
              <span style={{marginRight: 8, fontWeight: 500}}>{getQuestionLabel(q)}</span>
              <button style={{
                ...btnStyle, background: "#eee", color: "#444", fontSize: 13, padding: "4px 12px", marginLeft: 8
              }}
              onClick={() => removeQuestion(i)}>Delete</button>
            </li>
          )}
        </ol>
        <details style={{margin:"16px 0"}} open>
          <summary style={{
            fontWeight: 600, color: COLOR_ACCENT, cursor: "pointer", outline: "none"
          }}>Add Question</summary>
          <div style={{padding: "10px 0 10px 0"}}>
            {renderQuestionForm()}
          </div>
        </details>
        <div style={{marginTop: 22}}>
          <button style={accentBtnStyle}
            onClick={handleSaveQuiz}>{mode === 'edit' ? "Save Changes" : "Create Quiz"}</button>
          <button style={{...btnStyle, marginLeft: 12, color: COLOR_PRIMARY, background: "#eef7fe"}} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  function inputStyle(error) {
    return {
      border: error ? "1.5px solid #ea3c3c" : "1.5px solid #c9d9e8",
      borderRadius: 4,
      padding: "8px 10px",
      fontSize: 15,
      marginTop: 3,
      marginBottom: 3,
      width: "100%",
      color: "#222",
      background: "#f9fcfe",
      boxSizing: "border-box"
    };
  }

  function getQuestionLabel(q) {
    switch(q.type) {
      case "multiple-choice":
        return `MCQ: ${q.question}`;
      case "true-false":
        return `True/False: ${q.question}`;
      case "short-answer":
        return `Short Answer: ${q.question}`;
      default:
        return q.question;
    }
  }

  function removeQuestion(idx) {
    setQuizForm(f => ({...f, questions: f.questions.filter((_, i) => i!==idx)}));
  }

  function handleQuizField(field, value) {
    setQuizForm(f => ({...f, [field]: value}));
  }

  // Add question to quizForm.questions
  function addQuestion() {
    let error = null;
    if (!questionForm.question.trim())
      error = "Question text required";
    if (questionForm.type === "multiple-choice" && questionForm.options.some(opt=>!opt.trim()))
      error = "All MCQ options required";
    if (error) {
      alert(error);
      return;
    }
    let newQ;
    switch (questionForm.type) {
      case "multiple-choice":
        newQ = {
          type: "multiple-choice",
          question: questionForm.question,
          options: questionForm.options.slice(),
          correct: Number(questionForm.correct)
        };
        break;
      case "true-false":
        newQ = {
          type: "true-false",
          question: questionForm.question,
          correct: questionForm.correctBool
        };
        break;
      case "short-answer":
        newQ = {
          type: "short-answer",
          question: questionForm.question,
          correct: questionForm.correctShort.trim()
        };
        break;
      default: break;
    }
    setQuizForm(f => ({ ...f, questions: [...f.questions, newQ] }));
    setQuestionForm({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correct: 0,
      correctBool: true,
      correctShort: ""
    });
  }

  function renderQuestionForm() {
    return (
      <div style={{display: "flex", flexDirection: "column", gap: 12}}>
        <label>
          Type:&nbsp;
          <select
            value={questionForm.type}
            style={{padding: "2px 4px", fontSize: 15}}
            onChange={e => setQuestionForm(qf => ({
              ...qf,
              type: e.target.value,
              // Reset extra fields based on type
              options: e.target.value === "multiple-choice" ? ["","","",""] : qf.options,
              correctBool: e.target.value === "true-false" ? true : qf.correctBool,
              correctShort: "",
              correct: 0
            }))}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </label>
        <label>
          <span style={{fontWeight: 500}}>Question</span>
          <input
            value={questionForm.question}
            style={inputStyle()}
            placeholder="Type your question here"
            onChange={e => setQuestionForm(qf => ({ ...qf, question: e.target.value }))}
          />
        </label>
        {questionForm.type === "multiple-choice" && (
          <>
            {[0,1,2,3].map(idx => (
              <label key={idx} style={{marginLeft: 12, display: "flex", alignItems: "center"}}>
                <input type="radio" 
                  name="mcqCorrect" 
                  checked={Number(questionForm.correct) === idx}
                  onChange={()=>setQuestionForm(qf=>({...qf, correct: idx}))}
                  style={{marginRight: 4}}
                />
                <input placeholder={`Option ${idx+1}`} value={questionForm.options[idx] || ''}
                    style={{...inputStyle(), width: "70%"}}
                    onChange={e => setQuestionForm(qf=>{
                      const opts = qf.options.slice();
                      opts[idx] = e.target.value;
                      return { ...qf, options: opts}; 
                    })}
                  />
                <span style={{marginLeft: 8, color: "#888", fontSize:13}}
                  >(Correct)</span>
              </label>
            ))}
          </>
        )}
        {questionForm.type === "true-false" && (
          <label>
            <span>Correct answer:&nbsp;</span>
            <select
              value={questionForm.correctBool ? "true" : "false"}
              onChange={e=>setQuestionForm(qf=>({...qf, correctBool: e.target.value==="true"}))}
              style={{fontSize: 15}}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        )}
        {questionForm.type === "short-answer" && (
          <label>
            <span>Correct answer:</span>
            <input 
              value={questionForm.correctShort}
              style={inputStyle()}
              placeholder="Type correct answer"
              onChange={e=>setQuestionForm(qf=>({...qf, correctShort: e.target.value}))}
            />
          </label>
        )}
        <div>
          <button style={btnStyle} onClick={addQuestion}>Add Question</button>
        </div>
      </div>
    );
  }

  function handleSaveQuiz() {
    const newErrors = {};
    if (!quizForm.title.trim()) newErrors.title = true;
    setQuizFormErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Editing existing quiz
    if (mode === "edit") {
      setQuizzes(qzlist =>
        qzlist.map(q =>
          q.id === activeQuiz.id
            ? {...quizForm, id: q.id}
            : q
        )
      );
    } else {
      // Creating new quiz
      setQuizzes(qzlist => [
        ...qzlist,
        {
          ...quizForm,
          id: Date.now() // Basic id for example
        }
      ]);
    }
    setMode("dashboard");
    setQuizForm({title: "", description: "", questions: []});
    setActiveQuiz(null);
    setQuizFormErrors({});
  }

  function startCreate() {
    setMode("create");
    setQuizForm({title: "", description: "", questions: []});
    setActiveQuiz(null);
    setQuizFormErrors({});
  }

  function handleCancel() {
    setMode("dashboard");
    setActiveQuiz(null);
    setQuizForm({title: "", description: "", questions: []});
    setQuizFormErrors({});
  }

  function handleEditQuiz(qz) {
    setActiveQuiz(qz);
    setQuizForm({
      title: qz.title,
      description: qz.description,
      questions: qz.questions.map(q => ({...q}))
    });
    setMode("edit");
  }

  function handleShare(qz) {
    // Simulate quiz sharing URL
    const dummyUrl = `${window.location.origin}/quiz/${qz.id}`;
    navigator.clipboard.writeText(dummyUrl).catch(() => {});
    alert("Quiz share link copied to clipboard:\n" + dummyUrl);
  }

  // Preview mode: take a quiz and see instant feedback
  function openPreview(qz) {
    setActiveQuiz(qz);
    setMode("preview");
    setPreviewAnswers({});
    setPreviewFeedback(null);
  }

  function handlePreviewAnswer(qIdx, val) {
    setPreviewAnswers(ans => ({ ...ans, [qIdx]: val }));
  }

  function checkPreviewAnswers() {
    if (!activeQuiz) return;
    let correct = 0;
    let feedbackList = activeQuiz.questions.map((q, idx) => {
      let res = false;
      switch(q.type) {
        case "multiple-choice":
          res = Number(previewAnswers[idx]) === Number(q.correct);
          break;
        case "true-false":
          res = String(previewAnswers[idx]) === String(q.correct);
          break;
        case "short-answer":
          res = String(previewAnswers[idx] || "").trim().toLowerCase()
                === String(q.correct).trim().toLowerCase();
          break;
        default:
          break;
      }
      if (res) correct++;
      return res;
    });
    setPreviewFeedback(feedbackList);
  }

  function renderPreview() {
    if (!activeQuiz) return null;
    return (
      <div style={{
        background: "#fff", borderRadius: 12,
        boxShadow: "0 3px 12px #deeefa", maxWidth: 600, margin: "0 auto", padding: "34px 20px"
      }}>
        <h2 style={{color: COLOR_PRIMARY}}>{activeQuiz.title} <span style={{fontSize:17, color:"#444"}}>— Preview</span></h2>
        {activeQuiz.description &&
        <div style={{color: "#666", fontSize: 16, marginBottom: 12}}>{activeQuiz.description}</div>}
        <form onSubmit={e=>{e.preventDefault();checkPreviewAnswers();}}>
        <ol style={{margin:0, paddingLeft:25}}>
          {activeQuiz.questions.map((q, idx) => (
            <li key={idx} style={{marginBottom: 16}}>
              <div>
                <div style={{fontWeight:500, marginBottom: 6}}>{q.question}</div>
                {q.type === "multiple-choice" && (
                  <div>
                    {q.options.map((opt,i)=>
                      <label key={i} style={{display:"block",padding:"2px 0", fontSize:15}}>
                        <input type="radio"
                          checked={Number(previewAnswers[idx])===i}
                          name={`mcq-preview-${idx}`}
                          onChange={() => handlePreviewAnswer(idx, i)}
                        />&nbsp;{opt}
                      </label>
                    )}
                  </div>
                )}
                {q.type === "true-false" && (
                  <div>
                    <label style={{marginRight: 16}}>
                      <input type="radio"
                        checked={String(previewAnswers[idx])==='true'}
                        onChange={()=>handlePreviewAnswer(idx,"true")}
                        name={`tf-preview-${idx}`}
                      /> True
                    </label>
                    <label>
                      <input type="radio"
                        checked={String(previewAnswers[idx])==='false'}
                        onChange={()=>handlePreviewAnswer(idx,"false")}
                        name={`tf-preview-${idx}`}
                      /> False
                    </label>
                  </div>
                )}
                {q.type === "short-answer" && (
                  <input
                    value={previewAnswers[idx] || ""}
                    placeholder="Your answer"
                    style={inputStyle()}
                    onChange={e=>handlePreviewAnswer(idx, e.target.value)}
                  />
                )}
                {previewFeedback && (
                  <div style={{
                    marginTop:8,
                    color: previewFeedback[idx]? COLOR_ACCENT : "#e23e3e",
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    {previewFeedback[idx]? "Correct!" : "Incorrect"}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div style={{marginTop:16}}>
          <button style={accentBtnStyle} type="submit">Submit Answers</button>
          <button style={{
            ...btnStyle,
            marginLeft:5,
            background: "#f2f5fb",
            color: COLOR_PRIMARY
          }} type="button"
           onClick={()=>setMode("dashboard")}
          >Back to Dashboard</button>
        </div>
        {previewFeedback &&
        <div style={{
          marginTop: 18,
          fontSize: 17,
          fontWeight: 500,
          color: COLOR_PRIMARY
        }}>
          Score: {previewFeedback.filter(Boolean).length} / {activeQuiz.questions.length}
        </div>}
        </form>
      </div>
    );
  }

  // Layout and navigation
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6fafd"
    }}>
      {/* App Bar */}
      <nav style={{
        background: "#fff",
        borderBottom: `2px solid ${COLOR_PRIMARY}11`,
        boxShadow: "0 1px 6px 0 #bce6fa19",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 150
      }}>
        <div style={{
          fontWeight: 700,
          color: COLOR_PRIMARY,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          letterSpacing: ".03em"
        }}>
          <span style={{
            fontWeight: 800,
            fontSize: 28,
            color: COLOR_ACCENT,
            marginRight: 8
          }}>★</span> QuizCraft
        </div>
        {mode === "dashboard" && (
          <button style={{
            ...accentBtnStyle,
            marginLeft: "auto",
            boxShadow: "0 2px 6px #cce8d659"
          }} onClick={startCreate}>Create Quiz</button>
        )}
      </nav>
      {/* Main Content Container */}
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "36px 8px 38px"
      }}>
        {mode === "dashboard" && renderDashboard()}
        {(mode === "create" || mode === "edit") && renderQuizForm()}
        {mode === "preview" && renderPreview()}
      </div>
      {/* Footer */}
      <footer style={{
        marginTop: "42px",
        textAlign: "center",
        padding: "22px 0 14px",
        fontSize: 14,
        color: "#999"
      }}>
        © {new Date().getFullYear()} QuizCraft – by KAVIA AI
      </footer>
    </div>
  );
}

export default QuizCraftContainer;

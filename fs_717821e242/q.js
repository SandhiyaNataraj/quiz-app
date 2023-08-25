let questions = [
    {
        question: "Which is the national animal of India",
        answers: [
            { text: "Elephant", correct: "false" },
            { text: "Tiger", correct: "true" },
            { text: "Lion", correct: "false" },
            { text: "Dog", correct: "false" },
        ]
    },
    {
        question: "Which is the national bird of India",
        answers: [
            { text: "Peacock", correct: "true" },
            { text: "Hen", correct: "false" },
            { text: "Duck", correct: "false" },
            { text: "Penguin", correct: "false" },
        ]
    },
    {
        question: "Which is the national flower of India",
        answers: [
            { text: "Jasmine", correct: "false" },
            { text: "Rose",correct: "false" },
            { text: "Lotus", correct: "true" },
            { text: "Sunflower", correct: "false" },
        ]
    }
  ];
  
  let questionElement = document.getElementById("question");
  let answerButton = document.getElementById("answers-btn");
  let nextButton = document.getElementById("btn1");
  
  let currentQuestionIndex = 0;
  let currentScore = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
  }
  
  function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
          button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
  }
  
  function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild);
    }
  }
  
  function selectAnswer(e){
     let selectedBtn=e.target;
     let isCorrect=selectedBtn.dataset.correct==="true";
     if(isCorrect){
      selectedBtn.classList.add("correct");
      currentScore++;
     }else{
      selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButton.children).forEach(button=>{
       if(button.dataset.correct==="true"){
        button.classList.add("correct");
       }
       button.disabled=true;
     });
      nextButton.style.display="block";
  }
  
  
  function showScore(){
      resetState();
      questionElement.innerHTML=`You scored ${currentScore} out of ${questions.length}!`;
      nextButton.innerHTML="Play Again";
      nextButton.style.display="block";
  }
  
  
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
      showQuestions();
    }else{
      showScore();
    }
  }
  
  nextButton.addEventListener("click",()=>{
       if(currentQuestionIndex<questions.length){
         handleNextButton();
       }else{
        startQuiz();
       }
  });
  
  startQuiz();
  
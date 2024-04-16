// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjWnGy2HpTFM-07fRp3VIokULmU_dyMg4",
    authDomain: "campusconnect-30c4a.firebaseapp.com",
    databaseURL: "https://campusconnect-30c4a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "campusconnect-30c4a",
    storageBucket: "campusconnect-30c4a.appspot.com",
    messagingSenderId: "728123265116",
    appId: "1:728123265116:web:2d24f83a222e156fe4d699",
    measurementId: "G-YRMP4KDMNX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Set database variable 
var database = firebase.database(); 

/*const questions = [
    {
       question: "Which is the largest animal in the world?", 
        answers: [
            {text: "Shark", correct: false}, 
            {text: "Blue whale", correct: true}, 
            {text: "Elephant", correct: false}, 
            {text: "Giraffe", correct: false}, 
        ]
    }, 
    {
        question: "Which is the smallest continent in the world?", 
        answers: [
            {text: "Asia", correct: false}, 
            {text: "Africa", correct: false}, 
            {text: "Australia", correct: true}, 
            {text: "Arctic", correct: false},  
        ]
    }, 
    {
        question: "Which is the smallest country in the world?", 
        answers: [
            {text: "Vatican City", correct: true}, 
            {text: "Bhutan", correct: false}, 
            {text: "Nepal", correct: false}, 
            {text: "Shri Lanka", correct: false},
        ] 
    }
]; */


// Function to fetch questions from Realtime Database
/*function fetchQuestionsFromDatabase() {
  var questionsRef = firebase.database().ref("/questions");

  questionsRef.once("value")
    .then(function(snapshot) {
        var questionsData = snapshot.val();
        console.log(questionsData);
      
        if (questionsData && questionsData.questions) {
          // Assuming your existing quiz logic works with 'questions' array
          startQuiz(questionsData.questions); // Pass fetched questions to startQuiz function
        } else {
          console.error("No questions data found in the database.");
        }
    })
}

// Example usage: Fetch questions from database
fetchQuestionsFromDatabase();*/


const questionElem = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0; 
let score = 0; 

/*function startQuiz(){
    currentQuestionIndex = 0; 
    score = 0;
    nextButton.innerHTML = "Next"; 
    showQuestion();  
}*/

// Function to fetch questions from Realtime Database
function fetchQuestionsFromDatabase() {
    var questionsRef = firebase.database().ref("/questions");
  
    questionsRef.once("value")
      .then(function(snapshot) {
          var questionsData = snapshot.val();
          console.log(questionsData);
  
          if (questionsData && questionsData.questions) {
            startQuiz(questionsData.questions);
          } else {
            console.error("No questions data found in the database.");
          }
      })
      .catch(function(error) {
        console.error("Error fetching questions from the database: ", error);
      });
  }
  
  // Start the quiz with the given questions array
  function startQuiz(questions) {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(questions[currentQuestionIndex]);
  }
  
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo = currentQuestionIndex + 1; 
    questionElem.innerHTML = questionNo + ". " + currentQuestion.
    question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); 
        button.innerHTML = answer.text
        button.classList.add("btn"); 
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer)
    }); 
}

function resetState(){
    nextButton.style.display = "none"; 
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct === "true"; 
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;  
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); 
        }
        button.disabled = true; 
    }); 
    nextButton.style.display = "block"; 

}
function showScore(){
    resetState(); 
    questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again"; 
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore(); 
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton(); 
    }else{
        startQuiz(); 
    }
})

startQuiz();
// Example usage: Fetch questions from database
fetchQuestionsFromDatabase(); 

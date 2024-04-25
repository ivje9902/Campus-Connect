import { initializeApp } from "firebase/app";  
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc, count, getDoc } from "firebase/firestore";

import { db } from './firebase.js';
 

// DOM elements

const questionElem = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn"); 


async function fetchQuiz() {
    var courseID = localStorage.getItem("ID");
    console.log(courseID);
  
    const docRef = doc(db, courseID, "Quizzes", "all-quizzes");
    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if(docSnap.exists()) {
        console.log("Document data:", docSnap.data()); 
        const data = docSnap.data(); 

        // Iterate over each field in the document's data
        if(data["all-quizzes"]) {
          const allQuizRef = collection(docRef, "all-quizzes"); 
          const allQuizSnap = await getDoc(allQuizRef); 

          if (!allQuizzesSnapshot.empty) {
            allQuizzesSnapshot.forEach((doc) => {
                console.log("Quiz ID:", doc.id);
                const quizData = doc.data();
                console.log("Quiz Data:", quizData);

                // Print questions for each quiz
                if (quizData.questions && Array.isArray(quizData.questions)) {
                    console.log("Questions:");
                    quizData.questions.forEach((question, index) => {
                        console.log(`${index + 1}. ${question.question}`);
                        console.log("Correct Answer:", question.correct_answer);
                        console.log("Incorrect Answers:", question.incorrect_answers);
                        // Add more fields or formatting as needed
                    });
                } else {
                    console.log("No questions found for this quiz.");
                }
            });
        } else {
            console.log("No quizzes found in 'all-quizzes' collection.");
        }
    } else {
        console.log("The 'all-quizzes' collection does not exist in the 'Quizzes' document.");
    }
} else {
    console.log("The 'Quizzes' document does not exist.");
  }
}
  
  // Variables to track quiz progress and score
  let currentQuestionIndex = 0; 
  let score = 0; 
  let questions = []; // Array to store quiz questions
  
  
  // Start the quiz with the given questions array
  function startQuiz(questions) {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(questions[currentQuestionIndex]);
  }
  
  // Function to display the current question
  function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; 
    let questionNo = currentQuestionIndex + 1; 
    questionElem.innerHTML = questionNo + ". " + currentQuestion.
    question; 
    
    // Loop through each answer and create buttons for them
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
  
  // Function to reset the quiz state
  function resetState(){
    nextButton.style.display = "none"; 
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  // Function to handle user's answer selection
  function selectAnswer(e){
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct === "true"; 
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;  
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); 
        }
        button.disabled = true; 
    }); 
    nextButton.style.display = "block"; 
  }
  
  // Function to display the final score
  function showScore(){
    resetState(); 
    questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again"; 
    nextButton.style.display = "block";
  }
  
  // Event listener for the "Next" button
  function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore(); 
    }
  }
  
  fetchQuiz(); 
  // Start the quiz
  startQuiz(); 
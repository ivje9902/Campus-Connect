import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
//import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';


// Firebase configuration
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
const app = initializeApp(firebaseConfig);
// Get reference to Realtime Database
const db = getDatabase(app);

// DOM elements
const questionElem = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn"); 

// Variables to track quiz progress and score
let currentQuestionIndex = 0; 
let score = 0; 
let questions = []; // Array to store quiz questions

// Reference to the 'questions' node in the database
const questionsRef = ref(db, 'quizData/' + 'questions/');

// Event listener to fetch questions data from the database
onValue(questionsRef, (snapshot) => {
  const questionsData = snapshot.val(); // Retrieve the questions data

  if (questionsData && Array.isArray(questionsData)) {
    questions = questionsData; 
    showQuestion(); // Call showQuestion function to display the first question
  } else {
    console.error('Invalid questions data format.');
  }
});

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

// Start the quiz
startQuiz(); 
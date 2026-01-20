// Quiz Data
const vowels = [
    // {
    //     image: "images/acorn.jpg",
    //     question: "What is this?",
    //     answer: "acorn"
    // },
    // {
    //     image: "images/eagle.jpg",
    //     question: "What is the name of this bird?",
    //     answer: "eagle"
    // },
    // {
    //     image: "images/igloo.jpg",
    //     question: "What is this structure called?",
    //     answer: "igloo"
    // },
    // {
    //     image: "images/egg.jpg",
    //     question: "What is this? ",
    //     answer:"egg"
    // },{
    //     image: "images/umbrella.jpg",
    //     question: "What is this?",
    //     answer: "umbrella"
    // },
    // {
    //     image: "images/octopus.jpg",
    //     question: "What is the name of this sea creature?",
    //     answer1: "octopus",
    // },
    {
        image: "images/apple.jpg",
        question: "What fruit is this?",
        options: ["apple", "banana", "grapes", "mango"],
        answer: "apple"
    },{
        image: "images/oval.png",
        question: "What is the name of this shap?",
        options: ["rectangle", "squre", "oval", "circle"],
        answer: "oval"
    },{
        image: "images/uniform.png",
        question: "What is this ?",
        options: ["school uniform","police uniform","army uniform","fireman uniform"],
        answer:"school uniform"
    }
];


// DOM Elements
const questionImage = document.getElementById("question-image");
const questionText = document.getElementById("question");
const resultStatus = document.getElementById("status");
const questionNo = document.getElementById("question-number");
const gameScore = document.getElementById("score");
const btn = document.getElementById("submit-btn");
const answerInput = document.getElementById("answer");
const userGrade = document.getElementById("grade");


const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

option1.onclick =()=>{console.log(option1.innerText),CheckOption(option1)}
option2.onclick =()=>{console.log(option2.innerText),CheckOption(option2)}
option3.onclick =()=>{console.log(option3.innerText),CheckOption(option3)}  
option4.onclick =()=>{console.log(option4.innerText),CheckOption(option4)}

let questionIndex = 0;
let score = 0;

function LoadQuestion(){
    current_index = vowels[questionIndex];
    if(questionIndex < vowels.length){
    questionImage.src= vowels[questionIndex].image;
    questionText.innerText = vowels[questionIndex].question;
    questionNo.innerText = `Question No: ${questionIndex+1} of ${vowels.length}`;
        
        if(current_index.options){
            answerInput.style.display = "none";
            btn.style.display="none"
            option1.style.display = "block";
            option2.style.display = "block";
            option3.style.display = "block";
            option4.style.display = "block";
            option1.innerText = current_index.options[0];
            option2.innerText = current_index.options[1];
            option3.innerText = current_index.options[2];
            option4.innerText = current_index.options[3];
        }else{
            option1.style.display = "none";
            option2.style.display = "none";
            option3.style.display = "none";
            option4.style.display = "none";
            answerInput.style.display = "block";
            btn.style.display = "block";
        }
    
  
    }else{
        resultStatus.innerText = "Quiz Finished";
        btn.disabled = true;
    }
}

// Calculate the grade
function Grade(score,questions){
    result = (score/questions)*100;
    userGrade.innerText = `Your Grade is: ${result.toFixed(2)}%`;
    if (result >= 60){
        userGrade.style.color = "green";
    }else if(result < 50){
        userGrade.style.color = "red";
    }
}

// reset option
function resetOptions(){
[option1,option2,option3,option4].forEach((option)=>{
    option.style.backgroundColor ="white"
    option.style.color = "black";
    option.disabled = false;
})

}
// check the option
function CheckOption(option){
    if(option.innerText.toLowerCase() === vowels[questionIndex].answer){
        score++
        resultStatus.innerText = "Correct ";
        resultStatus.style.color = "green";
        option.style.backgroundColor ="green"
        option.style.color = "white";
    }else{
        console.log(`Your answer is ${option.innerText} Correct answer is : ${vowels[questionIndex].answer}`)
        resultStatus.innerText = `Wrong: ${vowels[questionIndex].answer}`;
        resultStatus.style.color = "red";
        option.style.backgroundColor ="red";
        option.style.color = "white";
    }
    
    gameScore.innerText = `Your Score is: ${score} / ${vowels.length}`
    Grade(score,vowels.length)

      setTimeout(() => {
        questionIndex++;
        LoadQuestion();
        resetOptions()
    }, 1000);
    
    
}

function userAnswer(){
    // input from user
    let user_input = answerInput.value.toLowerCase().trim();
    console.log(user_input)

    if(user_input === ""){
        alert("Please enter your answer")
        return;
    }
    if(user_input === vowels[questionIndex].answer){
        score++

        resultStatus.innerText = " Correct"
        resultStatus.style.color = "green"
    }else{
        resultStatus.innerText = `Wrong: -> ${vowels[questionIndex].answer}`
        resultStatus.style.color = "red"
    }

    

    gameScore.innerText = `Your Score is: ${score} / ${vowels.length}`
    questionIndex++;
    answerInput.value = ""
    Grade(score,vowels.length)
    LoadQuestion()
}

LoadQuestion()

btn.addEventListener("click",()=>{
    userAnswer()
})

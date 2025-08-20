const flags = [
    {
        image: 'images/黑旗.jpg',
        correctAnswer: '禁止通行',
        options: ['禁止通行', '比賽結束', '危險狀況']
    },
    {
        image: 'images/紅旗.jpg',
        correctAnswer: '立即停止',
        options: ['禁止超車', '立即停止', '賽道濕滑']
    },
    {
        image: 'images/黃旗.jpg',
        correctAnswer: '前方危險',
        options: ['前方危險', '車輛故障', '超車警告']
    },
    {
        image: 'images/綠旗.jpg',
        correctAnswer: '警報解除',
        options: ['警報解除', '車輛故障', '超車警告']
    },
    {
        image: 'images/黑白格旗.jpg',
        correctAnswer: '抵達終點',
        options: ['前方危險', '抵達終點', '超車警告']
    },
    {
        image: 'images/藍旗.jpg',
        correctAnswer: '超車警告',
        options: ['前方危險', '抵達終點', '超車警告']
    }
];

const flagDisplay = document.getElementById('flag-display');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const shareLink = document.getElementById('share-link');

let currentFlagIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentFlagIndex >= flags.length) {
        endGame();
        return;
    }

    const currentFlag = flags[currentFlagIndex];
    flagDisplay.innerHTML = `<img src="${currentFlag.image}" alt="Racing Flag">`;
    questionText.textContent = `這是什麼旗號？ (第 ${currentFlagIndex + 1} 題)`;
    resultMessage.textContent = '';

    const shuffledOptions = shuffleArray([...currentFlag.options]);

    optionButtons.forEach((button, index) => {
        button.textContent = shuffledOptions[index];
        button.style.display = 'inline-block';
        button.onclick = () => processAnswer(button.textContent, currentFlag.correctAnswer);
    });

    restartButton.style.display = 'none';
    shareLink.style.display = 'none';
}

function processAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
        resultMessage.textContent = '答對了！';
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `答錯了！正確答案是「${correctAnswer}」。`;
        resultMessage.style.color = 'red';
    }

    currentFlagIndex++;
    setTimeout(loadQuestion, 1500);
}

function endGame() {
    flagDisplay.innerHTML = '';
    questionText.textContent = '';
    optionButtons.forEach(btn => btn.style.display = 'none');
    resultMessage.textContent = `遊戲結束！你的總得分是：${score} / ${flags.length}。`;
    resultMessage.style.color = 'blue';
    
    restartButton.style.display = 'inline-block';
    shareLink.style.display = 'inline-block';

    restartButton.onclick = () => {
        currentFlagIndex = 0;
        score = 0;
        loadQuestion();
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

loadQuestion();

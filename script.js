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

let currentFlagIndex = 0;
let score = 0; // 新增分數變數

function loadQuestion() {
    // 檢查是否已完成所有題目
    if (currentFlagIndex >= flags.length) {
        endGame();
        return;
    }

    const currentFlag = flags[currentFlagIndex];
    flagDisplay.innerHTML = `<img src="${currentFlag.image}" alt="Racing Flag">`;
    questionText.textContent = `這是什麼旗號？ (第 ${currentFlagIndex + 1} 題)`;
    resultMessage.textContent = ''; // 清空上一題的結果訊息

    // 隨機排列選項
    const shuffledOptions = shuffleArray([...currentFlag.options]);

    optionButtons.forEach((button, index) => {
        button.textContent = shuffledOptions[index];
        button.style.display = 'inline-block'; // 顯示按鈕
        // 為按鈕添加點擊事件，並傳入正確答案
        button.onclick = () => processAnswer(button.textContent, currentFlag.correctAnswer);
    });
}

function processAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++; // 答對則加分
        resultMessage.textContent = '答對了！';
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `答錯了！正確答案是「${correctAnswer}」。`;
        resultMessage.style.color = 'red';
    }

    // 無論答對或答錯，都自動進入下一題
    currentFlagIndex++;
    setTimeout(loadQuestion, 1500); // 1.5秒後載入下一題
}

function endGame() {
    // 隱藏遊戲元素，顯示最終分數
    flagDisplay.innerHTML = '';
    questionText.textContent = '';
    optionButtons.forEach(btn => btn.style.display = 'none');
    resultMessage.textContent = `遊戲結束！你的總得分是：${score} / ${flags.length}。`;
    resultMessage.style.color = 'blue';

    // 可以在這裡加入一個「重新開始」按鈕，讓玩家可以再次挑戰
}

// 隨機排列陣列的工具函式
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 遊戲開始
loadQuestion();

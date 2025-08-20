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
    // 你可以在這裡加入更多旗號
];

const flagDisplay = document.getElementById('flag-display');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const resultMessage = document.getElementById('result-message');

let currentFlagIndex = 0;

function loadQuestion() {
    if (currentFlagIndex >= flags.length) {
        // 遊戲結束
        resultMessage.textContent = '恭喜你！你已經完成了所有關卡！';
        flagDisplay.innerHTML = '';
        questionText.textContent = '';
        optionButtons.forEach(btn => btn.style.display = 'none');
        return;
    }

    const currentFlag = flags[currentFlagIndex];
    flagDisplay.innerHTML = `<img src="${currentFlag.image}" alt="Racing Flag">`;
    questionText.textContent = '這是什麼旗號？';

    optionButtons.forEach((button, index) => {
        button.textContent = currentFlag.options[index];
        button.style.display = 'inline-block'; // 顯示按鈕
        button.onclick = () => checkAnswer(button.textContent, currentFlag.correctAnswer);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        resultMessage.textContent = '答對了！';
        resultMessage.style.color = 'green';
        currentFlagIndex++;
        setTimeout(loadQuestion, 1500); // 1.5秒後進入下一題
    } else {
        resultMessage.textContent = `答錯了！正確答案是「${correctAnswer}」。`;
        resultMessage.style.color = 'red';
    }
}

// 首次載入問題
loadQuestion();
// HTMLの要素を取得（変更なし）
const toggleButton = document.getElementById('toggleButton');
const quizContainer = document.getElementById('quiz-container');
const answerInput = document.getElementById('answerInput');
const submitButton = document.getElementById('submitButton');
const resultMessage = document.getElementById('resultMessage');
const correctCountElement = document.getElementById('correctCount');
const resetButton = document.getElementById('resetButton');

const images = [
    document.getElementById('image1'),
    document.getElementById('image2'),
    document.getElementById('image3'),
    document.getElementById('image4'),
    document.getElementById('image5'),
    document.getElementById('image6')
];

// クイズの正解リストとlocalStorageのキーを定義（変更なし）
const correctAnswers = [
  { answer: 'あ', message: 'スタンプ1 GETです' },
  { answer: 'い', message: 'スタンプ2 GETです' },
  { answer: 'う', message: 'スタンプ3 GETです' },
  { answer: 'え', message: 'スタンプ4 GETです' },
  { answer: 'お', message: 'スタンプ5 GETです' },
];
const quizKey = 'quizAnswers';
const countKey = 'correctCount';

// localStorageからデータを読み込む関数（変更なし）
function loadData() {
    const enteredAnswers = JSON.parse(localStorage.getItem(quizKey)) || [];
    let correctCount = parseInt(localStorage.getItem(countKey)) || 0;
    
    correctCountElement.textContent = correctCount;
    updateImageDisplay(correctCount);
    
    return { enteredAnswers, correctCount };
}

let { enteredAnswers, correctCount } = loadData();

// --- ここからupdateImageDisplay関数の変更 ---
function updateImageDisplay(count) {
    // すべての画像を非表示にする
    images.forEach(img => {
        img.style.display = 'none';
    });

    // 正解数に応じて画像を表示
    if (count >= 5) {
        images[5].style.display = 'block';
    } else if (count >= 4) {
        images[4].style.display = 'block';
    } else if (count >= 3) {
        images[3].style.display = 'block';
    } else if (count >= 2) {
        images[2].style.display = 'block';
    } else if (count >= 1) {
        images[1].style.display = 'block';
    } else { // 正解数が0の場合
        images[0].style.display = 'block';
    }
}
// --- ここまでupdateImageDisplay関数の変更 ---

// その他の関数（変更なし）
toggleButton.addEventListener('click', () => {
    const currentDisplay = quizContainer.style.display;
    if (currentDisplay === 'none') {
        quizContainer.style.display = 'block';
        toggleButton.textContent = '閉じる';
    } else {
        quizContainer.style.display = 'none';
        toggleButton.textContent = '暗号を入力';
    }
});

submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim();
    const foundAnswer = correctAnswers.find(item => item.answer === userAnswer);
    if (foundAnswer && !enteredAnswers.includes(userAnswer)) {
        resultMessage.textContent = foundAnswer.message;
        resultMessage.style.color = 'green';
        enteredAnswers.push(userAnswer);
        localStorage.setItem(quizKey, JSON.stringify(enteredAnswers));
        correctCount++;
        correctCountElement.textContent = correctCount;
        localStorage.setItem(countKey, correctCount);
        updateImageDisplay(correctCount);
        if (correctCount >= 5) {
            alert('おめでとうございます！スタンプが5つ集まりました！受付で景品を受け取ってください！');
        }
    } else if (foundAnswer && enteredAnswers.includes(userAnswer)) {
        resultMessage.textContent = 'その答えはすでに入力済みです。';
        resultMessage.style.color = 'orange';
    } else {
        resultMessage.textContent = '不正解です。もう一度試してください。';
        resultMessage.style.color = 'red';
    }
});

resetButton.addEventListener('click', () => {
    localStorage.clear();
    enteredAnswers = [];
    correctCount = 0;
    correctCountElement.textContent = correctCount;
    resultMessage.textContent = 'データがリセットされました。';
    resultMessage.style.color = 'black';
    updateImageDisplay(correctCount);
});
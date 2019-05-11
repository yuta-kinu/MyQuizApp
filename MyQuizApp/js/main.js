'use strict';

{
  // 要素を取得して、定数に代入
  const question = document.getElementById('question');
  const btn = document.getElementById('btn');
  const choices = document.getElementById('choices');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = [
    {q: 'スヌーピーが出てくる漫画はどれ？', c: ['ピーナッツ', 'バター', 'ココナッツ']},
    {q: 'スヌーピーの作者の出身地はどこ？', c: ['アメリカ', 'イギリス', 'フィンランド']},
    {q: 'スヌーピーは何犬？', c: ['ビーグル', 'ラブラドール', 'ダックス']},
    {q: 'スヌーピーの飼い主の名前は？', c: ['チャーリー・ブラウン', 'チャーリー・プース', 'チャーリー・バケット']},
    {q: 'スヌーピーの誕生日は？', c: ['8月10日', '8月28日', '8月4日']},
  ];

  // 今何問目のクイズを解いているのかを変数で表現
  let currentNum = 0;

  // 選択肢を選択したかどうかを管理する変数
  let isAnswered;
  let score = 0;

  // シャッフルする関数
  function shuffle(arr) {

    // arrは配列arrayの略。配列を引数にする
    // arr.length - 1 は配列の最後
    for (let i = arr.length - 1; i > 0; i--) {
      // １からi番目（配列の最後）までの要素からランダムで1つ選ぶ
      const j = Math.floor(Math.random() * (i + 1));

      // 選んだものと配列の最後を入れ替える
      [arr[j], arr[i]] = [arr[i], arr[j]];

      // これを配列が1つになるまで繰り返す
    }
    return arr;
  }

  // クリックされた選択肢が正解かどうかを判定する関数
  function checkAnswer(li) {
    // isAnswered === trueの省略した書き方
    // すでに選択済みの場合、以降の処理をしない
    // つまり、1つしか選択できないようになる
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    // 選択肢の配列の最初を正解とした場合の条件分岐
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    // 選択し終えたら、nextボタンを押せるようにする
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    // 質問文を埋め込む
    question.textContent = quizSet[currentNum].q;

    // choicesの最初の子要素がある限り、最初の子要素を消す、というループ
    // nextボタンを押した後に前問を残さないために記述する
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // shuffle関数に問題の選択肢を入れてシャッフル
    // 元の配列をシャッフルしてしまうと正解の選択肢がバラバラになってしまう
    // そのため、スプレット演算子を使って配列のコピーを作り、コピーをシャッフルする
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      // liタグを作って、シャッフルした選択肢を順番に入れていく
      const li = document.createElement('li');
      li.textContent = choice;

      // クリックされた選択肢が正解か動画を判定する処理を行う
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      // ulタグ（id=choices)の子要素にliタグを追加する
      choices.appendChild(li);
    });

    // 最後の問題にたどり着いたら、ボタンをnextからShow Scoreに変更する
    // quizSet.length - 1は最後の問題
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    // disabledが付いていない時にクリックしたらグレーに戻るようにする
    btn.classList.add('disabled');

    // 最後の問題にたどり着くまで、次の問題を表示する条件分岐
    // quizSet.length - 1は最後の問題
    if (currentNum === quizSet.length - 1) {
      // スコアを表示する
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.add('show');
    } else {
      // currentNumを１増やして、次のクイズをセットする
      currentNum++;
      setQuiz();
    }
  });
}

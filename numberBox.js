//행과 열의 숫자를 담아줄 배열
let boxRowNCol = [];
//행
let row = null;
//열
let col = null;
//정답의 숫자들을 하나하나를 배열로 담음
let num = { ans: [], ques: [] };
//num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열
let storeNum = [];
//사용자가 클릭한 숫자의 배열
let tryAnswer = [];
//사용자가 몇 번 클릭했는지 세어주며, 이 변수로 tryAnswer와 ans의 값을 비교 예정
let isClosure = 0;
//클릭시 화살표 모양 바뀌는 flag
let answerFlag = false;
//결과 img경로
let resultSrc = "";
//결과 message
let resultMessage = "";
//각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작
let submitFlag = [false, false];
//에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
let errorMessage = "";
let d = document;
//추후에 다시 num을 셋팅할때 쓰기 위해 마크업했을 당시 만들었던 input
let insertNum =
  "<input class='setNum' type='text' value='' onkeyup='checkNum(0)' autofocus> X <input class='setNum' type='text' value='' onkeyup='checkNum(1)'>";

window.onload = function () {
  d.getElementById("textPop").innerText = "상자의 열과 행을 입력해주세요";
};
//엔터와 클릭으로 실행할 수 있다
function submit() {
  num = { ans: [], ques: [] };
  storeNum = [];
  console.log(num, storeNum, "설마한다 2");
  //배열이 모두 true인 확인
  const isTrue = (value) => value === true;
  if (submitFlag.every(isTrue) !== true) {
    alert("입력값을 확인해주세요");
    return;
  }
  //입력하고 바뀌는 text
  d.getElementById("textPop").innerText = "정답은???";
  //상자의 가로 세로 갯수
  row = boxRowNCol[0];
  col = boxRowNCol[1];
  let answerLength;
  //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!
  if (boxRowNCol[0] > boxRowNCol[1]) {
    answerLength = boxRowNCol[0];
  } else {
    answerLength = boxRowNCol[1];
  }
  //숫자 생성 시작
  var answer = Math.random() * 10;
  //반면 상자에 들어갈 갯수는 정답을 포함해서 다른 숫자들이 들어가야함! randomNumber의 뒤에 숫자들을 응용함, .을 제외하고 row와 col의 갯수만큼
  //num.ques 숫자(배열의 인자들)을 바탕으로 박스의 number를 설정
  var mapAns = answer.toString(10).replace(".", "");
  num.ques.push(...mapAns);
  console.log(num, answer, answer.length, answerLength, "변절전0");
  //정답으로 쓸 숫자만 .소수점 밖으로 나오게!
  for (var i = 0; i < answerLength - 1; i++) {
    answer = answer * 10;
  }
  console.log(num, answer, answer.length, answerLength, "변절전1");
  answer = Math.floor(answer).toString(10);
  console.log(num, answer, answerLength, "변절전2");
  for (var i = 0; i < answer.length; i++) {
    num.ans.push(answer.substring(i, i + 1));
  }
  console.log(num, answer, "변절전3");
  createNumberBox();
  //팝업창 제거
  d.getElementById("popUpWrap").style.right = -3999 + "px";
  //정답 보여주기
  d.getElementById(
    "inputPop"
  ).innerHTML = `<span clas='answerText'>${answer}</span>`;
  d.getElementById("collect").style.display = "block";
  console.log(num, row, col, row * col, mapAns, answer, "우왕");
  //화살표 바꿔주는
  arrowFlag();
  //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!
}

//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음
function checkNum(index) {
  var number = d.querySelectorAll(".setNum");
  number[index].value = regexNumber(number[index].value);
  //정규식 test를 거치고 return 한 값을 value로 받음
  if (number[index].value === "") {
    alert(errorMessage);
    submitFlag[index] = false;
    return;
  }
  //입력한 값을 boxRowNCol에
  boxRowNCol[index] = number[index].value;
  //박스 게임 생성 배열 true
  submitFlag[index] = true;
  console.log(submitFlag, "섬미트플레그");
  //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 submit으로;
  if (event.keyCode === 13) {
    if (index === 0) {
      number[1].focus();
    } else {
      submit();
    }
  }
}
//숫자만 받는 메서드
function regexNumber(value) {
  var regex = /^[0-9]/g;
  if (!value) {
    errorMessage = "숫자를 입력해주세요";
    return "";
  }
  var flag = regex.test(value);
  if (!flag) {
    errorMessage = "숫자만 입력하세요";
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else if (value.length > 1) {
    errorMessage = "9이하의 숫자만 입력하세요";
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else {
    //숫자면 value를 그대로 리턴
    return value;
  }
}

//element를 생성하는 메서드
function createNumberBox() {
  //처음에는 아래와 같이 for문을 썻다가 종료시점이 num.ques가 모두 null이 됐을때 종료해야하기에 while문을 씀!
  //   for(var i=0; i<elementLength; i++){
  //     if(num.ques[insertNumIndex]!==null){
  //       insertRandomNum(insertNumIndex)
  //       console.log(num.ques)
  //     }else{2
  //       insertNumIndex=Math.ceil(Math.random()*10) % elementLength;
  //       insertRandomNum(insertNumIndex)}
  //       console.log(num.ques,2)
  //   }

  let bigger;

  // let randomIndex=createRandomNum()
  if (row >= col) {
    bigger = row;
  } else {
    bigger = col;
  }
  console.log(row, col, "test1");
  var i = 0;
  //우선 Math.random의 숫자의 갯수는 제한적, 보통 18개 정도의 소숫점 자릿수가 나오는 데 만일 사용자가 9*9하면 81개의 숫자를 구할 수 없다
  //이를 극복하는 조건문
  //만일 num.ques의 갯수가 row * col보다 작으면 굳이 배열을 안잘라도 됨! 그대로 써도 됨. 반대는 잘라야함!

  console.log(row, col, num.ques, "test5");
  if (num.ques.length >= row * col) {
    console.log(row, col, "test2");
    num.ques.splice(row * col);
    console.log("splice", num.ques, row * col);
  }
  console.log(row, col, "test3");
  while (num.ques.length < row * col) {
    num.ques.push(Math.floor(Math.random() * 10).toString(10));
  }
  console.log(num, bigger, "축배");
  insertRandomNum();
}
//랜덤으로 num.ques을 storeNum에 배치,, 이후 storeNum에서 공간값 순서로 숫자li에 배치
//메서드 진행은 num.ques의 복제 배열이 모두 null되면 끝남
function shuffle(a) {
  var i = 0;
  //a에 num.ques을 넣고 복제,, 기존 배열이 망가지면 안된다고 판단
  var quesCopy = [...a];
  console.log(quesCopy, num, "큐카피");
  while (storeNum.length < quesCopy.length) {
    var x = parseInt(Math.random() * quesCopy.length);
    if (quesCopy[x] !== null) {
      storeNum[i] = quesCopy[x];
      quesCopy[x] = null;
      i++;
    } else {
      var x = parseInt(Math.random() * quesCopy.length);
    }
    console.log(x, i, storeNum, "xI");
  }
}
//상자 생성
function insertRandomNum() {
  var li = d.getElementById("box").getElementsByTagName("li");
  console.log(d.getElementById("box"), "월요일");
  shuffle(num.ques);
  for (var i = 0; i < storeNum.length; i++) {
    let element = `<li class='boxElement'>${storeNum[i]}</li>`;
    if (d.getElementsByClassName("boxElement").length <= 0) {
      d.getElementById("box").innerHTML = element;
    } else {
      var e = d.createElement("li");
      var t = d.createTextNode(`${storeNum[i]}`);
      e.appendChild(t);
      d.getElementById("box").appendChild(e);
    }
    d.getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("class", "boxElement");
    d.getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("onclick", `getTryAnswer(${i})`);
  }

  console.log(storeNum.length, li.length, storeNum, num, ":text");
  for (var i = 0; i < li.length; i++) {
    console.log(d.getElementsByClassName("boxElement")[i], "헬프");
    d.getElementsByClassName("boxElement")[i].style.width = 500 / row + "px";
    d.getElementsByClassName("boxElement")[i].style.height = 500 / row + "px";
    d.getElementsByClassName("boxElement")[i].style.lineHeight =
      500 / row + "px";
  }
}
//사용자가 클릭한 숫자를 tryAnswer배열에 넣는 메서드
function getTryAnswer(i) {
  tryAnswer.push(storeNum[i]);
  console.log(num, isClosure, tryAnswer, "머냐");
  var li = d.getElementById("collection");
  var resultText = d.getElementById("resultText");
  //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 ans와 입력한 값을 비교함
  //만일 사용자가 틀린 답을 입력할때,
  if (num.ans[isClosure] !== tryAnswer[isClosure]) {
    d.getElementById("result").style.right = 0 + "px";
    alert("진실의 방으로");
    resultSrc = "punch.png";
    resultMessage = "한 판 더 하실?";
    //변수 초기화
    tryAnswer = [];
    isClosure = 0;
    li.innerText = "";
    //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감
  } else {
    var text = [...tryAnswer];
    li.innerText = text;
    setTryAnswer();
  }
  //tryAnswer와 ans의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!
  if (
    num.ans[num.ans.length] === tryAnswer[tryAnswer.length] &&
    tryAnswer.length === num.ans.length
  ) {
    d.getElementById("result").style.right = 0 + "px";
    resultSrc = "thumbsUp.png";
    resultMessage = "잇츠 굿~~~";
    //변수 초기화
    tryAnswer = [];
    isClosure = 0;
    li.innerText = "";
  }
  console.log(d.getElementsByTagName("img")[0], "L아마자");
  d.getElementsByTagName("img")[0].setAttribute("src", `img/${resultSrc}`);
  resultText.innerText = resultMessage;
  console.log(
    storeNum,
    i,
    num.ans,
    num.ques,
    tryAnswer,
    isClosure,
    "시작은???"
  );
}
var setTryAnswer = function () {
  console.log(storeNum, num.ans, num.ques, tryAnswer, isClosure, "시작");
  function updateCloser() {
    isClosure++;
  }
  return updateCloser();
};

/**answer */
function arrowFlag() {
  console.log(num, "ㅊ죙값");
  if (answerFlag === true) {
    d.getElementById("answerInner").innerText = `>`;
    answerFlag = false;
  } else {
    d.getElementById("answerInner").innerText = `<`;
    answerFlag = true;
  }
}
function showAnswer() {
  d.getElementById("popUpWrap").style.right = 0 + "px";
}
function closeM() {
  d.getElementById("result").style.right = -2999 + "px";
}

function retry() {
  boxRowNCol = num.ans = num.ques = storeNum = tryAnswer = [];

  row = col = null;
  isClosure = 0;
  answerFlag = false;
  resultSrc = resultMessage = errorMessage = "";
  submitFlag = [false, false];
  //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
  d.getElementById("inputPop").innerHTML = insertNum;
  d.getElementById("popUpWrap").style.right = "0";
  d.getElementById("textPop").innerText = "상자의 열과 행을 입력해주세요";
  d.getElementById("box").innerHTML = "";
  console.log(num, "설마한다");
}

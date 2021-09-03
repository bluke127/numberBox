//행과 열의 숫자를 담아줄 배열
let g_rowNCol = [];
//행
let g_row = null;
//열
let g_col = null;
//g_row와 g_col 중에 큰 수와 작은 수
let BIGGER;
let SMALL;
//정답의 숫자들을 하나하나를 배열로 담음
let g_num = { ans: [], ques: [] };
//g_num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열
let g_storeNum = [];
//정답의 배열의 각 숫자가 g_storeNum에 몇 번째 div에 배치되는지!
let g_setTimeIndex = [];
//사용자가 클릭한 숫자의 배열
let g_tryAnswer = [];
//사용자가 몇 번 클릭했는지 세어주며, 이 변수로 g_tryAnswer와 ans의 값을 비교 예정
let isAnsIndex = 0;
let isClosePop = false;
//클릭시 화살표 모양 바뀌는 flag
let isAnswer = false;
//결과 img경로
let resultSrc = "";
//결과 message
let resultMessage = "";
//각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작
let isSubmit = [false, false];
//에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
let errorMessage = "";
let d = document;
//자주 쓰는 클래스네임
let BOX_ELEMENT = d.getElementsByClassName("boxElement");
//추후에 다시 g_num을 셋팅할때 쓰기 위해 마크업했을 당시 만들었던 input
let insertInput =
  "<input class='setNum' type='text' value='' onkeyup='checkNum(0)' autofocus> X <input class='setNum' type='text' value='' onkeyup='checkNum(1)'>";

//엔터와 클릭으로 실행할 수 있다
async function submit() {
  g_num = { ans: [], ques: [] };
  g_storeNum = [];
  g_tryAnswer = [];
  d.getElementById("submitPop").style.display = "none";
  //배열이 모두 true인 확인
  const isTrue = (value) => value === true;
  if (isSubmit.every(isTrue) !== true) {
    alert("입력값을 확인해주세요");
    return;
  }
  //입력하고 바뀌는 text
  d.getElementById("textPop").innerText = "정답은???";
  //상자의 가로 세로 갯수
  g_row = g_rowNCol[0];
  g_col = g_rowNCol[1];
  let answerLength;
  //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!
  if (g_rowNCol[0] > g_rowNCol[1]) {
    answerLength = g_rowNCol[0];
  } else {
    answerLength = g_rowNCol[1];
  }
  //숫자 생성 시작
  var mapAns = Math.random() * 10;
  //반면 상자에 들어갈 갯수는 정답을 포함해서 다른 숫자들이 들어가야함! randomNumber의 뒤에 숫자들을 응용함, .을 제외하고 g_row와 g_col의 갯수만큼
  //g_num.ques 숫자(배열의 인자들)을 바탕으로 박스의 NUMber를 설정
  mapAns = mapAns.toString(10).replace(".", "");
  g_num.ques.push(...mapAns);
  for (var i = 0; i < answerLength; i++) {
    g_num.ans.push(mapAns.substring(i, i + 1));
  }
  createNumberBox();
  //팝업창 제거
  isClosePop = true;
  try {
    setTimeout(() => {
      closePopup("pop");
      setTime();
    }, 2000);
  } finally {
    await returnOrigin();
    //정답 보여주기
    var answerView = `${g_num.ans}`;
    answerView = answerView.replaceAll(",", " ");
    d.getElementById(
      "inputPop"
    ).innerHTML = `<span class='answerText'>${answerView}</span>`;
    d.getElementById("collect").style.display = "block";
    //화살표 바꿔주는
    setArrow();
    // }
    //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!
  }
}
//setimeout 질문사항
async function setTime() {
  for (var i = 0; i < g_setTimeIndex.length; i++) {
    setBlue(i);
  }
}
function returnOrigin() {
  for (var i = 0; i < g_setTimeIndex.length; i++) {
    BOX_ELEMENT[i].style.color = "#000";
  }
}
var SIndex;
var setBlue = function (num) {
  // console.log(SIndex0, g_setTimeIndex[SIndex], g_setTimeIndex, "같아야하는애");
  var setInnerBlue = function () {
    SIndex = num;
    SIndex0 = g_setTimeIndex[SIndex];
    console.log(SIndex0, g_setTimeIndex[SIndex], BOX_ELEMENT[SIndex], "?");
    BOX_ELEMENT[SIndex0].style.color = "blue";
  };
  var setInnerBlueResult = setTimeout(() => {
    setInnerBlue(num);
  }, 1000 * num);
  return setInnerBlueResult;
};
//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음
function checkNum(index) {
  var number = d.querySelectorAll(".setNum");
  //백스페이스와 새로고침 누를 때는 이 메서드 실행하지 말아주세요
  if (event.keyCode == 116 || event.keyCode === 8) {
    return false;
  }
  number[index].value = regexNumber(number[index].value);

  //정규식 test를 거치고 return 한 값을 value로 받음
  if (number[index].value === "") {
    alert(errorMessage);
    isSubmit[index] = false;
    return;
  }
  //입력한 값을 g_rowNCol에
  g_rowNCol[index] = number[index].value;
  //박스 게임 생성 배열 true
  isSubmit[index] = true;
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
  if (g_row >= g_col) {
    BIGGER = g_row;
    SMALL = g_col;
  } else {
    BIGGER = g_col;
    SMALL = g_row;
  }
  //우선 Math.random의 숫자의 갯수는 제한적, 보통 18개 정도의 소숫점 자릿수가 나오는 데 만일 사용자가 9*9하면 81개의 숫자를 구할 수 없다
  //이를 극복하는 조건문
  //만일 g_num.ques의 갯수가 g_row * g_col보다 작으면 굳이 배열을 안잘라도 됨! 그대로 써도 됨. 반대는 잘라야함!

  if (g_num.ques.length >= g_row * g_col) {
    g_num.ques.splice(g_row * g_col);
  }
  while (g_num.ques.length < g_row * g_col) {
    g_num.ques.push(Math.floor(Math.random() * 10).toString(10));
  }
  insertRandomNum();
}
//랜덤으로 g_num.ques을 STORE_g_num에 배치,, 이후 g_storeNum에서 공간값 순서로 숫자li에 배치
//메서드 진행은 NUM.ques의 복제 배열이 모두 null되면 끝남
function shuffleNum(a) {
  var i = 0;
  //a에 g_num.ques을 넣고 복제,, 기존 배열이 망가지면 안된다고 판단
  var quesCopy = [...a];
  while (g_storeNum.length < quesCopy.length) {
    var x = parseInt(Math.random() * quesCopy.length);
    if (quesCopy[x] !== null) {
      g_storeNum[i] = quesCopy[x];
      quesCopy[x] = null;
      //setTimeout용
      if (x < g_num.ans.length) {
        g_setTimeIndex[x] = i;
      }
      i++;
    } else {
      var x = parseInt(Math.random() * quesCopy.length);
    }
  }
}
//상자 생성
function insertRandomNum() {
  var li = d.getElementById("box").getElementsByTagName("li");
  shuffleNum(g_num.ques);
  for (var i = 0; i < g_storeNum.length; i++) {
    let element = `<li class='boxElement'>${g_storeNum[i]}</li>`;
    if (BOX_ELEMENT.length <= 0) {
      d.getElementById("box").innerHTML = element;
    } else {
      var e = d.createElement("li");
      var t = d.createTextNode(`${g_storeNum[i]}`);
      e.appendChild(t);
      d.getElementById("box").appendChild(e);
    }
    d.getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("class", "boxElement");
    d.getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("onclick", `getTryingAnswer(${i})`);
  }

  for (var i = 0; i < li.length; i++) {
    BOX_ELEMENT[i].style.width = 500 / g_row + "px";
    BOX_ELEMENT[i].style.height = 500 / g_row + "px";
    BOX_ELEMENT[i].style.fontSize = 60 / (SMALL / 2) + "px";
    BOX_ELEMENT[i].style.lineHeight = 500 / g_row + "px";
  }
}
//사용자가 클릭한 숫자를 g_tryAnswer배열에 넣는 메서드
function getTryingAnswer(i) {
  g_tryAnswer.push(g_storeNum[i]);
  var li = d.getElementById("collection");
  var resultText = d.getElementById("resultText");
  //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 ans와 입력한 값을 비교함
  //만일 사용자가 틀린 답을 입력할때,
  if (g_num.ans[isAnsIndex] !== g_tryAnswer[isAnsIndex]) {
    d.getElementById("result").style.right = 0 + "px";
    alert("진실의 방으로");
    resultSrc = "punch.png";
    resultMessage = "한 판 더 하실?";
    //변수 초기화
    g_tryAnswer = [];
    isAnsIndex = 0;
    li.innerText = "";
    //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감
  } else {
    var text = [...g_tryAnswer];
    li.innerText = text;
    tryAnswer(isAnsIndex);
  }
  //g_tryAnswer와 ans의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!
  if (
    g_num.ans[g_num.ans.length] === g_tryAnswer[g_tryAnswer.length] &&
    g_tryAnswer.length === g_num.ans.length
  ) {
    d.getElementById("result").style.right = 0 + "px";
    resultSrc = "thumbsUp.png";
    resultMessage = "잇츠 굿~~~";
    //변수 초기화
    g_tryAnswer = [];
    isAnsIndex = 0;
    li.innerText = "";
  }
  d.getElementsByTagName("img")[0].setAttribute("src", `img/${resultSrc}`);
  resultText.innerText = resultMessage;
}
var tryAnswer = function (c) {
  isAnsIndex = c;
  function updateCloser() {
    isAnsIndex++;
  }
  return updateCloser();
};

/**answer */
function setArrow() {
  if (isAnswer === true) {
    d.getElementById("answerInner").innerText = `>`;
    isAnswer = false;
  } else {
    d.getElementById("answerInner").innerText = `<`;
    isAnswer = true;
  }
}
function showAnswer() {
  d.getElementById("popUpWrap").style.right = 0 + "px";
  isAnswer === false;
  setArrow();
  isAnswer === true;
}
function closePopup(flag) {
  d.getElementById("result").style.right = -2999 + "px";
  if (flag === "pop" && isClosePop === true) {
    d.getElementById("popUpWrap").style.right = -2999 + "px";
  }
}

function retry() {
  g_rowNCol = g_num.ans = g_num.ques = g_storeNum = g_tryAnswer = [];
  isAnsIndex = 0;
  isClosePop = false;
  isAnswer = false;
  resultSrc = resultMessage = errorMessage = "";
  isSubmit = [false, false];
  //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
  d.getElementById("popUpWrap").style.right = "0";
  d.getElementById("textPop").innerText = "상자의 열과 행을 입력해주세요";
  d.getElementById("inputPop").innerHTML = insertInput;
  d.getElementById("box").innerHTML = "";
  d.getElementById("submitPop").style.display = "block";
  d.getElementById("collect").style.display = "none";
}

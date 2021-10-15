//행과 열의 숫자를 담아줄 배열
let rowNCol = [];
//행
let row = null;
//열
let col = null;
//row와 col 중에 큰 수와 작은 수
let bigger;
let small;
//정답의 숫자들을 하나하나를 배열로 담음
let num = { answer: [], question: [] };
//num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열
let boxValue = [];
//사용자가 클릭한 숫자의 배열
let userAnswer = [];
//사용자가 몇 번 클릭했는지 세어주며, 이 변수로 userAnswer와 answer의 값을 비교 예정
let answerIndex = 0;
//팝업을 닫아줄 변수
let isClosePop = false;
//비동기를 통해 답이 몇번째 상자에 들어갔는지 확인해주는 객체변수
let setShowingAnswer = { answerOrder: [], boxValueOrder: [] };
//클릭시 화살표 모양 바뀌는 flag
let isAnswer = false;
//결과 img경로
let resultSrc = "";
//결과 message
let resultMessage = "";
//각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작
let isRow = false;
let isCol = false;
let passRowNCol = [isRow, isCol];
//에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
let errorMessage = "";
//자주 쓰는 클래스네임
let BOX_ELEMENT = document.getElementsByClassName("boxElement");

//style 관련 메서드
function changeText(area, text, i) {
  if (!i) {
    i = 0;
  }
  document.getElementById(area)
    ? (document.getElementById(area).innerText = text)
    : (document.getElementsByClassName(area)[i].innerText = text);
}
function showNhideArea(area, flag) {
  console.log(
    document.getElementById(area),
    document.getElementsByClassName(area)[0],
    flag
  );
  document.getElementById(area)
    ? (document.getElementById(area).style.display = flag)
    : (document.getElementsByClassName(area)[0].style.display = flag);
}
function showNhideArea(area, flag) {
  console.log(
    document.getElementById(area),
    document.getElementsByClassName(area)[0],
    flag
  );
  document.getElementById(area)
    ? (document.getElementById(area).style.display = flag)
    : (document.getElementsByClassName(area)[0].style.display = flag);
}

function setColor(area, i) {
  console.log(document.getElementById(area).children);
  document.getElementById(area).children[i].style.color = "blue";
  document.getElementById(area).children[i].style.fontSize = "60px";
}
//랜던 함수를 추출하는 메서드
/** 이 메서드를 쓰는 부분에서 질문, 10-11에 보낸 카톡 내용 */
const setRandomNum = function (count, option, limit) {
  console.log(count);
  let num = [];
  while (true) {
    if (!option.duplication && !limit) {
      let randomNum = Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        randomNum = Math.floor(Math.random() * 10);
        num.push(randomNum);
      }
      break;
    } else if (option.duplication && !limit) {
      let randomNum = Math.floor(Math.random() * 10);
      if (!num.includes(randomNum)) {
        num.push(randomNum);
      } else {
        continue;
      }
      if (num.length === count) {
        break;
      }
    } else if (option.duplication && limit) {
      let randomNum = Math.floor(Math.random() * 100) % limit;
      if (num.length < count) {
        if (num.includes(randomNum % limit)) {
          console.log(num.length, count, num, limit, "yes");
          continue;
        } else if (!num.includes(randomNum % limit)) {
          console.log("no");
          num.push(randomNum % limit);
        }
      } else {
        console.log("break");
        break;
      }
    }
  }
  return num;
};

//엔터와 클릭으로 실행할 수 있다
async function insertNumber() {
  if (!Boolean(passRowNCol)) {
    alert("입력값을 확인해주세요");
    return;
  }
  //상자의 가로 세로 갯수
  rowNCol.push(row);
  rowNCol.push(col);
  let answerLength;
  row > col ? (answerLength = row) : (answerLength = col);
  //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!

  num.question = setRandomNum(row * col, { duplication: false });
  num.answer = num.question.slice(0, answerLength);
  let indexForStore = setRandomNum(row * col, { duplication: true }, row * col);
  console.log(indexForStore);
  for (let ii = 0; ii < row * col; ii++) {
    if (indexForStore[ii] < num.answer.length) {
      setShowingAnswer.boxValueOrder.push(ii);
      setShowingAnswer.answerOrder.push(indexForStore[ii]);
    }
    boxValue.push(num.question[indexForStore[ii]]);
  }
  returnIndex(setShowingAnswer.answerOrder);
  console.log(returnIndex(setShowingAnswer.answerOrder), setShowingAnswer, "?");

  createNumberBox();
  setArrow();
  changeText("textPop", "정답은???");
  changeText("answerText", `${num.answer}`);
  showNhideArea("submitPop", "none");
  showNhideArea("answerView", "block");
  showNhideArea("setNumArea", "none");
  showNhideArea("collect", "block");
  await asyncMethod();
  for (let i in setShowingAnswer.answerOrder) {
    console.log(
      setShowingAnswer.boxValueOrder[
        returnIndex(setShowingAnswer.answerOrder)[i]
      ]
    );
    await setTime(
      setShowingAnswer.boxValueOrder[
        returnIndex(setShowingAnswer.answerOrder)[i]
      ]
    );
  }
  console.log(setShowingAnswer);
}
/** 안되는 부분 ( 닫게 만들어주는 메서드와 함께 문제가 있는 setTime이란 메서드를 붙임 setTime은 정답의 숫자글씨를 파란색으로 보여줌(setForBlue),이후 returnOrigin을 통해 검은 색의 글씨로 바꿔줌  ) */
function asyncMethod() {
  return new Promise((resolve) => {
    setTimeout(function () {
      closePopup("pop");
      resolve();
    }, 1000);
    isClosePop = true;
  });
}
//new) 어떤 공간값을 담은 배열 속에 값들을 0부터 배열의 길이의 값이 있는 공간값을 저장 ex)[2,0,1]=>[1,2,0]
function returnIndex(array) {
  let newA = [];
  for (let z = 0; z < array.length; z++) {
    for (let v in array) {
      if (array[v] === z) {
        newA.push(v);
      }
    }
  }
  return newA;
}

//setimeout 질문사항
function setTime(i) {
  return new Promise((resolve) => {
    setTimeout(function () {
      setColor("box", i);
      returnOrigin(i);
      resolve();
    }, 500);
  });
}
function returnOrigin(i) {
  return new Promise((resolve) =>
    setTimeout(() => {
      BOX_ELEMENT[i].style.fontSize = "1em";
      BOX_ELEMENT[i].style.color = "#000";
      resolve();
    }, 300)
  );
}
//리턴한건 처음에 then을 썻는데 거기에 프라미스 결과값이 없어서 안나오나 해서 retunr값을 붙여봄

//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음
function checkNum(index) {
  let number = document.querySelectorAll(".setNum");
  //백스페이스와 새로고침 누를 때는 이 메서드 실행하지 말아주세요
  if (event.keyCode == 116 || event.keyCode === 8) {
    return false;
  }
  //정규식 test를 거치고 return 한 값을 value로 받음
  if (regexNumber(number[index].value) === "") {
    alert(errorMessage);
    number[index].value = number[index].value.substring(0, 1);
    passRowNCol[index] = false;
    return;
  }
  //입력한 값을 rowNCol에
  rowNCol[index] = number[index].value;
  //박스 게임 생성 배열 true
  passRowNCol[index] = true;
  index === 0 ? (row = number[index].value) : (col = number[index].value);
  //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 submit으로;
  if (event.keyCode === 13) {
    if (index === 0) {
      number[1].focus();
    } else {
      insertNumber();
    }
  }
}
//숫자만 받는 메서드
function regexNumber(value) {
  let regex = /^[0-9]/g;
  if (!value) {
    errorMessage = "숫자를 입력해주세요";
    return "";
  }
  let flag = regex.test(value);
  if (!flag) {
    errorMessage = "숫자만 입력하세요";
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else if (value.length > 1) {
    errorMessage = "9이하의 숫자만 입력하세요";
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  }
  //숫자면 value를 그대로 리턴
  return value;
}

//랜덤으로 num.question을 STORE_num에 배치,, 이후 boxValue에서 공간값 순서로 숫자li에 배치
//메서드 진행은 NUM.question의 복제 배열이 모두 null되면 끝남
//상자 생성
function createNumberBox() {
  var li = document.getElementById("box").getElementsByTagName("li");
  for (var i = 0; i < boxValue.length; i++) {
    let element = `<li class='boxElement'>${boxValue[i]}</li>`;
    if (BOX_ELEMENT.length <= 0) {
      document.getElementById("box").innerHTML = element;
    } else {
      var e = document.createElement("li");
      var t = document.createTextNode(`${boxValue[i]}`);
      e.appendChild(t);
      document.getElementById("box").appendChild(e);
    }
    document
      .getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("class", "boxElement");
    document
      .getElementById("box")
      .getElementsByTagName("li")
      [i].setAttribute("onclick", `getTryingAnswer(${i})`);
  }

  for (var i = 0; i < li.length; i++) {
    BOX_ELEMENT[i].style.width = 500 / row + "px";
    BOX_ELEMENT[i].style.height = 500 / row + "px";
    BOX_ELEMENT[i].style.fontSize = 60 / (small / 2) + "px";
    BOX_ELEMENT[i].style.lineHeight = 500 / row + "px";
  }
}
//사용자가 클릭한 숫자를 userAnswer배열에 넣는 메서드
function getTryingAnswer(i) {
  userAnswer.push(boxValue[i]);
  var li = document.getElementById("collection");
  var resultText = document.getElementById("resultText");
  //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 answer와 입력한 값을 비교함
  //만일 사용자가 틀린 답을 입력할때,
  if (num.answer[answerIndex] !== userAnswer[answerIndex]) {
    document.getElementById("result").style.right = 0 + "px";
    alert("진실의 방으로");
    resultSrc = "./src/assets/img/punch.png";
    resultMessage = "한 판 더 하실?";
    //변수 초기화
    userAnswer = [];
    answerIndex = 0;
    li.innerText = "";
    //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감
  } else {
    var text = [...userAnswer];
    li.innerText = text;
    tryAnswer(answerIndex);
  }
  //userAnswer와 answer의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!
  if (
    num.answer[num.answer.length] === userAnswer[userAnswer.length] &&
    userAnswer.length === num.answer.length
  ) {
    document.getElementById("result").style.right = 0 + "px";
    resultSrc = "./src/assets/img/thumbsUp.png";
    resultMessage = "잇츠 굿~~~";
    //변수 초기화
    userAnswer = [];
    answerIndex = 0;
    li.innerText = "";
  }
  document.getElementsByTagName("img")[0].setAttribute("src", `${resultSrc}`);
  resultText.innerText = resultMessage;
}
const tryAnswer = function (c) {
  answerIndex = c;
  function updateCloser() {
    answerIndex++;
  }
  return updateCloser();
};

/**answer */
function setArrow() {
  if (isAnswer === true) {
    document.getElementById("answerInner").innerText = `>`;
    isAnswer = false;
  } else {
    document.getElementById("answerInner").innerText = `<`;
    isAnswer = true;
  }
}
function showAnswer() {
  document.getElementById("popUpWrap").style.right = 0 + "px";
  isAnswer === false;
  setArrow();
  isAnswer === true;
}
function closePopup(flag) {
  document.getElementById("result").style.right = -2999 + "px";
  if (flag === "pop" && isClosePop === true) {
    document.getElementById("popUpWrap").style.right = -2999 + "px";
  }
}

function retry() {
  num = { answer: [], question: [] };
  rowNCol = [];
  boxValue = [];
  userAnswer = [];
  answerIndex = 0;
  isClosePop = false;
  isAnswer = false;
  setShowingAnswer = { answerOrder: [], boxValueOrder: [] };
  resultSrc = "";
  resultMessage = "";
  errorMessage = "";
  let isRow = false;
  let isCol = false;
  let passRowNCol = [isRow, isCol];
  //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
  document.getElementById("popUpWrap").style.right = "0";
  document.getElementById("textPop").innerText =
    "상자의 열과 행을 입력해주세요";
  showNhideArea("setNumArea", "block");
  showNhideArea("answerView", "none");
  showNhideArea("collect", "none");
  showNhideArea("submitPop", "block");
  document.getElementById("box").innerHTML = "";
  let number = document.querySelectorAll(".setNum");
  number[0].value = "";
  number[1].value = "";
}

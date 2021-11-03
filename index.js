//row 와 col은 createNumberBox나 checkNum 등 많은 곳엣 사용
//행
let row = null;
//열
let col = null;
//정답이 포함된 숫자들이 있는 전역변수
//정답의 숫자들을 하나하나를 배열로 담음
let num = { answer: [], question: [] };
//상황에 따라 팝업을 닫고 열어주는 전역변수
//팝업을 닫아줄 변수
let isClosePop = false;
//각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작
//0번째는 row의 pass 조건, 1번째는 col의 pass 조건
let passRowNCol = [false, false];
//자주 쓰는 클래스네임
let BOX_ELEMENT = document.getElementsByClassName("boxElement");

//style 관련 메서드
function changeText(area, text, i) {
  if (!i) {
    i = 0;
  }
  const dou = document.getElementById(area)
    ? document.getElementById(area)
    : document.getElementsByClassName(area)[i];
    console.log(dou,text)
  dou.innerText = text;
}
function showNhideArea(area, flag) {
  const dou = document.getElementById(area)
    ? document.getElementById(area)
    : document.getElementsByClassName(area)[0];
  dou.style.display = flag;
}
function inNOutArea(area, value) {
  const dou = document.getElementById(area)
    ? document.getElementById(area)
    : document.getElementsByClassName(area)[0];
  dou.style.right = value + "px";
}

function setColor(area, i) {
  document.getElementById(area).children[i].style.color = "blue";
  document.getElementById(area).children[i].style.fontSize = "60px";
}
//랜던 함수를 추출하는 메서드
const setRandomNum = function (count, option, limit) {
  let num = [];
  while (true) {
    //중복 허용되고 리미트(값의 최대값)이 없을때
    if (!option.duplication && !limit) {
      let randomNum = Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        randomNum = Math.floor(Math.random() * 10);
        num.push(randomNum);
      }
      break;
      //중복 허용되고 리미트 값 없을때
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
      //중복 허용되고 리미트 값 있을때
    } else if (option.duplication && limit) {
      let randomNum = Math.floor(Math.random() * 100) % limit;
      if (num.length < count) {
        if (num.includes(randomNum % limit)) {
          continue;
        } else if (!num.includes(randomNum % limit)) {
          num.push(randomNum % limit);
        }
      } else {
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
  // rowNCol.push(row);
  // rowNCol.push(col);
  let answerLength;
  //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!
  row > col ? (answerLength = row) : (answerLength = col);
  //랜덤숫자메서드를 중복가능하게 num.question을 만듬
  num.question = setRandomNum(row * col, { duplication: false });
  //앞에 num.question 의 숫자들이 num.answer
  num.answer = num.question.slice(0, answerLength);
  //중복을 허용하고 리미트를 둔 랜덤메서드를 구현하여 박스에 들어갈 값이 있는 boxValue에 들어갈 공간의 값을 설정
  let indexForStore = setRandomNum(row * col, { duplication: true }, row * col);
  /**순차적으로 글씨가 칠해지는 기능을 위한 작업/ answerOrder에는 박스에 넣은 값의 공간값을 저장!,
   boxValueOrder은 해당 답변이 몇번째 박스에 있는지 저장
   이때 치명적 문제가 있는데, num.aswer의 배열을 공간값 랜덤으로 상자에 넣었기 때문에 정답이 순서대로 보여지지 않음!
   ex)[3,1,2,0] (answer.order) [7,1,9,5] 처음으로 들어간건 3번째 정답의 값이 7번째 상자에 들어갔다는 의미,,
   맨처음에 보여질 정답은 3번째의 정답 값임으로 순서대로 정답을 입력해야하는 이 게임에 적합하지 않음
   아래에 수정사항이 나옴,, 좀 복잡하게 푼 감도,,,
  */

  //num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열
  let boxValue = [];
  //비동기를 통해 답이 몇번째 상자에 들어갔는지 확인해주는 객체변수
  let setShowingAnswer = { answerOrder: [], boxValueOrder: [] };
  for (let ii = 0; ii < row * col; ii++) {
    if (indexForStore[ii] < num.answer.length) {
      setShowingAnswer.boxValueOrder.push(ii);
      setShowingAnswer.answerOrder.push(indexForStore[ii]);
    }
    //boxValue에 있는 값이 순서대로 박스에 들어감, boxValue에 들어가는 num.question의 순서는 indexForStore를 이용
    boxValue.push(num.question[indexForStore[ii]]);
  }
  //이 메서드는 함수의 역할은 공간값을 저장하는 배열의 각 값의 index를 순서대로 정리해주는 메서드
  //위에 [3,1,2,0]의 공간값 저장배열이라면 [3(0이 3번째),1(1이 1번째),2(2가 2번째),0(3이 0번째)]
  //이 메서드를 통해 answerOrder를 정리
  returnIndex(setShowingAnswer.answerOrder);
  createNumberBox(boxValue);
  setArrow();
  changeText("textPop", "정답은???");
  changeText("answerText", `${num.answer}`);
  showNhideArea("submitPop", "none");
  showNhideArea("answerView", "block");
  showNhideArea("setNumArea", "none");
  showNhideArea("collect", "block");
  await closeAnswer();
  //이 후 answerOrder을 정리하는 함수의 리턴 값을 이용해 seTime함수를 실행
  for (let i in setShowingAnswer.answerOrder) {
    await asyncSetColor(
      setShowingAnswer.boxValueOrder[
        returnIndex(setShowingAnswer.answerOrder)[i]
      ]
    );
  }
}
function closeAnswer() {
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
  array.forEach ((value,index)=>{
    for (let v in array) {
      if (array[v] === index) {
        newA.push(v);
      }
    }
  })
  return newA;
}

function asyncSetColor(i) {
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

//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음
function checkNum(index) {
  //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
  let errorMessage = "";
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
  // rowNCol[index] = number[index].value;
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
function createNumberBox(array) {
  let li = document.getElementById("box").getElementsByTagName("li");
  for (var i = 0; i < array.length; i++) {
    let element = `<li class='boxElement'>${array[i]}</li>`;
    if (BOX_ELEMENT.length <= 0) {
      document.getElementById("box").innerHTML = element;
    } else {
      var e = document.createElement("li");
      var t = document.createTextNode(`${array[i]}`);
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
    BOX_ELEMENT[i].style.fontSize = "1em";
    BOX_ELEMENT[i].style.lineHeight = 500 / row + "px";
  }
}
const getTryingAnswer = (function () {
  //사용자가 몇 번 클릭했는지 세어주며, 이 변수로 userAnswer와 answer의 값을 비교 예정
  let answerIndex = 0;
  let userAnswer = [];
  //사용자가 클릭한 숫자를 userAnswer배열에 넣는 메서드
  return function innerGetTryingAnswer(i) {
    console.log(answerIndex);
    //결과 img경로
    let resultSrc = "";
    //결과 message
    let resultMessage = "";
    userAnswer.push(event.target.innerText);
    var li = document.getElementById("collection");
    var resultText = document.getElementById("resultText");
    //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 answer와 입력한 값을 비교함
    //만일 사용자가 틀린 답을 입력할때,
    if (num.answer[answerIndex] != userAnswer[answerIndex]) {
      inNOutArea("result", 0);
      alert("진실의 방으로");
      resultSrc = "./src/assets/img/punch.png";
      resultMessage = "한 판 더 하실?";
      //변수 초기화
      userAnswer = [];
      answerIndex = 0;
      li.innerText = "";
      //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감
      //userAnswer와 answer의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!
    } else if (
      num.answer[num.answer.length - 1] == userAnswer[userAnswer.length - 1] &&
      userAnswer.length === num.answer.length
    ) {
      console.log(num.answer, userAnswer);
      inNOutArea("result", 0);
      resultSrc = "./src/assets/img/thumbsUp.png";
      resultMessage = "잇츠 굿~~~";
      //변수 초기화
      userAnswer = [];
      answerIndex = 0;
      li.innerText = "";
    } else {
      var text = [...userAnswer];
      li.innerText = text;
      answerIndex++;
    }
    document.getElementsByTagName("img")[0].setAttribute("src", `${resultSrc}`);
    resultText.innerText = resultMessage;
  };
})();
/**answer */
function setArrow(){
  (function(){
//클릭시 화살표 모양 바뀌는 flag
let isAnswer = false;
  if (isAnswer === true) {
    changeText("answerInner", `>`);
    isAnswer = false;
  } else {
    changeText("answerInner", `<`);
    isAnswer = true;
  }
})()
};
function closePopup(flag) {
  inNOutArea("result", -2999);
  if (flag === "pop" && isClosePop === true) {
    inNOutArea("popUpWrap", -2999);
  }
}
function retry() {
  num = { answer: [], question: [] };
  // rowNCol = [];
  // boxValue = [];
  isClosePop = false;
  isAnswer = false;
  //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
  inNOutArea("popUpWrap", 0);
  changeText("textPop", "상자의 열과 행을 입력해주세요");
  showNhideArea("setNumArea", "block");
  showNhideArea("answerView", "none");
  showNhideArea("collect", "none");
  showNhideArea("submitPop", "block");
  document.getElementById("box").innerHTML = "";
  let number = document.querySelectorAll(".setNum");
  number[0].value = "";
  number[1].value = "";
}

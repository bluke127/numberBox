let boxRowNCol = [];
let row=null;
let col=null;
let num = { ans: "", ques: [] };
let storeNum=[]

//추후에 다시 num을 셋팅할때 쓰기 위해 마크업했을 당시 만들었던 input
let insertNum =
  "<input class='setNum' type='text' value='' onkeyup='checkNum(0)'> X <input class='setNum' type='text' value='' onkeyup='checkNum(1)'>";

window.onload = function setNumber() {
  document.getElementById("textPop").innerText =
    "상자의 열과 행을 입력해주세요";
};

function submit() {
  //아래는 첨에 작성한 코드로 이 코드들을 keyup 메서드에 넣고 코드 수를 줄이기 위해 0,1파라미터를 통해 checkNum메서드로 업그레이드?? 함
  //   var numberRow = document.querySelectorAll(".setNum")[0].value;
  //   var numberCol = document.querySelectorAll(".setNum")[1].value;
  //   const boxRowNCol = [numberRow, numberCol];
  //   this.numberRow = numberRow;
  //   this.numberCol = numberCol;
  //   this.boxRowNCol = boxRowNCol;
  document.getElementById("textPop").innerText = "정답은???";
  //상자의 가로 세로 갯수
  row=boxRowNCol[0];
  col=boxRowNCol[1];
  let answerLength;
  //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!
  if (boxRowNCol[0] > boxRowNCol[1]) {
    answerLength = boxRowNCol[0];
  } else {
    answerLength = boxRowNCol[1];
  }
  
  var answer = Math.random();
  //최대한 큰수가 9이기 떄문에 랜덤 숫자에 1+'0'이 9개인 값을 곱해준다.0도 나와야하기에 ceil로 안하고 반올림메서드 round
  for (var i = 0; i < answerLength; i++) {
    answer = answer * 10;
  }
  //반면 상자에 들어갈 갯수는 정답을 포함해서 다른 숫자들이 들어가야함! randomNumber의 뒤에 숫자들을 응용함, .을 제외하고 row와 col의 갯수만큼 
  //num.ques 숫자(배열의 인자들)을 바탕으로 박스의 number를 설정
  console.log(num,row,col,row*col,mapAns,answer,"우왕")
  var mapAns=answer.toString(10).replace(".","")
  num.ques.push(...mapAns);
  answer = Math.ceil(answer);
  num.ans = answer;
  createNumberBox();
  document.getElementById("popUpWrap").style.display = "none";
  document.getElementById("inputPop").innerHTML=`<span clas='answer'>${answer}</span>`
  //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!
}

//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 및 좀 더 메서드의 갯수를 줄일 수 있어 keyup 에 넣음
function checkNum(index) {
  var number = document.querySelectorAll(".setNum");
  //정규식 test를 거치고 return 함을 value로 받앚ㅁ
  number[index].value = regexNumber(number[index].value);
  boxRowNCol[index] = number[index].value;
  //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 팝업 종료;
  if (event.keyCode === 13) {
    if (index === 0) {
      number[1].focus();
    } else {
      submit();
      //   document.getElementById("popUpWrap").style.display = "none";
    }
  }
}
//숫자만 받는 메서드
function regexNumber(value) {
  var regex = /[0-9]/g;
  var flag = regex.test(value);
  if (!flag) {
    alert("숫자만 입력하세요");
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else if (value > 10) {
    alert("9이하의 숫자만 입력하세요");
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else {
    //숫자면 value를 그대로 리턴
    return value;
  }
}

//element를 생성하는 메서드
function createNumberBox(){
  
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
let storeLength=num.ques.filter(element=>null===element).length;
console.log(num,"정담")

// for(var i=0; i<row*col){return false}
//   console.log("emfdjdha?")
  
//   let randomN=createRandomNum();
//   if(randomN>num.ques.length){randomN=randomN % num.ques.length}
  
//   if(num.ques[randomN]!==null){
//     storeNum.push(num.ques[randomN])
//     num.ques[randomN]=null;
//     randomN=createRandomNum() % num.ques.length;
//     console.log(randomN,"다옹")
//   } else{
//     continue;
//   }
//   storeLength++;
//   console.log(storeLength,num.ques.length,"길이")
// }
    console.log(storeNum,storeLength,num.ques,"스토어");
    let bigger
    let randomIndex=createRandomNum()
    if(row>=col){bigger=row}else{bigger=col}
    var i=0;
    console.log("되는거냐>",num)
  while(i<bigger){
    if(randomIndex<=bigger && num.ques[randomIndex]!==null){storeNum.push(num.ques[randomIndex]); num.ques[randomIndex]=null; i++;}
    randomIndex=createRandomNum()
    console.log(storeNum,"되는거냐",num)
  }
};

function createRandomNum(){return Math.ceil(Math.random()*100)};

function insertRandomNum(randomNum){
  console.log(document.getElementById("box"),randomNum,num)
    let element=`<li class='boxElement'>${num.ques[randomNum]}</li>`;
    if(document.getElementsByClassName('boxElement').length<=0){
      document.getElementById("box").innerHTML=element
  }else{
    document.getElementById("box").appendChild=element;
  }
  console.log(num.ques,"맞니")
  num.ques[randomNum]=null;
}
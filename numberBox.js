let boxRowNCol = [];
let row=null;
let col=null;
let num = { ans: [], ques: [] };
let storeNum=[];
let tryAnswer=[];
let isClosure=0;
let answerFlag=false;
let resultSrc="";
let resultMessage="";
let submitFlag=[false,false];
let errorMessage="";

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
  const isTrue=((value)=>value===true)
  console.log(submitFlag.every(isTrue))
  if(submitFlag.every(isTrue) !== true){alert("입력값을 확인해주세요"); return ;}
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
  answer = Math.floor(answer).toString(10);
  for(var i=0; i<answer.length; i++){
    num.ans.push(answer.substring(i,i+1))
  }
  console.log(num,"변절전")
  createNumberBox();
  document.getElementById("popUpWrap").style.right = -3999+"px";
  document.getElementById("inputPop").innerHTML=`<span clas='answerText'>${answer}</span>`
  document.getElementById("collect").style.display="block"
  arrowFlag();
  //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!
}

//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 및 좀 더 메서드의 갯수를 줄일 수 있어 keyup 에 넣음
function checkNum(index) {
  var number = document.querySelectorAll(".setNum");
  number[index].value = regexNumber(number[index].value);
  //정규식 test를 거치고 return 함을 value로 받앚ㅁ
  if(number[index].value===""){alert(errorMessage); submitFlag[index]=false; return}
  boxRowNCol[index] = number[index].value;
  submitFlag[index]=true;
  console.log(submitFlag,"섬미트플레그")
  //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 팝업 종료;
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
  if(!value){errorMessage="숫자를 입력해주세요"; return "";}
  var flag = regex.test(value);
  if (!flag) {
    errorMessage="숫자만 입력하세요";
    //만일 숫자가 아니라면 공백을 리턴,,
    return "";
  } else if (value.length > 1) {
    errorMessage="9이하의 숫자만 입력하세요";
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
let bigger
// let randomIndex=createRandomNum()
if(row>=col){bigger=row}else{bigger=col}
var i=0;
if(num.ques.length >= row*col){num.ques.splice(row*col); console.log('splice',num.ques,row*col)}
while(num.ques.length<row*col){
  num.ques.push((Math.floor(Math.random()*10)).toString(10))
  }
  console.log(num,bigger,"축배")
  insertRandomNum();
};

function shuffle (a) {
  var i=0;
  var quesCopy=[...a]
  while(storeNum.length<quesCopy.length){
    var x = parseInt(Math.random()*quesCopy.length);
    if(quesCopy[x]!==null){
      storeNum[i]=quesCopy[x];
      quesCopy[x]=null;
      i++;
    }else{var x = parseInt(Math.random()*quesCopy.length);}
    console.log(x,i,'xI')
  }
}


function insertRandomNum(){
  var li=document.getElementById("box").getElementsByTagName('li')
  console.log(document.getElementById("box"),"월요일")
    shuffle(num.ques);
    for(var i=0; i<storeNum.length; i++){
    let element=`<li class='boxElement'>${storeNum[i]}</li>`;
        if(document.getElementsByClassName('boxElement').length<=0){
          document.getElementById("box").innerHTML=element
      }else{
        var e=document.createElement('li');
        var t=document.createTextNode(`${storeNum[i]}`);
        e.appendChild(t)
        document.getElementById("box").appendChild(e);
      }
      document.getElementById("box").getElementsByTagName('li')[i].setAttribute("class","boxElement");
      document.getElementById("box").getElementsByTagName('li')[i].setAttribute("onclick",`getTryAnswer(${i})`);
    }
    for(var i=0; i<li.length; i++){
      document.getElementsByClassName('boxElement')[i].style.width= 500/row +'px'
      document.getElementsByClassName('boxElement')[i].style.height= 500/col +'px'
      document.getElementsByClassName('boxElement')[i].style.lineHeight= 500/col +'px'
      
    }
  }
  function getTryAnswer(i){
  tryAnswer.push(storeNum[i]);
  var li=document.getElementById("collection");
  var resultText=document.getElementById("resultText");
  console.log(storeNum, i , num.ans,num.ques,tryAnswer,...tryAnswer,isClosure,"시작은?");
  if(num.ans[isClosure] !== tryAnswer[isClosure]){
  document.getElementById("result").style.right =0+"px";
  alert("진실의 방으로"); tryAnswer=[]; isClosure=0; li.innerText=""; 
    resultSrc="punch.png";
  resultMessage="한 판 더 하실?";
  }else{
    var text=[...tryAnswer]
    li.innerText=text;
    setTryAnswer()
  }
  if(num.ans[num.ans.length]=== tryAnswer[tryAnswer.length] && tryAnswer.length===num.ans.length){
    document.getElementById("result").style.right =0+"px";
    resultSrc="thumbsUp.png";
    resultMessage="잇츠 굿~~~";
  }
  console.log(document.getElementsByTagName("img")[0],"L아마자")
    document.getElementsByTagName("img")[0].setAttribute("src",`img/${resultSrc}`)
    resultText.innerText=resultMessage
    console.log(storeNum, i , num.ans,num.ques,tryAnswer,isClosure,"시작은???");
    }
  var setTryAnswer=function (i){
    var i=i;
    console.log(storeNum, i , num.ans,num.ques,tryAnswer,isClosure,"시작");
    function updateCloser(){ isClosure++ }
    return updateCloser()
  }


/**answer */
function arrowFlag(){
  if(answerFlag===true){
  document.getElementById("answerInner").innerText=`>`
  answerFlag=false;
  }else{
  document.getElementById("answerInner").innerText=`<`
  answerFlag=true;}
}
function showAnswer(){
  document.getElementById("popUpWrap").style.right =0+"px";
}
function closeM(){
  document.getElementById("result").style.right =-2999+"px";
}

function retry(){
  
}
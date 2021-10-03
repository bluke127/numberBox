
import data from "./store/store.js"
//자주 쓰는 클래스네임
let BOX_ELEMENT = document.getElementsByClassName("boxElement")
//추후에 다시 g_num을 셋팅할때 쓰기 위해 마크업했을 당시 만들었던 input
let insertInput =
  "<input class='setNum' type='text' value='' onkeyup='checkNum(0)' autofocus/> X <input class='setNum' type='text' value='' onkeyup='checkNum(1)'/>"

//엔터와 클릭으로 실행할 수 있다
window.onload=(()=>{console.log(checkNum())})()
async function submit() { 
    g_num = {
        ans: [], ques: [] 
    }
    g_storeNum = []
    g_tryAnswer = []
    document.getElementById("submitPop").style.display = "none"
    // document.getElementById("textPop").style.display = "block";
    //배열이 모두 true인 확인
    const isTrue = (value) => value === true
    if (isSubmit.every(isTrue) !== true) {
        alert("입력값을 확인해주세요")
        return
    }
    //입력하고 바뀌는 text
    document.getElementById("textPop").innerText = "정답은???"
    //상자의 가로 세로 갯수
    data.row = data.rowNCol[0]
    data.col = data.rowNCol[1]
    let answerLength
    //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!
    if (data.rowNCol[0] > data.rowNCol[1]) {
        answerLength = data.rowNCol[0]
    } else {
        answerLength = data.rowNCol[1]
    }
    //숫자 생성 시작
    var mapAns = Math.random() * 10
    //반면 상자에 들어갈 갯수는 정답을 포함해서 다른 숫자들이 들어가야함! randomNumber의 뒤에 숫자들을 응용함, .을 제외하고 data.row와 data.col의 갯수만큼
    //question 숫자(배열의 인자들)을 바탕으로 박스의 NUMber를 설정
    mapAns = mapAns.toString(10).replace(".", "")
    question.push(...mapAns)
    for (var i = 0; i < answerLength; i++) {
        answer.push(mapAns.substring(i, i + 1))
    }
    createNumberBox()
    //팝업창 제거
    isClosePop = true
    /** 안되는 부분 ( 닫게 만들어주는 메서드와 함께 문제가 있는 setTime이란 메서드를 붙임 setTime은 정답의 숫자글씨를 파란색으로 보여줌(setForBlue),이후 returnOrigin을 통해 검은 색의 글씨로 바꿔줌  ) */
    await asyncMethod()
    await returnOrigin()
    /** ########### */
    //정답 보여주기

    var answerView = `${answer}`
    answerView = answerView.replaceAll(",", " ")
    document.getElementById(
        "inputPop"
    ).innerHTML = `<span class='answerText'>${answerView}</span>`
    document.getElementById("collect").style.display = "block"
    //화살표 바꿔주는
    setArrow()
    // }
    //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!
}
/** 안되는 부분 ( 닫게 만들어주는 메서드와 함께 문제가 있는 setTime이란 메서드를 붙임 setTime은 정답의 숫자글씨를 파란색으로 보여줌(setForBlue),이후 returnOrigin을 통해 검은 색의 글씨로 바꿔줌  ) */
function asyncMethod() {
    setTimeout(() => {
        closePopup("pop")
        setTime()
    }, 2000)
}
//setimeout 질문사항
function setTime() {
    var setForBlue = function () {
        for (var i = 0; i < g_setTimeIndex.length; i++) {
            setBlue(g_setTimeIndex[i])
        }
    }
    return setForBlue()
}
function returnOrigin(i) {
    console.log(i)
    var a = function () {
        for (var i = 0; i < g_setTimeIndex.length; i++) {
            BOX_ELEMENT[i].style.color = "#000"
        }
        console.log(BOX_ELEMENT[i], "수행")
    }
    //리턴한건 처음에 then을 썻는데 거기에 프라미스 결과값이 없어서 안나오나 해서 retunr값을 붙여봄
    return a()
}
var setBlue = function (num) {
    var setInnerBlue = function () {
        BOX_ELEMENT[num].style.color = "blue"
    }
    var setInnerBlueResult = setTimeout(() => {
        setInnerBlue(num)
    }, 1000 * num)
    return setInnerBlueResult
}
//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음
function checkNum(index) {
    var number = document.querySelectorAll(".setNum")
    //백스페이스와 새로고침 누를 때는 이 메서드 실행하지 말아주세요
    if (event.keyCode == 116 || event.keyCode === 8) {
        return false
    }
    number[index].value = regexNumber(number[index].value)

    //정규식 test를 거치고 return 한 값을 value로 받음
    if (number[index].value === "") {
        alert(errorMessage)
        isSubmit[index] = false
        return
    }
    //입력한 값을 data.rowNCol에
    data.rowNCol[index] = number[index].value
    //박스 게임 생성 배열 true
    isSubmit[index] = true
    //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 submit으로;
    if (event.keyCode === 13) {
        if (index === 0) {
            number[1].focus()
        } else {
            submit()
        }
    }
}
//숫자만 받는 메서드
function regexNumber(value) {
    var regex = /^[0-9]/g
    if (!value) {
        errorMessage = "숫자를 입력해주세요"
        return ""
    }
    var flag = regex.test(value)
    if (!flag) {
        errorMessage = "숫자만 입력하세요"
        //만일 숫자가 아니라면 공백을 리턴,,
        return ""
    } else if (value.length > 1) {
        errorMessage = "9이하의 숫자만 입력하세요"
        //만일 숫자가 아니라면 공백을 리턴,,
        return ""
    } else {
    //숫자면 value를 그대로 리턴
        return value
    }
}

//element를 생성하는 메서드
function createNumberBox() {
    if (data.row >= data.col) {
        data.bigger = data.row
        data.small = data.col
    } else {
        data.bigger = data.col
        data.small = data.row
    }
    if (question.length >= data.row * data.col) {
        question.splice(data.row * data.col)
    }
    while (question.length < data.row * data.col) {
        question.push(Math.floor(Math.random() * 10).toString(10))
    }
    insertRandomNum()
}
//랜덤으로 question을 STORE_g_num에 배치,, 이후 g_storeNum에서 공간값 순서로 숫자li에 배치
//메서드 진행은 NUM.ques의 복제 배열이 모두 null되면 끝남
function shuffleNum(a) {
    var i = 0
    //a에 question을 넣고 복제,, 기존 배열이 망가지면 안된다고 판단
    var quesCopy = [...a]
    while (g_storeNum.length < quesCopy.length) {
        var x = parseInt(Math.random() * quesCopy.length)
        if (quesCopy[x] !== null) {
            g_storeNum[i] = quesCopy[x]
            quesCopy[x] = null
            //setTimeout용
            if (x < answer.length) {
                g_setTimeIndex[x] = i
            }
            i++
        }
        //한번 quesCopy[x]값이 이미 나온적이 있어서 null 되어있을땐 한번더 랜덤으로!
        else {
            var x = parseInt(Math.random() * quesCopy.length)
        }
    }
}
//상자 생성
function insertRandomNum() {
    var li = document.getElementById("box").getElementsByTagName("li")
    shuffleNum(question)
    for (var i = 0; i < g_storeNum.length; i++) {
        let element = `<li class='boxElement'>${g_storeNum[i]}</li>`
        if (BOX_ELEMENT.length <= 0) {
            document.getElementById("box").innerHTML = element
        } else {
            var e = document.createElement("li")
            var t = document.createTextNode(`${g_storeNum[i]}`)
            e.appendChild(t)
            document.getElementById("box").appendChild(e)
        }
        document
            .getElementById("box")
            .getElementsByTagName("li")
            [i].setAttribute("class", "boxElement")
        document
            .getElementById("box")
            .getElementsByTagName("li")
            [i].setAttribute("onclick", `getTryingAnswer(${i})`)
    }

    for (var i = 0; i < li.length; i++) {
        BOX_ELEMENT[i].style.width = 500 / data.row + "px"
        BOX_ELEMENT[i].style.height = 500 / data.row + "px"
        BOX_ELEMENT[i].style.fontSize = 60 / (data.small / 2) + "px"
        BOX_ELEMENT[i].style.lineHeight = 500 / data.row + "px"
    }
}
//사용자가 클릭한 숫자를 g_tryAnswer배열에 넣는 메서드
function getTryingAnswer(i) {
    g_tryAnswer.push(g_storeNum[i])
    var li = document.getElementById("collection")
    var resultText = document.getElementById("resultText")
    //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 ans와 입력한 값을 비교함
    //만일 사용자가 틀린 답을 입력할때,
    if (answer[isAnsIndex] !== g_tryAnswer[isAnsIndex]) {
        document.getElementById("result").style.right = 0 + "px"
        alert("진실의 방으로")
        resultSrc = "punch.png"
        resultMessage = "한 판 더 하실?"
        //변수 초기화
        g_tryAnswer = []
        isAnsIndex = 0
        li.innerText = ""
    //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감
    } else {
        var text = [...g_tryAnswer]
        li.innerText = text
        tryAnswer(isAnsIndex)
    }
    //g_tryAnswer와 ans의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!
    if (
        answer[answer.length] === g_tryAnswer[g_tryAnswer.length] &&
    g_tryAnswer.length === answer.length
    ) {
        document.getElementById("result").style.right = 0 + "px"
        resultSrc = "thumbsUp.png"
        resultMessage = "잇츠 굿~~~"
        //변수 초기화
        g_tryAnswer = []
        isAnsIndex = 0
        li.innerText = ""
    }
    document
        .getElementsByTagName("img")[0]
        .setAttribute("src", `img/${resultSrc}`)
    resultText.innerText = resultMessage
}
var tryAnswer = function (c) {
    isAnsIndex = c
    function updateCloser() {
        isAnsIndex++
    }
    return updateCloser()
}

/**answer */
function setArrow() {
    if (isAnswer === true) {
        document.getElementById("answerInner").innerText = `>`
        isAnswer = false
    } else {
        document.getElementById("answerInner").innerText = `<`
        isAnswer = true
    }
}
function showAnswer() {
    document.getElementById("popUpWrap").style.right = 0 + "px"
    isAnswer === false
    setArrow()
    isAnswer === true
}
function closePopup(flag) {
    document.getElementById("result").style.right = -2999 + "px"
    if (flag === "pop" && isClosePop === true) {
        document.getElementById("popUpWrap").style.right = -2999 + "px"
    }
}

function retry() {
    data.rowNCol = answer = question = g_storeNum = g_tryAnswer = []
    isAnsIndex = 0
    isClosePop = false
    isAnswer = false
    resultSrc = resultMessage = errorMessage = ""
    isSubmit = [false, false]
    //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
    document.getElementById("popUpWrap").style.right = "0"
    document.getElementById("textPop").innerText =
    "상자의 열과 행을 입력해주세요"
    document.getElementById("inputPop").innerHTML = insertInput
    document.getElementById("box").innerHTML = ""
    document.getElementById("submitPop").style.display = "block"
    document.getElementById("collect").style.display = "none"
}
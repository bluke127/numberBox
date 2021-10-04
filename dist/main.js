/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store/store.js */ \"./store/store.js\");\n\n\n\n//자주 쓰는 클래스네임\nlet BOX_ELEMENT = document.getElementsByClassName(\"boxElement\")\n//추후에 다시 g_num을 셋팅할때 쓰기 위해 마크업했을 당시 만들었던 input\nlet insertInput =\n  \"<input class='setNum' type='text' value='' onkeyup='checkNum(0)' autofocus/> X <input class='setNum' type='text' value='' onkeyup='checkNum(1)'/>\"\n\n//엔터와 클릭으로 실행할 수 있다\nwindow.onload=(()=>{console.log(_store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])})()\nasync function submit() { \n    g_num = {\n        ans: [], ques: [] \n    }\n    g_storeNum = []\n    g_tryAnswer = []\n    document.getElementById(\"submitPop\").style.display = \"none\"\n    // document.getElementById(\"textPop\").style.display = \"block\";\n    //배열이 모두 true인 확인\n    const isTrue = (value) => value === true\n    if (isSubmit.every(isTrue) !== true) {\n        alert(\"입력값을 확인해주세요\")\n        return\n    }\n    //입력하고 바뀌는 text\n    document.getElementById(\"textPop\").innerText = \"정답은???\"\n    //상자의 가로 세로 갯수\n    _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[0]\n    _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[1]\n    let answerLength\n    //큰 숫자 만큼 정답의 숫자 갯수가 정해짐!\n    if (_store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[0] > _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[1]) {\n        answerLength = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[0]\n    } else {\n        answerLength = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[1]\n    }\n    //숫자 생성 시작\n    var mapAns = Math.random() * 10\n    //반면 상자에 들어갈 갯수는 정답을 포함해서 다른 숫자들이 들어가야함! randomNumber의 뒤에 숫자들을 응용함, .을 제외하고 data.row와 data.col의 갯수만큼\n    //question 숫자(배열의 인자들)을 바탕으로 박스의 NUMber를 설정\n    mapAns = mapAns.toString(10).replace(\".\", \"\")\n    question.push(...mapAns)\n    for (var i = 0; i < answerLength; i++) {\n        answer.push(mapAns.substring(i, i + 1))\n    }\n    createNumberBox()\n    //팝업창 제거\n    isClosePop = true\n    /** 안되는 부분 ( 닫게 만들어주는 메서드와 함께 문제가 있는 setTime이란 메서드를 붙임 setTime은 정답의 숫자글씨를 파란색으로 보여줌(setForBlue),이후 returnOrigin을 통해 검은 색의 글씨로 바꿔줌  ) */\n    await asyncMethod()\n    await returnOrigin()\n    /** ########### */\n    //정답 보여주기\n\n    var answerView = `${answer}`\n    answerView = answerView.replaceAll(\",\", \" \")\n    document.getElementById(\n        \"inputPop\"\n    ).innerHTML = `<span class='answerText'>${answerView}</span>`\n    document.getElementById(\"collect\").style.display = \"block\"\n    //화살표 바꿔주는\n    setArrow()\n    // }\n    //answer의 타입이 숫자기 때문에 숫자하나하나 배열에 들어가지 않기때문에 문자로 바꿔서 넣음!\n}\n/** 안되는 부분 ( 닫게 만들어주는 메서드와 함께 문제가 있는 setTime이란 메서드를 붙임 setTime은 정답의 숫자글씨를 파란색으로 보여줌(setForBlue),이후 returnOrigin을 통해 검은 색의 글씨로 바꿔줌  ) */\nfunction asyncMethod() {\n    setTimeout(() => {\n        closePopup(\"pop\")\n        setTime()\n    }, 2000)\n}\n//setimeout 질문사항\nfunction setTime() {\n    var setForBlue = function () {\n        for (var i = 0; i < g_setTimeIndex.length; i++) {\n            setBlue(g_setTimeIndex[i])\n        }\n    }\n    return setForBlue()\n}\nfunction returnOrigin(i) {\n    console.log(i)\n    var a = function () {\n        for (var i = 0; i < g_setTimeIndex.length; i++) {\n            BOX_ELEMENT[i].style.color = \"#000\"\n        }\n        console.log(BOX_ELEMENT[i], \"수행\")\n    }\n    //리턴한건 처음에 then을 썻는데 거기에 프라미스 결과값이 없어서 안나오나 해서 retunr값을 붙여봄\n    return a()\n}\nvar setBlue = function (num) {\n    var setInnerBlue = function () {\n        BOX_ELEMENT[num].style.color = \"blue\"\n    }\n    var setInnerBlueResult = setTimeout(() => {\n        setInnerBlue(num)\n    }, 1000 * num)\n    return setInnerBlueResult\n}\n//처음에 submit 할때 boxRowCol 입력한 값을 넣게 했으나 정규식 확인을 효율적으로 할 수 있어 keyup 에 넣음\nfunction checkNum(index) {\n    var number = document.querySelectorAll(\".setNum\")\n    //백스페이스와 새로고침 누를 때는 이 메서드 실행하지 말아주세요\n    if (event.keyCode == 116 || event.keyCode === 8) {\n        return false\n    }\n    number[index].value = regexNumber(number[index].value)\n\n    //정규식 test를 거치고 return 한 값을 value로 받음\n    if (number[index].value === \"\") {\n        alert(errorMessage)\n        isSubmit[index] = false\n        return\n    }\n    //입력한 값을 data.rowNCol에\n    _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol[index] = number[index].value\n    //박스 게임 생성 배열 true\n    isSubmit[index] = true\n    //엔터 칠때 구현 메서드 첫번째 인풋일땐 두번째 인풋으로 이동, 두번째 인풋일땐 submit으로;\n    if (event.keyCode === 13) {\n        if (index === 0) {\n            number[1].focus()\n        } else {\n            submit()\n        }\n    }\n}\n//숫자만 받는 메서드\nfunction regexNumber(value) {\n    var regex = /^[0-9]/g\n    if (!value) {\n        errorMessage = \"숫자를 입력해주세요\"\n        return \"\"\n    }\n    var flag = regex.test(value)\n    if (!flag) {\n        errorMessage = \"숫자만 입력하세요\"\n        //만일 숫자가 아니라면 공백을 리턴,,\n        return \"\"\n    } else if (value.length > 1) {\n        errorMessage = \"9이하의 숫자만 입력하세요\"\n        //만일 숫자가 아니라면 공백을 리턴,,\n        return \"\"\n    } else {\n    //숫자면 value를 그대로 리턴\n        return value\n    }\n}\n\n//element를 생성하는 메서드\nfunction createNumberBox() {\n    if (_store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row >= _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col) {\n        _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bigger = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row\n        _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].small = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col\n    } else {\n        _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bigger = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col\n        _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].small = _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row\n    }\n    if (question.length >= _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row * _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col) {\n        question.splice(_store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row * _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col)\n    }\n    while (question.length < _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row * _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].col) {\n        question.push(Math.floor(Math.random() * 10).toString(10))\n    }\n    insertRandomNum()\n}\n//랜덤으로 question을 STORE_g_num에 배치,, 이후 g_storeNum에서 공간값 순서로 숫자li에 배치\n//메서드 진행은 NUM.ques의 복제 배열이 모두 null되면 끝남\nfunction shuffleNum(a) {\n    var i = 0\n    //a에 question을 넣고 복제,, 기존 배열이 망가지면 안된다고 판단\n    var quesCopy = [...a]\n    while (g_storeNum.length < quesCopy.length) {\n        var x = parseInt(Math.random() * quesCopy.length)\n        if (quesCopy[x] !== null) {\n            g_storeNum[i] = quesCopy[x]\n            quesCopy[x] = null\n            //setTimeout용\n            if (x < answer.length) {\n                g_setTimeIndex[x] = i\n            }\n            i++\n        }\n        //한번 quesCopy[x]값이 이미 나온적이 있어서 null 되어있을땐 한번더 랜덤으로!\n        else {\n            var x = parseInt(Math.random() * quesCopy.length)\n        }\n    }\n}\n//상자 생성\nfunction insertRandomNum() {\n    var li = document.getElementById(\"box\").getElementsByTagName(\"li\")\n    shuffleNum(question)\n    for (var i = 0; i < g_storeNum.length; i++) {\n        let element = `<li class='boxElement'>${g_storeNum[i]}</li>`\n        if (BOX_ELEMENT.length <= 0) {\n            document.getElementById(\"box\").innerHTML = element\n        } else {\n            var e = document.createElement(\"li\")\n            var t = document.createTextNode(`${g_storeNum[i]}`)\n            e.appendChild(t)\n            document.getElementById(\"box\").appendChild(e)\n        }\n        document\n            .getElementById(\"box\")\n            .getElementsByTagName(\"li\")\n            [i].setAttribute(\"class\", \"boxElement\")\n        document\n            .getElementById(\"box\")\n            .getElementsByTagName(\"li\")\n            [i].setAttribute(\"onclick\", `getTryingAnswer(${i})`)\n    }\n\n    for (var i = 0; i < li.length; i++) {\n        BOX_ELEMENT[i].style.width = 500 / _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row + \"px\"\n        BOX_ELEMENT[i].style.height = 500 / _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row + \"px\"\n        BOX_ELEMENT[i].style.fontSize = 60 / (_store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].small / 2) + \"px\"\n        BOX_ELEMENT[i].style.lineHeight = 500 / _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].row + \"px\"\n    }\n}\n//사용자가 클릭한 숫자를 g_tryAnswer배열에 넣는 메서드\nfunction getTryingAnswer(i) {\n    g_tryAnswer.push(g_storeNum[i])\n    var li = document.getElementById(\"collection\")\n    var resultText = document.getElementById(\"resultText\")\n    //클로저변수를 이용해서 클릭할때마다 클로저의 변수는 ++, 이전에 ans와 입력한 값을 비교함\n    //만일 사용자가 틀린 답을 입력할때,\n    if (answer[isAnsIndex] !== g_tryAnswer[isAnsIndex]) {\n        document.getElementById(\"result\").style.right = 0 + \"px\"\n        alert(\"진실의 방으로\")\n        resultSrc = \"punch.png\"\n        resultMessage = \"한 판 더 하실?\"\n        //변수 초기화\n        g_tryAnswer = []\n        isAnsIndex = 0\n        li.innerText = \"\"\n    //맞게 입력하면 closure ++할 메서드 실행! 선택한 숫자에는 입력한 숫자게 계속 들어감\n    } else {\n        var text = [...g_tryAnswer]\n        li.innerText = text\n        tryAnswer(isAnsIndex)\n    }\n    //g_tryAnswer와 ans의 길이가 같고, 마지막 값까지 같다? 그럼 통과가 됨, 한번이라도 틀리면 길이가 틀려지고, 마지막값도 같다면 완벽히 일치!\n    if (\n        answer[answer.length] === g_tryAnswer[g_tryAnswer.length] &&\n    g_tryAnswer.length === answer.length\n    ) {\n        document.getElementById(\"result\").style.right = 0 + \"px\"\n        resultSrc = \"thumbsUp.png\"\n        resultMessage = \"잇츠 굿~~~\"\n        //변수 초기화\n        g_tryAnswer = []\n        isAnsIndex = 0\n        li.innerText = \"\"\n    }\n    document\n        .getElementsByTagName(\"img\")[0]\n        .setAttribute(\"src\", `img/${resultSrc}`)\n    resultText.innerText = resultMessage\n}\nvar tryAnswer = function (c) {\n    isAnsIndex = c\n    function updateCloser() {\n        isAnsIndex++\n    }\n    return updateCloser()\n}\n\n/**answer */\nfunction setArrow() {\n    if (isAnswer === true) {\n        document.getElementById(\"answerInner\").innerText = `>`\n        isAnswer = false\n    } else {\n        document.getElementById(\"answerInner\").innerText = `<`\n        isAnswer = true\n    }\n}\nfunction showAnswer() {\n    document.getElementById(\"popUpWrap\").style.right = 0 + \"px\"\n    isAnswer === false\n    setArrow()\n    isAnswer === true\n}\nfunction closePopup(flag) {\n    document.getElementById(\"result\").style.right = -2999 + \"px\"\n    if (flag === \"pop\" && isClosePop === true) {\n        document.getElementById(\"popUpWrap\").style.right = -2999 + \"px\"\n    }\n}\n\nfunction retry() {\n    _store_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rowNCol = answer = question = g_storeNum = g_tryAnswer = []\n    isAnsIndex = 0\n    isClosePop = false\n    isAnswer = false\n    resultSrc = resultMessage = errorMessage = \"\"\n    isSubmit = [false, false]\n    //에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)\n    document.getElementById(\"popUpWrap\").style.right = \"0\"\n    document.getElementById(\"textPop\").innerText =\n    \"상자의 열과 행을 입력해주세요\"\n    document.getElementById(\"inputPop\").innerHTML = insertInput\n    document.getElementById(\"box\").innerHTML = \"\"\n    document.getElementById(\"submitPop\").style.display = \"block\"\n    document.getElementById(\"collect\").style.display = \"none\"\n}\n\n//# sourceURL=webpack://numberbox/./index.js?");

/***/ }),

/***/ "./store/store.js":
/*!************************!*\
  !*** ./store/store.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst data0 = {\n    // 행과 열의 숫자를 담아줄 배열\n    rowNCol: [],\n    // 행\n    row: null,\n    // 열\n    col: null,\n    // g_row와 g_col 중에 큰 수와 작은 수\n    bigger: '',\n    small: '',\n    // 정답의 숫자들을 하나하나를 배열로 담음\n    answer: [],\n    question: [],\n    // g_num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열\n    g_storeNum: [],\n    // 정답의 배열의 각 숫자가 g_storeNum에 몇 번째 div에 배치되는지!\n    g_setTimeIndex: [],\n    // 사용자가 클릭한 숫자의 배열\n    g_tryAnswer: [],\n    // 사용자가 몇 번 클릭했는지 세어주며, 이 변수로 g_tryAnswer와 ans의 값을 비교 예정\n    isAnsIndex: 0,\n    isClosePop: false,\n    // 클릭시 화살표 모양 바뀌는 flag\n    isAnswer: false,\n    // 결과 img경로\n    resultSrc: '',\n    // 결과 message\n    resultMessage: '',\n    // 각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작\n    isSubmit: [false, false],\n    // 에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)\n    errorMessage: '',\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data0);\n\n\n//# sourceURL=webpack://numberbox/./store/store.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
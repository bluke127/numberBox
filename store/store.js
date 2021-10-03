const data0 = {
    // 행과 열의 숫자를 담아줄 배열
    rowNCol: [],
    // 행
    row: null,
    // 열
    col: null,
    // g_row와 g_col 중에 큰 수와 작은 수
    bigger: '',
    small: '',
    // 정답의 숫자들을 하나하나를 배열로 담음
    answer: [],
    question: [],
    // g_num.ques를 랜덤으로 담아줄, 또 순차적으로 li에 뿌려줄 배열
    g_storeNum: [],
    // 정답의 배열의 각 숫자가 g_storeNum에 몇 번째 div에 배치되는지!
    g_setTimeIndex: [],
    // 사용자가 클릭한 숫자의 배열
    g_tryAnswer: [],
    // 사용자가 몇 번 클릭했는지 세어주며, 이 변수로 g_tryAnswer와 ans의 값을 비교 예정
    isAnsIndex: 0,
    isClosePop: false,
    // 클릭시 화살표 모양 바뀌는 flag
    isAnswer: false,
    // 결과 img경로
    resultSrc: '',
    // 결과 message
    resultMessage: '',
    // 각 값이 모두 true때(입력한 값이 정상적일때) 게임 시작
    isSubmit: [false, false],
    // 에러 메세지를 저장해서, 오류 생기면 alert(errorMessage)
    errorMessage: '',
}
export default data0

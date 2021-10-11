//랜던 함수를 추출하는 메서드
const getRandomNum = function (count, option) {
  let num = [];
  while (true) {
    let randomNum = Math.floor(Math.random() * 10);
    if (!option.duplication) {
      for (let i = 0; i < count; i++) {
        randomNum = Math.floor(Math.random() * 10);
        num.push(randomNum);
      }
      break;
    } else {
      randomNum = Math.floor(Math.random() * 10);
      if (!num.includes(randomNum)) {
        num.push(randomNum);
      } else {
        continue;
      }
      if (num.length === count) {
        break;
      }
    }
  }
  return num;
};

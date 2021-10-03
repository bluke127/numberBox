//객체를 리셋시키는 메서드
const resetObject = function (data) {
  for (var p in data) {
    data[p] = "";
  }

  return data;
};

//배열을 리셋시키는 메서드
const resetArray = function (data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    data[i] = [];
  }
  console.log(data);
  return data;
};

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const reg = urlParams.get('reg');
const gasUrl = "https://script.google.com/macros/s/AKfycbwg4cSSS_RLy_ygQ-Qf3YUtNXVmIDQMJhbCYP7GyzuSrgqW72U7AzZQSfQCTV8JV71xlA/exec";
let p = document.createElement("p");
p.innerText = "読み込み中...";
p.classList.add("element");
document.body.appendChild(p);
fetch('https://api.line.me/oauth2/v2.1/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: "https://fftdareka.github.io/LineLogin/callback/?reg=" + reg,
    client_id: "2006030047",
    client_secret: "41e68957a7180b6101c6fab87039b1ca"
  })
})
.then(response => response.json())
.then(data => {
  let token = data.id_token;
  let tokenData = token.split(".");
  tokenData.shift();
  tokenData.pop();
  tokenData = JSON.parse(decodeURIComponent(escape(atob(tokenData.toString()))));
  let uid = tokenData.sub;
  let uname = tokenData.name;
  let p2 = document.createElement("p");
  p2.innerText = "氏名をフルネームで入力し、設定するボタンを押してください。名前に空白は要りません。";
  p2.classList.add("element");
  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("element");
  let input2 = document.createElement("input");
  input2.type = "submit";
  input2.value = "設定する";
  input2.classList.add("element");
  if (reg == "att") {
    fetch(gasUrl, {
      "method": "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      "body": JSON.stringify({
        "uid": uid,
        "uname": uname,
        "reg": reg
      })
    })
    .then(response => response.text())
    .then(data => {
      let el = document.querySelectorAll(".element");
      el.forEach(ele => {
        ele.remove();
      });
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  } else if (reg == "uid") {
    let el2 = document.querySelectorAll(".element");
      el2.forEach(ele2 => {
        ele2.remove();
      });
    document.body.appendChild(p2);
    document.body.appendChild(input);
    document.body.appendChild(input2);
  }
  input2.addEventListener("click", () => {
    let el3 = document.querySelectorAll(".element");
      el3.forEach(ele3 => {
        ele3.remove();
      });
    let p3 = document.createElement("p");
    p3.innerText = "読み込み中...";
    p3.classList.add("element");
    document.body.appendChild(p3);
    let name = input.value;
    fetch(gasUrl, {
      "method": "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      "body": JSON.stringify({
        "uid": uid,
        "uname": uname,
        "reg": reg,
        "name": name
      })
    })
    .then(response => response.text())
    .then(data => {
      let el4 = document.querySelectorAll(".element");
      el4.forEach(ele4 => {
        ele4.remove();
      });
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  })
})

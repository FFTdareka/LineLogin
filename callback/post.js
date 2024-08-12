const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const reg = urlParams.get('reg');
const gasUrl = "https://script.google.com/macros/s/AKfycbxKAi8riRhgSPNxi556WAJPUlcJmFaFbQRrgCMdzLQg9rT8MgPVtV1bqh9juWwxFJMVeA/exec";
let p = document.createElement("p");
p.innerText = "読み込み中...";
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
  let input = document.createElement("input");
  input.type = "text";
  let input2 = document.createElement("input");
  input2.type = "submit";
  input2.value = "設定する";
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
      document.body.removeChild(body.lastChild);
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  } else if (reg == "uid") {
    document.body.removeChild(document.body.lastChild);
    document.body.appendChild(p2);
    document.body.appendChild(input);
    document.body.appendChild(input2);
  }
  input2.addEventListener("click", () => {
    document.body.removeChild(document.body.lastChild);
    let p3 = document.createElement("p");
    p3.innerText = "読み込み中...";
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
      document.body.removeChild(document.body.lastChild);
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  })
})

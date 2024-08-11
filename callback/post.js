const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const reg = urlParams.get('reg');
const gasUrl = "https://script.google.com/macros/s/AKfycbz-POgnlzSY7ksAJCE89MUWZTvY-otK89wH2rt0ADtQK4rsr403N8RWtCqyIOKZTbxy5Q/exec";
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
  let p = document.createElement("p");
  let input = document.createElement("input");
  input.type = "text";
  let input2 = document.createElement("input");
  input2.type = "submit";
  input2.value = "設定する";
  if (reg == "att") {
    fetch(gasUrl, {
      "method": "POST",
      "mode": "no-cors",
      "Content-Type": "application/x-www-form-urlencoded",
      "body": JSON.stringify({
        "uid": uid,
        "uname": uname,
        "reg": reg
      })
    })
    .then(response => response.text())
    .then(data => {
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  } else if(reg == "uid") {
    document.body.appendChild(p);
    document.body.appendChild(input);
    document.body.appendChild(input2);
  }
  input2.addEventListener("click", () => {
    let name = input.value;
    fetch(gasUrl, {
      "method": "POST",
      "mode": "no-cors",
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
      let h1 = document.createElement("h1");
      h1.innerText = data;
      document.body.appendChild(h1);
    })
  })
})

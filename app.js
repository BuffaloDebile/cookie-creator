const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejafait = false;

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
// console.log(nextWeek);
let day = ('0' + nextWeek).slice(9, 11);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach((btn) => {
  btn.addEventListener('click', btnAction);
});

function btnAction(e) {
  let nvObj = {};

  inputs.forEach((input) => {
    let attrName = input.getAttribute('name');
    let attrValeur =
      attrName !== 'cookieExpire' ? input.value : input.valueAsDate;
    nvObj[attrName] = attrValeur;
  });

  let description = e.target.getAttribute('data-cookie');

  if (description === 'Create') {
    creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
  } else if (description === 'Show') {
    listeCookies();
  }
}

function creerCookie(name, value, exp) {
  infoTxt.innerText = '';

  // Si le cookie a le meme nom

  let cookies = document.cookie.split(';');
  cookies.forEach((cookie) => {
    cookie = cookie.trim();
    let formatCookie = cookie.split('=');
    if (formatCookie[0] === encodeURIComponent(name)) {
      dejafait = true;
    }
  });

  if (dejafait) {
    infoTxt.innerText = `A cookie already have this name !`;
    infoTxt.style.color = 'red';
    return;
  }

  // if the cookie doesnt have any name

  if (name.length === 0) {
    infoTxt.innerText = `This cookie do not have any name`;
    infoTxt.style.color = 'red';
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )};expires=${exp.toUTCString()}`;
  let info = document.createElement('li');
  info.innerText = `Cookie ${name} créé.`;
  affichage.appendChild(info);
  setTimeout(() => {
    info.remove();
  }, 1500);
}

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
  affichage.innerHTML = '';
  // affichage.childNodes.forEach((child) => {
  //   child.remove();
  // });

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
  info.innerText = `Cookie ${name} created.`;
  affichage.appendChild(info);
  setTimeout(() => {
    info.remove();
  }, 1500);
}

function listeCookies() {
  let cookies = document.cookie.split(';');
  if (cookies.join() === '') {
    infoTxt.innerText = 'No cookies to display';
    return;
  }

  cookies.forEach((cookie) => {
    cookie = cookie.trim();
    let formatCookie = cookie.split('=');

    infoTxt.innerHTML = 'click on a cookie to delete';
    let item = document.createElement('li');
    item.innerText = `Name : ${decodeURIComponent(
      formatCookie[0],
    )}; Valeur : ${decodeURIComponent(formatCookie[1])}`;
    affichage.appendChild(item);

    // Delete cookie

    item.addEventListener('click', () => {
      document.cookie = `${formatCookie[0]}=; expires${new Date(0)}`;
      item.innerText = `Cookie ${formatCookie[0]} deleted`;
      setTimeout(() => {
        item.remove();
      }, 1000);
    });
  });
}

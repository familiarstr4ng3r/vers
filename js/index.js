

const os = getOS();

let allGames;

main();

function main() {
  operationSystem();
}

function operationSystem() {
  const container = document.querySelector(".container");

  for (const key in os) {
    const p = document.createElement("p");
    container.appendChild(p);
    p.textContent = os[key];
  }
}

function onGamesFetched(games) {
  allGames = games;
  validateURL();
}

function onGamesFetchedError() {
  console.warn("games error");
}

function validateURL() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("game")) {

    const game = urlParams.get("game");
    const value = allGames.find(e => e.param === game);

    if (value) proceedGameValue(value, useRedirect(urlParams));
  }
  else {
    showGames();
  }
}

function useRedirect(urlParams) {
  const hasRedirect = urlParams.has("redirect");
  const redirectValue = urlParams.get("redirect");

  const value = hasRedirect && redirectValue === "true";
  
  //console.log("has", hasRedirect);
  //console.log("get", redirectValue);
  //console.log("use", value);

  return value;
}

function proceedGameValue(value, useRedirect) {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.querySelector("h1").textContent = value.name;

  for (const key in value.links) {
    const p = document.createElement("p");
    gameContainer.appendChild(p);
    p.innerHTML = `
    <a href=${value.links[key]} target="_blank">${value.links[key]}</a>
    `;
  }

  if (useRedirect) {
    if (os.operationSystem === "Android") {
      redirect(value.links.android);
    }
    else if (os.operationSystem === "iOS") {
      redirect(value.links.ios);
    }
    else if (os.operationSystem === "Windows") {
      alert("should be redirect on windows?");
    }
  }
}

function redirect(url) {
  // window.open(url);
  window.location.href = url;
}

function showGames() {
  console.log("show games");

  const gamesContainer = document.querySelector(".games-container");

  const { origin, pathname } = window.location;  

  allGames.forEach(e => {
    const redirect = origin + pathname + `?game=${e.param}&redirect=true`;
    
    const div = document.createElement("div");
    gamesContainer.appendChild(div);
    div.className = "game";
    
    div.innerHTML = `
      <span>${e.name}</span>
      <a href="${redirect}">Redirect</a>
    `;

  });
}

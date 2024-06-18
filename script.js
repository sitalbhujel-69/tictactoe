const cells = document.querySelectorAll(".cell");
const button = document.querySelector("#restart");
const statuss = document.querySelector(".status");
const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let click = 0;

function startgame() {
  cellsclicked();
  restart();
}
startgame();

function cellsclicked() {
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      cell.innerText = currentPlayer;
      click++;
      cell.disabled = true;
      let index = cell.getAttribute("cellindex");
      options[index] = currentPlayer;
      checkwinner();
      changePlayer();
    });
  });
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
}
function checkwinner() {
  for (const pattern of winPattern) {
    let a = options[pattern[0]];
    let b = options[pattern[1]];
    let c = options[pattern[2]];
    if (a != "" || b != "" || c != "") {
      if (a == b && b == c) {
        statuss.innerHTML = `${currentPlayer} is winner`;
        disable(true);
      } else if (a != "" && b != "" && c != "" && click == 9) {
        statuss.innerHTML = `Draw`;
        disable(true);
      }
    }
  }
}
function disable(con) {
  cells.forEach((cell) => {
    cell.disabled = con;
  });
}
function restart() {
  button.addEventListener("click", (e) => {
    cells.forEach((cell) => {
      cell.innerText = "";
      options = ["", "", "", "", "", "", "", "", ""];
      disable(false);
      statuss.innerHTML = "";
    });
  });
}

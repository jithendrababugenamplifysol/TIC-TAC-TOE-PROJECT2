let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO

const winPatterns = [
  [0,1,2],[0,3,6],[0,4,8],[1,4,7],
  [2,4,6],[2,5,8],[3,4,5],[6,7,8]
];

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO) {
      box.innerText = 'O';
      turnO = false;
      box.classList.remove("cross");
      box.classList.add("circle");
    }
    else {
      box.innerText = 'X';
      turnO = true;
      box.classList.remove("circle");
      box.classList.add("cross");
    }
    box.disabled = true;

    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations!, Winner is ${winner}`;
  disableBoxes();
  msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
};

newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);

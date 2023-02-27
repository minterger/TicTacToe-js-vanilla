const tictactoe = document.querySelector("div.tictactoe");
const jugador = document.querySelector(".jugador");
const message = document.querySelector("span.message");
const messageContainer = document.querySelector(".messageContainer");
const restart = document.querySelector(".restart");

let tablero = [];

let end = false;
let tie = false;

const playerOne = "❌";
const playerTwo = "⭕";

let turn = playerOne;

restart.addEventListener("click", () => {
  setTimeout(limpiarTablero(), 2000);
});

tictactoe.addEventListener("click", (e) => {
  if (end || tie) {
    let restart = confirm("Quiere Reiniciar el juego?");
    if (restart) {
      limpiarTablero();
    }
    return;
  }

  //numero en el tablero
  const num = e.target.attributes.count.value;

  //verificar si esa posision esta ocupada
  if (tablero[num]) return;

  // agregar jugador al tablero y al array de tablero
  if (turn === playerOne) {
    agregar(num, e.target);
  } else if (turn === playerTwo) {
    agregar(num, e.target);
  }

  verificarGanador();

  verificarEmpate();

  // llena el tablero con el jugador que gano
  if (end) {
    tictactoe.childNodes.forEach((node) => {
      node.innerText = turn;
    });
    return;
  }

  // cambia el turno
  turn = turn === playerOne ? playerTwo : playerOne;
  jugador.innerText = turn;
});

const agregar = (num, posisionTablero) => {
  posisionTablero.innerText = turn;
  tablero[num] = turn;
};

const verificarGanador = () => {
  // verificar ganador en horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 1] &&
      tablero[i] === tablero[i + 2]
    ) {
      messageGanador();
      return;
    }
  }

  //verificar ganador en vertical
  for (let i = 0; i < 3; i++) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 3] &&
      tablero[i] === tablero[i + 6]
    ) {
      messageGanador();
      return;
    }
  }

  if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) {
    messageGanador();
    return;
  }

  if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) {
    messageGanador();
    return;
  }
};

const verificarEmpate = () => {
  tie = !tablero.includes(undefined) && tablero.length === 9;
  if (tie && !end) {
    message.innerHTML =
      '<span class="bold">Empate</span><br/>Presiona el tablero nuevamente para reiniciar o preciona el boton!';
    messageContainer.classList.remove("hide");
  }
};

const limpiarTablero = () => {
  tictactoe.childNodes.forEach((node) => {
    node.innerText = "";
  });

  message.innerHTML = "";
  messageContainer.classList.add("hide");

  end = false;
  tie = false;
  turn = playerOne;
  tablero = [];
  jugador.innerText = turn;
};

const messageGanador = () => {
  message.innerHTML = `${turn}<span class="bold">Gano</span><br/>Presiona el tablero nuevamente para reiniciar o presiona el boton!`;
  messageContainer.classList.remove("hide");
  end = !end;
};

const tictactoe = document.querySelector("div.tictactoe");

let tablero = [];

let end = false;
let tie = false;

const playerOne = "❌";
const playerTwo = "⭕";

let turn = playerOne;

tictactoe.addEventListener("click", (e) => {
  if (end || tie) {
    let restart = confirm("Quiere Reiniciar el juego?");
    if (restart) {
      limpiarTablero(e.childNodes);
    }
    return;
  }

  //numero en el tablero
  const num = e.target.attributes.count.value;

  // agregar jugador al tablero y al array de tablero
  if (turn === playerOne) {
    agregar(num, e.target);
  } else if (turn === playerTwo) {
    agregar(num, e.target);
  }

  verificarGanador();

  verificarEmpate();

  turn = turn === playerOne ? playerTwo : playerOne;
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
      alert(`${turn} gano`);
      end = !end;
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
      alert(`${turn} gano`);
      end = !end;
      return;
    }
  }

  if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) {
    alert(`${turn} gano`);
    end = !end;
    return;
  }

  if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) {
    alert(`${turn} gano`);
    end = !end;
    return;
  }
};

const verificarEmpate = () => {
  tie = !tablero.includes(undefined) && tablero.length === 9;
  if (tie && !end) {
    alert("empate");
  }
};

const limpiarTablero = () => {
  tictactoe.childNodes.forEach((node) => {
    node.innerText = "";
  });

  end = false;
  tie = false;
  turn = playerOne;
  tablero = [];
};

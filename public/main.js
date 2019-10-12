// window.addEventListener('load', gridEventListener);
// const game = new Grid();
// let playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2, 10);

// function gridEventListener() {
//   rowIndicator();
//   const validateClick = (e) => {
//     if (e.target.nodeName === 'LI') {
//       checkPosition(e);
//     }
//   };
//   document.querySelector('#grid-container').addEventListener('click', validateClick);
// }

// function checkPosition(e) {
//   const position = e.target.dataset.slot;
//   const colPositions = [
//     {column: position >= 0 && position <= 5},
//     {column: position >= 6 && position <= 11},
//     {column: position >= 12 && position <= 17},
//     {column: position >= 18 && position <= 23},
//     {column: position >= 24 && position <= 29},
//     {column: position >= 30 && position <= 35},
//     {column: position >= 36 && position <= 41}
//   ]
//   const indexFound = colPositions.findIndex(col => col.column === true);
//   chipPlacement(e, game.gridY[indexFound], indexFound)
// }

// const allSlots = Array.from(document.querySelectorAll('li'));
// const domGridColumns = [
//   allSlots.slice(0, 6),
//   allSlots.slice(6, 12),
//   allSlots.slice(12, 18),
//   allSlots.slice(18, 24),
//   allSlots.slice(24, 30),
//   allSlots.slice(30, 36),
//   allSlots.slice(36, 42)
// ]

// function chipPlacement(e, column, idx) {
//   playerSwitch = e.target.parentElement.dataset.p1p2 ^= 1;
//   let player = playerSwitch === 1 ? 1 : 2;
//   for (let i = column.length - 1; i >= 0; i--) {
//     if (column[i][0] === undefined) {
//       domGridColumns[idx][i].style.backgroundColor = `${playerSwitch === 1 ? 'blue' : 'red'}`;
//       game.grid[i][idx][0] = player;
//       setTimeout(() => checkForWinner(player), 100);
//       return;
//     }
//   }
// }

// function tieCheck() {
//   let counter = 0;
//   game.grid.forEach(row => {
//     row.forEach(slot => slot[0] === 1 || slot[0] === 2 ? counter++ : false)
//   });
//   if (counter === 42) {
//     winner()
//   }
// }

// function checkForWinner(player) {
//   let indexListArr = [
//     game.getIdxList(game.grid, player),
//     game.getIdxList(game.gridY, player),
//     game.getIdxList(game.topLeftBotRight, player),
//     game.getIdxList(game.botLeftTopRight, player),
//   ];
//   indexListArr.forEach((arr) => {
//     if (game.winnerCheck(arr)) {
//       winner(player);
//     }
//   });
//   tieCheck();
// }

// function winner(player) {
//   player 
//     ? window.alert(`  Player ${player} WINS! Play a new game?`)
//     : window.alert(`It's a TIE ! Play a tie-breaker?`);
//   allSlots.forEach(slot => slot.style.backgroundColor = '');
//   const refresh = () => location.reload();
//   setTimeout(refresh, 200);
// }


// function rowIndicator() {
//   domGridColumns.forEach((column, idx) => {
//     column.forEach(slot => slot.addEventListener('mouseover', () => highlightRow(idx)));
//     column.forEach(slot => slot.addEventListener('mouseout', () => highlightRow(idx, 1)));
//   });
// }

// function highlightRow(col, off) {
//   const mouseIn = () => {
//     domGridColumns[col].forEach(slot => slot.style.border = 
//       `${document.querySelector('#grid-container').dataset.p1p2 === '0' ? '3px dotted blue' : '3px dotted red'}`)
//   }
//   const mouseOut = () => {
//     domGridColumns[col].forEach((slot) => slot.style.border = '');
//   };
//   domGridColumns[col].forEach(slot => slot.addEventListener('click', () => {
//     playerSwitch = parseInt(document.querySelector('#grid-container').dataset.p1p2, 10);
//     setTimeout(mouseIn, 100);
//   }));
//   off ? mouseOut() : mouseIn();
// }


const socket = io.connect('http://localhost:3000');
document.querySelector('#submit-register')
  .addEventListener('click', () => {
    const playerId = document.querySelector('#user-id').value
    
    socket.emit('register', { playerId });
    socket.on('register', (data) => console.log(data));
  });

document.querySelector('#submit-join')
  .addEventListener('click', () => {
    const playerId = document.querySelector('#user-id').value
    const gameRoomId = document.querySelector('#room-id').value;
    socket.emit('join', { gameRoomId, playerId });
  
    socket.on('join', (data) => console.log(data));
});

socket.on('register', (data) => {
  console.log(data)
})
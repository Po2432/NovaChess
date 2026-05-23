// --- High Quality Pieces via Scalable SVG Strings ---
const p_path="M22.5 9c-2.2 0-4 1.8-4 4 0 .9.3 1.7.8 2.4C17.3 16.5 16 19 16 22c0 2 .9 3.8 2.4 5-3 1.1-7.4 5.6-7.4 13.5h23c0-7.9-4.4-12.4-7.4-13.5 1.5-1.2 2.4-3 2.4-5 0-3-1.3-5.5-3.3-6.6.5-.7.8-1.5.8-2.4 0-2.2-1.8-4-4-4z";
const n_path="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10";
const b_path="M9 36c3.4 3 9.6 3 13.5 3s10.1 0 13.5-3c0 0 1.5-3 1.5-4s-1.5-4-1.5-4c-3.1 2.5-7.3 3-13.5 3s-10.4-.5-13.5-3c0 0-1.5 1-1.5 4s1.5 4 1.5 4zM15 32c2.5 2.5 5 2.5 7.5 2.5s5 0 7.5-2.5c0 0 2-3 2-6s-2-6-2-6c-2.5-2.5-5-2.5-7.5-2.5s-5 0-7.5 2.5c0 0-2 3-2 6s2 6 2 6z M22.5 11c-1.4 0-2.5 1.1-2.5 2.5 0 1.1.7 2.1 1.7 2.4.5.2 1.1.2 1.6 0 1-.3 1.7-1.3 1.7-2.4 0-1.4-1.1-2.5-2.5-2.5z";
const r_path="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5 M34 14l-3 3H14l-3-3 M31 17v12.5H14V17 M31 29.5l1.5 2.5h-20l1.5-2.5";
const q_path="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12zM9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 10.5 1s9.5.5 10.5-1c1-2 2.5-2 2.5-4-8.5-1.5-21-1.5-27 0zM11 30c0 0-1.5 1-1.5 4s1.5 4 1.5 4h23c0 0 1.5-1 1.5-4s-1.5-4-1.5-4c-8.5 1.5-21 1.5-23 0z";
const k_path="M22.5 11.6V16M20 13.8h5 M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5 M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10.5 5 10.5v7z M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0";

const getSvg = (path, isWhite) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path fill="${isWhite ? '#fff' : '#222'}" stroke="${isWhite ? '#000' : '#fff'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="${path}"/></svg>`;

const PIECE_SVGS = {
  'p': getSvg(p_path, false), 'P': getSvg(p_path, true),
  'n': getSvg(n_path, false), 'N': getSvg(n_path, true),
  'b': getSvg(b_path, false), 'B': getSvg(b_path, true),
  'r': getSvg(r_path, false), 'R': getSvg(r_path, true),
  'q': getSvg(q_path, false), 'Q': getSvg(q_path, true),
  'k': getSvg(k_path, false), 'K': getSvg(k_path, true)
};

// --- Game Logic ---
let isCasualMode = false;
let chess = new Chess();
let selectedSquare = null;
let currentTurn = 'w';
let isGameOver = false;

// Custom Casual Mode Logic (For "Less Professional" setting)
const initialCasual = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R']
];
let casualBoard = JSON.parse(JSON.stringify(initialCasual));
let casualHistory = []; // Needed for undo logic

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tabId).style.display = 'block';
  event.target.classList.add('active');
}

function toggleMode() {
  isCasualMode = document.getElementById('casual-toggle').checked;
  resetGame();
}

function resetGame() {
  chess.reset();
  casualBoard = JSON.parse(JSON.stringify(initialCasual));
  casualHistory = [];
  currentTurn = 'w';
  selectedSquare = null;
  isGameOver = false;
  updateStatus();
  renderBoard();
  updateBoardRotation();
}

function undoMove() {
  if (isGameOver) isGameOver = false;
  if (!isCasualMode) {
    chess.undo();
    currentTurn = chess.turn();
  } else {
    if (casualHistory.length > 0) {
      casualBoard = JSON.parse(casualHistory.pop());
      currentTurn = currentTurn === 'w' ? 'b' : 'w';
    }
  }
  selectedSquare = null;
  updateStatus();
  renderBoard();
  updateBoardRotation();
}

function updateStatus(msg) {
  const sb = document.getElementById('status-bar');
  if (msg) {
    sb.innerText = msg;
    sb.style.background = currentTurn === 'w' ? "rgba(255, 100, 100, 0.4)" : "rgba(100, 150, 255, 0.4)";
  } else {
    sb.innerText = currentTurn === 'w' ? "White's Turn" : "Black's Turn";
    sb.style.background = "rgba(0,0,0,0.3)";
  }
}

function updateBoardRotation() {
  const rotate = document.getElementById('rotate-toggle').checked;
  const boardEl = document.getElementById('chessboard');
  if (rotate && currentTurn === 'b') {
    boardEl.classList.add('flipped');
  } else {
    boardEl.classList.remove('flipped');
  }
}

function toAlg(r, c) { return String.fromCharCode(97 + c) + (8 - r); }

function getPieceAt(r, c) {
  if (!isCasualMode) {
    let p = chess.get(toAlg(r, c));
    return p ? (p.color === 'w' ? p.type.toUpperCase() : p.type) : '';
  }
  return casualBoard[r][c];
}

// Casual Basic Rules Logic (Capture King to win, basic piece tracing)
function getCasualMoves(r, c) {
  let piece = casualBoard[r][c];
  if (!piece) return [];
  let color = piece === piece.toUpperCase() ? 'w' : 'b';
  let type = piece.toLowerCase();
  let moves = [];

  function add(tr, tc) {
    if (tr < 0 || tr > 7 || tc < 0 || tc > 7) return false;
    let target = casualBoard[tr][tc];
    if (!target) { moves.push({r: tr, c: tc}); return true; }
    let tColor = target === target.toUpperCase() ? 'w' : 'b';
    if (tColor !== color) moves.push({r: tr, c: tc});
    return false;
  }

  if (type === 'p') {
    let dir = color === 'w' ? -1 : 1;
    let startRow = color === 'w' ? 6 : 1;
    if (r+dir >= 0 && r+dir <= 7 && !casualBoard[r+dir][c]) {
      moves.push({r: r+dir, c: c});
      if (r === startRow && !casualBoard[r+dir*2][c]) moves.push({r: r+dir*2, c: c});
    }
    for (let dc of [-1, 1]) {
      if (c+dc >= 0 && c+dc <= 7 && r+dir >= 0 && r+dir <= 7) {
        let target = casualBoard[r+dir][c+dc];
        if (target && (target === target.toUpperCase() ? 'w' : 'b') !== color) moves.push({r: r+dir, c: c+dc});
      }
    }
  } else if (type === 'n') {
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(d => add(r+d[0], c+d[1]));
  } else if (type === 'k') {
    [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(d => add(r+d[0], c+d[1]));
  } else if (type === 'r') {
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(d => { let tr = r+d[0], tc = c+d[1]; while(add(tr, tc)) { tr+=d[0]; tc+=d[1]; } });
  } else if (type === 'b') {
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(d => { let tr = r+d[0], tc = c+d[1]; while(add(tr, tc)) { tr+=d[0]; tc+=d[1]; } });
  } else if (type === 'q') {
    [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(d => { let tr = r+d[0], tc = c+d[1]; while(add(tr, tc)) { tr+=d[0]; tc+=d[1]; } });
  }
  return moves;
}

function handleSquareClick(r, c) {
  if (isGameOver) return;
  
  let piece = getPieceAt(r, c);
  let pieceColor = piece ? (piece === piece.toUpperCase() ? 'w' : 'b') : null;

  if (selectedSquare) {
    let sr = selectedSquare.r;
    let sc = selectedSquare.c;
    
    // Check if clicked the same team -> Change Selection
    if (pieceColor === currentTurn) {
      selectedSquare = {r, c};
      renderBoard();
      return;
    }

    // Attempt Move
    let isValid = false;
    if (!isCasualMode) {
      let fromAlg = toAlg(sr, sc);
      let toAlgMove = toAlg(r, c);
      let validMoves = chess.moves({ verbose: true });
      if (validMoves.find(m => m.from === fromAlg && m.to === toAlgMove)) {
        chess.move({ from: fromAlg, to: toAlgMove, promotion: 'q' });
        isValid = true;
      }
    } else {
      let validMoves = getCasualMoves(sr, sc);
      if (validMoves.find(m => m.r === r && m.c === c)) {
        casualHistory.push(JSON.stringify(casualBoard));
        let movingPiece = casualBoard[sr][sc];
        // Auto Promote Pawn in Casual
        if (movingPiece.toLowerCase() === 'p' && (r === 0 || r === 7)) movingPiece = movingPiece === 'P' ? 'Q' : 'q';
        casualBoard[r][c] = movingPiece;
        casualBoard[sr][sc] = '';
        isValid = true;
      }
    }

    if (isValid) {
      selectedSquare = null;
      currentTurn = currentTurn === 'w' ? 'b' : 'w';
      checkGameOver();
      if (!isGameOver) updateStatus();
      renderBoard();
      setTimeout(updateBoardRotation, 300); // Delayed rotation for visual feel
    } else {
      selectedSquare = null;
      renderBoard();
    }
  } else {
    if (pieceColor === currentTurn) {
      selectedSquare = {r, c};
      renderBoard();
    }
  }
}

function checkGameOver() {
  if (!isCasualMode) {
    if (chess.in_checkmate()) { isGameOver = true; updateStatus("Checkmate! " + (currentTurn === 'w' ? "Black" : "White") + " Wins!"); }
    else if (chess.in_stalemate() || chess.in_draw() || chess.in_threefold_repetition()) { isGameOver = true; updateStatus("Draw!"); }
  } else {
    let wK = false, bK = false;
    casualBoard.forEach(row => row.forEach(p => { if (p === 'K') wK = true; if (p === 'k') bK = true; }));
    if (!wK) { isGameOver = true; updateStatus("Black Wins! King Captured!"); }
    else if (!bK) { isGameOver = true; updateStatus("White Wins! King Captured!"); }
  }
}

function renderBoard() {
  const boardEl = document.getElementById('chessboard');
  boardEl.innerHTML = '';
  
  let activeMoves = [];
  if (selectedSquare) {
    if (!isCasualMode) {
      chess.moves({ square: toAlg(selectedSquare.r, selectedSquare.c), verbose: true }).forEach(m => {
        let col = m.to.charCodeAt(0) - 97;
        let row = 8 - parseInt(m.to[1]);
        activeMoves.push(`${row}-${col}`);
      });
    } else {
      getCasualMoves(selectedSquare.r, selectedSquare.c).forEach(m => activeMoves.push(`${m.r}-${m.c}`));
    }
  }

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let square = document.createElement('div');
      square.className = `square ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
      if (selectedSquare && selectedSquare.r === r && selectedSquare.c === c) square.classList.add('selected');
      if (activeMoves.includes(`${r}-${c}`)) square.classList.add('valid-move');
      
      let piece = getPieceAt(r, c);
      if (piece && PIECE_SVGS[piece]) square.innerHTML += PIECE_SVGS[piece];
      
      square.onclick = () => handleSquareClick(r, c);
      boardEl.appendChild(square);
    }
  }
}

// Init
resetGame();

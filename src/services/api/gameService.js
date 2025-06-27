const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GameService {
  constructor() {
    this.gameState = {
      board: Array(3).fill().map(() => Array(3).fill('')),
      currentPlayer: 'X',
      gameMode: 'human', // 'human' or 'ai'
      difficulty: 'easy', // 'easy' or 'hard'
      isGameOver: false,
      winner: null,
      scores: { X: 0, O: 0, draws: 0 }
    };
  }

  async getGameState() {
    await delay(100);
    return { ...this.gameState };
  }

  async resetGame() {
    await delay(200);
    this.gameState = {
      ...this.gameState,
      board: Array(3).fill().map(() => Array(3).fill('')),
      currentPlayer: 'X',
      isGameOver: false,
      winner: null
    };
    return { ...this.gameState };
  }

  async resetSession() {
    await delay(200);
    this.gameState = {
      board: Array(3).fill().map(() => Array(3).fill('')),
      currentPlayer: 'X',
      gameMode: 'human',
      difficulty: 'easy',
      isGameOver: false,
      winner: null,
      scores: { X: 0, O: 0, draws: 0 }
    };
    return { ...this.gameState };
  }

  async setGameMode(mode, difficulty = 'easy') {
    await delay(100);
    this.gameState.gameMode = mode;
    this.gameState.difficulty = difficulty;
    return { ...this.gameState };
  }

  checkWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return { winner: board[i][0], line: `row-${i}` };
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return { winner: board[0][i], line: `col-${i}` };
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return { winner: board[0][0], line: 'diag-main' };
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return { winner: board[0][2], line: 'diag-anti' };
    }

    // Check for draw
    const isFull = board.every(row => row.every(cell => cell !== ''));
    if (isFull) {
      return { winner: 'draw', line: null };
    }

    return { winner: null, line: null };
  }

  getAIMove(board, difficulty) {
    if (difficulty === 'easy') {
      // Easy AI: Random valid move
      const emptyCells = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            emptyCells.push({ row: i, col: j });
          }
        }
      }
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else {
      // Hard AI: Minimax algorithm
      return this.getBestMove(board);
    }
  }

  getBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          let score = this.minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, col: j };
          }
        }
      }
    }
    return bestMove;
  }

  minimax(board, depth, isMaximizing) {
    const result = this.checkWinner(board);
    
    if (result.winner === 'O') return 10 - depth;
    if (result.winner === 'X') return depth - 10;
    if (result.winner === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  async makeMove(row, col) {
    await delay(150);
    
    if (this.gameState.isGameOver || this.gameState.board[row][col] !== '') {
      return { success: false, gameState: { ...this.gameState } };
    }

    // Make human move
    const newBoard = this.gameState.board.map(r => [...r]);
    newBoard[row][col] = this.gameState.currentPlayer;

    const result = this.checkWinner(newBoard);
    
    if (result.winner) {
      this.gameState.isGameOver = true;
      this.gameState.winner = result.winner;
      this.gameState.winLine = result.line;
      
      // Update scores
      if (result.winner === 'draw') {
        this.gameState.scores.draws++;
      } else {
        this.gameState.scores[result.winner]++;
      }
    } else {
      this.gameState.currentPlayer = this.gameState.currentPlayer === 'X' ? 'O' : 'X';
    }

    this.gameState.board = newBoard;

    // If it's AI turn and game is not over
    if (!this.gameState.isGameOver && 
        this.gameState.gameMode === 'ai' && 
        this.gameState.currentPlayer === 'O') {
      
      // AI makes move after short delay
      setTimeout(async () => {
        const aiMove = this.getAIMove(newBoard, this.gameState.difficulty);
        if (aiMove) {
          await this.makeMove(aiMove.row, aiMove.col);
        }
      }, 800);
    }

    return { success: true, gameState: { ...this.gameState } };
  }
}

export default new GameService();
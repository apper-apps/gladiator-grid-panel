import { motion } from 'framer-motion';
import GameCell from '@/components/atoms/GameCell';

const GameBoard = ({ board, onCellClick, winLine = null, disabled = false }) => {
  const isWinningCell = (row, col) => {
    if (!winLine) return false;
    
    if (winLine === `row-${row}`) return true;
    if (winLine === `col-${col}`) return true;
    if (winLine === 'diag-main' && row === col) return true;
    if (winLine === 'diag-anti' && row + col === 2) return true;
    
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Game board container */}
      <div className="grid grid-cols-3 gap-3 p-6 bg-gradient-to-br from-surface-50 to-surface-200 rounded-2xl shadow-stone border-4 border-secondary/30 stone-texture">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isWinningCell={isWinningCell(rowIndex, colIndex)}
              disabled={disabled}
            />
          ))
        )}
      </div>

      {/* Victory overlay effect */}
      {winLine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent rounded-2xl"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameBoard;
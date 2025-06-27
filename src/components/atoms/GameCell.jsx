import { motion } from 'framer-motion';

const GameCell = ({ value, onClick, row, col, isWinningCell = false, disabled = false }) => {
  const isEmpty = !value;

  return (
    <motion.div
      onClick={disabled || !isEmpty ? undefined : onClick}
      className={`
        relative aspect-square bg-gradient-to-br from-surface-50 to-surface-100 
        border-4 border-secondary/20 rounded-lg stone-texture
        ${isEmpty && !disabled ? 'game-cell cursor-pointer' : 'cursor-default'}
        ${isWinningCell ? 'ring-4 ring-secondary laurel-glow' : ''}
        ${disabled ? 'opacity-60' : ''}
      `}
      whileHover={isEmpty && !disabled ? { scale: 1.02 } : {}}
      whileTap={isEmpty && !disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (row * 3 + col) * 0.1 }}
    >
      {/* Cell content */}
      {value && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: "back.out" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`
            font-display font-bold text-6xl carved-text
            ${value === 'X' ? 'text-accent' : 'text-secondary'}
            ${isWinningCell ? 'golden-glow victory-animation' : ''}
          `}>
            {value}
          </div>
        </motion.div>
      )}

      {/* Hover indicator for empty cells */}
      {isEmpty && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity">
          <div className="font-display font-bold text-4xl text-secondary">
            {/* Could show preview of next move */}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GameCell;
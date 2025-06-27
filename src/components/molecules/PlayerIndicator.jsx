import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PlayerIndicator = ({ currentPlayer, gameMode, isGameOver = false, difficulty = 'easy' }) => {
  const getPlayerName = (player) => {
    if (player === 'X') return 'Gladiator';
    if (gameMode === 'ai') {
      const difficultyNames = { easy: 'Novice', medium: 'Skilled', hard: 'Master' };
      return `${difficultyNames[difficulty]} AI`;
    }
    return 'Fellow Warrior';
  };

  const getPlayerIcon = (player) => {
    if (player === 'X') return 'Sword';
    return gameMode === 'ai' ? 'Bot' : 'Shield';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="bg-gradient-to-r from-surface-50 to-surface-100 rounded-xl p-6 shadow-stone border-2 border-secondary/30 stone-texture">
        {!isGameOver ? (
          <motion.div
            key={currentPlayer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ApperIcon 
                name={getPlayerIcon(currentPlayer)} 
                className={`w-8 h-8 ${currentPlayer === 'X' ? 'text-accent' : 'text-secondary'}`}
              />
            </motion.div>
            <div>
              <h3 className="font-display text-2xl carved-text text-secondary">
                {getPlayerName(currentPlayer)}'s Turn
              </h3>
<p className="text-secondary/80 font-body">
                Playing as {currentPlayer}
                {gameMode === 'ai' && currentPlayer === 'O' && 
                  ` • ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`
                }
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <ApperIcon name="Crown" className="w-8 h-8 text-secondary golden-glow" />
            <h3 className="font-display text-2xl carved-text text-secondary">
              Game Complete
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerIndicator;
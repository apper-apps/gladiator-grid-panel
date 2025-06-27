import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const GameOverModal = ({ 
  isOpen, 
  winner, 
  gameMode, 
  onPlayAgain, 
  onChangeMode, 
  onClose 
}) => {
  const getWinnerMessage = () => {
    if (winner === 'draw') {
      return {
        title: "A Noble Draw!",
        message: "Both warriors fought valiantly",
        icon: "Equal",
        color: "text-secondary"
      };
    }
    
    if (winner === 'X') {
      return {
        title: "Victory!",
        message: "The Gladiator emerges triumphant!",
        icon: "Crown",
        color: "text-accent"
      };
    }
    
    if (gameMode === 'ai') {
      return {
        title: "Defeat!",
        message: "The AI Centurion proves superior",
        icon: "Bot",
        color: "text-secondary"
      };
    }
    
    return {
      title: "Victory!",
      message: "The Fellow Warrior claims victory!",
      icon: "Shield",
      color: "text-secondary"
    };
  };

  const winnerInfo = getWinnerMessage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-surface-50 to-surface-200 rounded-2xl p-8 max-w-md w-full stone-texture shadow-stone border-4 border-secondary/30"
          >
            {/* Victory Icon */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-4"
              >
                <ApperIcon 
                  name={winnerInfo.icon} 
                  className={`w-20 h-20 mx-auto golden-glow ${winnerInfo.color}`}
                />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`font-display text-3xl font-bold carved-text mb-2 ${winnerInfo.color}`}
              >
                {winnerInfo.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-secondary/80 font-body text-lg"
              >
                {winnerInfo.message}
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                variant="primary"
                size="lg"
                icon="RotateCcw"
                onClick={onPlayAgain}
                className="w-full"
              >
                Fight Again
              </Button>
              
              <Button
                variant="secondary"
                size="md"
                icon="Swords"
                onClick={onChangeMode}
                className="w-full"
              >
                Change Battle Mode
              </Button>
            </motion.div>

            {/* Close button */}
            <div className="mt-4 text-center">
              <button
                onClick={onClose}
                className="text-secondary/60 hover:text-secondary transition-colors font-body text-sm"
              >
                Return to arena
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;
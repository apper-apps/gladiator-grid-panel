import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ModeSelector = ({ onModeSelect, onDifficultySelect, showDifficulty = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-surface-50 to-surface-200 rounded-2xl p-8 max-w-md w-full stone-texture shadow-stone border-4 border-secondary/30"
      >
        {!showDifficulty ? (
          <>
            {/* Title */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-4"
              >
                <ApperIcon name="Swords" className="w-16 h-16 text-secondary mx-auto golden-glow" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-secondary carved-text mb-2">
                Choose Your Battle
              </h2>
              <p className="text-secondary/80 font-body">
                Select your opponent for the ancient arena
              </p>
            </div>

            {/* Mode Options */}
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                icon="Users"
                onClick={() => onModeSelect('human')}
                className="w-full"
              >
                Battle Another Gladiator
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                icon="Bot"
                onClick={() => onModeSelect('ai')}
                className="w-full"
              >
                Challenge the AI
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Difficulty Selection */}
            <div className="text-center mb-8">
              <ApperIcon name="Bot" className="w-16 h-16 text-secondary mx-auto golden-glow mb-4" />
              <h2 className="font-display text-3xl font-bold text-secondary carved-text mb-2">
                Choose Difficulty
              </h2>
              <p className="text-secondary/80 font-body">
                How skilled is your AI opponent?
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="secondary"
                size="lg"
                icon="Zap"
                onClick={() => onDifficultySelect('easy')}
                className="w-full"
              >
                <div className="text-left">
                  <div className="font-semibold">Novice Centurion</div>
                  <div className="text-sm opacity-80">Makes random moves</div>
                </div>
              </Button>
              
              <Button
                variant="primary"
                size="lg"
                icon="Zap"
                onClick={() => onDifficultySelect('hard')}
                className="w-full"
              >
                <div className="text-left">
                  <div className="font-semibold">Master Strategist</div>
                  <div className="text-sm opacity-80">Plays optimally</div>
                </div>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => onModeSelect(null)}
                className="text-secondary/60 hover:text-secondary transition-colors font-body"
              >
                ← Back to mode selection
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
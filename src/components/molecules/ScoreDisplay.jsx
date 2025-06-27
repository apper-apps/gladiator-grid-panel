import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ScoreDisplay = ({ scores }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-3 gap-4 mb-8"
    >
      {/* Gladiator (X) Score */}
      <div className="bg-gradient-to-b from-accent/20 to-accent/10 rounded-lg p-4 border-2 border-accent/30 stone-texture">
        <div className="flex items-center gap-2 mb-2">
          <ApperIcon name="Sword" className="w-5 h-5 text-accent" />
          <h4 className="font-display font-semibold text-accent carved-text">Gladiator</h4>
        </div>
        <div className="text-2xl font-bold text-accent">{scores.X}</div>
      </div>

      {/* Draws */}
      <div className="bg-gradient-to-b from-secondary/20 to-secondary/10 rounded-lg p-4 border-2 border-secondary/30 stone-texture">
        <div className="flex items-center gap-2 mb-2">
          <ApperIcon name="Equal" className="w-5 h-5 text-secondary" />
          <h4 className="font-display font-semibold text-secondary carved-text">Draws</h4>
        </div>
        <div className="text-2xl font-bold text-secondary">{scores.draws}</div>
      </div>

      {/* Opponent (O) Score */}
      <div className="bg-gradient-to-b from-secondary/20 to-secondary/10 rounded-lg p-4 border-2 border-secondary/30 stone-texture">
        <div className="flex items-center gap-2 mb-2">
          <ApperIcon name="Shield" className="w-5 h-5 text-secondary" />
          <h4 className="font-display font-semibold text-secondary carved-text">Opponent</h4>
        </div>
        <div className="text-2xl font-bold text-secondary">{scores.O}</div>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;
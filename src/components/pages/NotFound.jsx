import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <ApperIcon name="Shield" className="w-24 h-24 text-secondary mx-auto golden-glow" />
        </motion.div>

        <h1 className="font-display text-6xl font-bold text-secondary carved-text mb-4">
          404
        </h1>
        
        <h2 className="font-display text-2xl text-secondary carved-text mb-4">
          Lost in the Colosseum
        </h2>
        
        <p className="font-body text-secondary/80 mb-8">
          The path you seek does not exist in this ancient arena. 
          Return to the battlefield, brave gladiator.
        </p>

        <Button
          variant="primary"
          size="lg"
          icon="ArrowLeft"
          onClick={() => navigate('/')}
        >
          Return to Arena
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
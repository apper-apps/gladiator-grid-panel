import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import gameService from '@/services/api/gameService';
import Button from '@/components/atoms/Button';
import GameBoard from '@/components/molecules/GameBoard';
import PlayerIndicator from '@/components/molecules/PlayerIndicator';
import ScoreDisplay from '@/components/molecules/ScoreDisplay';
import ModeSelector from '@/components/organisms/ModeSelector';
import GameOverModal from '@/components/organisms/GameOverModal';
import ApperIcon from '@/components/ApperIcon';

const Home = () => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showDifficultySelector, setShowDifficultySelector] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    loadGameState();
  }, []);

  useEffect(() => {
    if (gameState?.isGameOver && !showGameOverModal) {
      // Add victory screen shake effect
      if (gameState.winner !== 'draw') {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 500);
      }
      
      // Show game over modal after a brief delay
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 1000);
    }
  }, [gameState?.isGameOver, showGameOverModal]);

  const loadGameState = async () => {
    setLoading(true);
    try {
      const state = await gameService.getGameState();
      setGameState(state);
      
      // Show mode selector if no game mode is set
      if (!state.gameMode || state.gameMode === 'human') {
        setShowModeSelector(true);
      }
    } catch (error) {
      toast.error('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelect = async (mode) => {
    if (!mode) {
      setShowDifficultySelector(false);
      return;
    }

    if (mode === 'ai') {
      setShowDifficultySelector(true);
      return;
    }

    try {
      const newState = await gameService.setGameMode(mode);
      setGameState(newState);
      setShowModeSelector(false);
      setShowDifficultySelector(false);
      toast.success(`Battle mode: ${mode === 'human' ? 'Human vs Human' : 'Human vs AI'}`);
    } catch (error) {
      toast.error('Failed to set game mode');
    }
  };

  const handleDifficultySelect = async (difficulty) => {
    try {
      const newState = await gameService.setGameMode('ai', difficulty);
      setGameState(newState);
      setShowModeSelector(false);
      setShowDifficultySelector(false);
      toast.success(`AI difficulty: ${difficulty === 'easy' ? 'Novice' : 'Master'}`);
    } catch (error) {
      toast.error('Failed to set difficulty');
    }
  };

  const handleCellClick = async (row, col) => {
    if (gameState.isGameOver || gameState.board[row][col] !== '') {
      return;
    }

    try {
      const result = await gameService.makeMove(row, col);
      if (result.success) {
        setGameState(result.gameState);
        
        // Play move sound effect (placeholder for actual sound)
        console.log('🔊 Stone carving sound');
      }
    } catch (error) {
      toast.error('Failed to make move');
    }
  };

  const handlePlayAgain = async () => {
    try {
      const newState = await gameService.resetGame();
      setGameState(newState);
      setShowGameOverModal(false);
    } catch (error) {
      toast.error('Failed to reset game');
    }
  };

  const handleChangeMode = async () => {
    setShowGameOverModal(false);
    setShowModeSelector(true);
  };

  const handleNewSession = async () => {
    try {
      const newState = await gameService.resetSession();
      setGameState(newState);
      setShowModeSelector(true);
      toast.success('New session started');
    } catch (error) {
      toast.error('Failed to start new session');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <ApperIcon name="Loader" className="w-12 h-12 text-secondary mx-auto" />
          </motion.div>
          <h2 className="font-display text-2xl text-secondary carved-text">
            Preparing the Arena...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${screenShake ? 'screen-shake' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              textShadow: [
                '0 0 20px rgba(218, 165, 32, 0.3)',
                '0 0 40px rgba(218, 165, 32, 0.6)',
                '0 0 20px rgba(218, 165, 32, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-secondary carved-text mb-4">
              GLADIATOR GRID
            </h1>
          </motion.div>
          <p className="font-body text-xl text-secondary/80 mb-6">
            Ancient battles on the sacred grid of the Colosseum
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="secondary"
              icon="Settings"
              onClick={() => setShowModeSelector(true)}
            >
              Change Mode
            </Button>
            <Button
              variant="outline"
              icon="RotateCcw"
              onClick={handleNewSession}
            >
              New Session
            </Button>
          </div>
        </motion.div>

        {gameState && (
          <div className="space-y-8">
            {/* Score Display */}
            <ScoreDisplay scores={gameState.scores} />

            {/* Player Indicator */}
            <PlayerIndicator
              currentPlayer={gameState.currentPlayer}
              gameMode={gameState.gameMode}
              isGameOver={gameState.isGameOver}
            />

            {/* Game Board */}
            <div className="flex justify-center">
              <GameBoard
                board={gameState.board}
                onCellClick={handleCellClick}
                winLine={gameState.winLine}
                disabled={gameState.isGameOver || (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O')}
              />
            </div>

            {/* Game status */}
            {gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && !gameState.isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ApperIcon name="Bot" className="w-6 h-6 text-secondary" />
                  </motion.div>
                  <p className="font-body text-secondary/80">
                    AI Centurion is planning their move...
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Mode Selector Modal */}
      <AnimatePresence>
        {showModeSelector && (
          <ModeSelector
            onModeSelect={handleModeSelect}
            onDifficultySelect={handleDifficultySelect}
            showDifficulty={showDifficultySelector}
          />
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showGameOverModal && gameState && (
          <GameOverModal
            isOpen={showGameOverModal}
            winner={gameState.winner}
            gameMode={gameState.gameMode}
            onPlayAgain={handlePlayAgain}
            onChangeMode={handleChangeMode}
            onClose={() => setShowGameOverModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
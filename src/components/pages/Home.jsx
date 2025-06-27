import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import audioService from "@/services/audioService";
import gameService from "@/services/api/gameService";
import ApperIcon from "@/components/ApperIcon";
import GameBoard from "@/components/molecules/GameBoard";
import ScoreDisplay from "@/components/molecules/ScoreDisplay";
import PlayerIndicator from "@/components/molecules/PlayerIndicator";
import GameOverModal from "@/components/organisms/GameOverModal";
import ModeSelector from "@/components/organisms/ModeSelector";
import Button from "@/components/atoms/Button";

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
      // Play appropriate sound effect based on game outcome
      if (gameState.winner === 'X') {
        audioService.playVictory();
      } else if (gameState.winner === 'O') {
        // In AI mode, O winning means player lost
        if (gameState.gameMode === 'ai') {
          audioService.playDefeat();
        } else {
          audioService.playVictory();
        }
      } else if (gameState.winner === 'draw') {
        audioService.playDraw();
      }
      
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
  }, [gameState?.isGameOver, showGameOverModal, gameState?.winner, gameState?.gameMode]);

  const loadGameState = async () => {
    try {
      const state = await gameService.getGameState();
      setGameState(state);
    } catch (error) {
      console.error('Failed to load game state:', error);
      toast.error('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelect = async (mode) => {
    try {
      const newState = await gameService.setGameMode(mode);
      setGameState(newState);
      setShowModeSelector(false);
      
      if (mode === 'ai') {
        setShowDifficultySelector(true);
      } else {
        // For human vs human, start the game immediately
        const gameStartState = await gameService.resetGame();
        setGameState(gameStartState);
        audioService.playButtonClick();
}
    } catch (error) {
      console.error('Failed to set game mode:', error);
      toast.error('Failed to set game mode');
    }
  };

  const handleDifficultySelect = async (difficulty) => {
    try {
      const difficultyNames = { easy: "Novice", medium: "Skilled", hard: "Master" };
      const newState = await gameService.setGameMode('ai', difficulty);
      setGameState(newState);
      
      // Start the game after difficulty is set
      const gameStartState = await gameService.resetGame();
      setGameState(gameStartState);
      
      setShowDifficultySelector(false);
      audioService.playButtonClick();
      toast.success(`Difficulty set to ${difficultyNames[difficulty]}! Game started!`);
    } catch (error) {
      console.error('Failed to set difficulty:', error);
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
        
        // Play move sound effect
        audioService.playMove();
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
            <ApperIcon name="Crown" className="w-12 h-12 text-secondary golden-glow" />
          </motion.div>
          <p className="font-body text-lg text-secondary/80">Loading Gladiator Grid...</p>
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
              difficulty={gameState.difficulty}
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
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: gameState.difficulty === 'easy' ? 1 : 
                               gameState.difficulty === 'medium' ? 1.5 : 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <ApperIcon name="Crown" className="w-6 h-6 text-secondary golden-glow" />
                  </motion.div>
                  <p className="font-body text-secondary/80">
                    AI Centurion is contemplating their strategy...
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
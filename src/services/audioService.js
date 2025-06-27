import { Howl } from 'howler';

class AudioService {
  constructor() {
    this.sounds = {};
    this.volume = 0.7;
    this.muted = false;
    this.initialized = false;
    this.initializeSounds();
  }

  initializeSounds() {
    try {
      // Move sounds - sword clashes and stone carving
      this.sounds.move1 = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      this.sounds.move2 = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      // Victory sounds - cheers and fanfare
      this.sounds.victory = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      this.sounds.fanfare = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      // Defeat sounds - somber tones
      this.sounds.defeat = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      // Draw sound - neutral tone
      this.sounds.draw = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj+R2+/EeiwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcCDaZ2/LNeSsF']
      });

      // Set volume for all sounds
      Object.values(this.sounds).forEach(sound => {
        if (sound) {
          sound.volume(this.volume);
        }
      });

      this.initialized = true;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
      this.initialized = false;
    }
  }

  playMove() {
    if (!this.initialized || this.muted) return;
    
    try {
      // Randomly choose between move sounds for variety
      const moveSound = Math.random() > 0.5 ? this.sounds.move1 : this.sounds.move2;
      if (moveSound) {
        moveSound.play();
      }
    } catch (error) {
      console.warn('Failed to play move sound:', error);
    }
  }

  playVictory() {
    if (!this.initialized || this.muted) return;
    
    try {
      // Play victory cheers followed by fanfare
      if (this.sounds.victory) {
        this.sounds.victory.play();
        setTimeout(() => {
          if (this.sounds.fanfare) {
            this.sounds.fanfare.play();
          }
        }, 800);
      }
    } catch (error) {
      console.warn('Failed to play victory sound:', error);
    }
  }

  playDefeat() {
    if (!this.initialized || this.muted) return;
    
    try {
      if (this.sounds.defeat) {
        this.sounds.defeat.play();
      }
    } catch (error) {
      console.warn('Failed to play defeat sound:', error);
    }
  }

  playDraw() {
    if (!this.initialized || this.muted) return;
    
    try {
      if (this.sounds.draw) {
        this.sounds.draw.play();
      }
    } catch (error) {
      console.warn('Failed to play draw sound:', error);
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      if (sound) {
        sound.volume(this.volume);
      }
    });
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  setMuted(muted) {
    this.muted = muted;
  }

  getVolume() {
    return this.volume;
  }

  isMuted() {
    return this.muted;
  }

  isInitialized() {
    return this.initialized;
  }
}

// Create and export singleton instance
const audioService = new AudioService();
export default audioService;
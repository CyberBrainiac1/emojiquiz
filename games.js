// Games Emoji Quiz - Chat Integrated Version

const gameCategories = {
  'classic': [
    [['👾', '🛸'], 'Space Invaders'],
    [['🐍', '🍎'], 'Snake'],
    [['🧱', '🔨'], 'Breakout'],
    [['🦆', '🔫'], 'Duck Hunt'],
    [['🧗', '🗻'], 'Q*bert'],
    [['🐸', '🛣️'], 'Frogger'],
    [['🧙‍♂️', '🧩'], 'Tetris'],
    [['🏎️', '🛣️'], 'Pole Position'],
    [['🦍', '🏢'], 'Donkey Kong'],
    [['👦', '🌎'], 'EarthBound'],
  ],
  'modern': [
    [['🧟', '🔫'], 'The Last of Us'],
    [['🔫', '👑'], 'Fortnite'],
    [['🦸‍♂️', '🕷️'], 'Spider-Man'],
    [['🧙‍♂️', '⚡'], 'The Witcher'],
    [['🦇', '🦸‍♂️'], 'Batman: Arkham'],
    [['🚗', '💨'], 'Rocket League'],
    [['🦖', '🌋'], 'ARK: Survival Evolved'],
    [['👨‍🚀', '🌌'], "No Man's Sky"],
  ],
  'party': [
    [['🎤', '🎶'], 'SingStar'],
    [['🎲', '🃏'], 'Mario Party'],
    [['🎮', '🏎️'], 'Mario Kart'],
    [['🕹️', '👨‍👩‍👧‍👦'], 'Jackbox Party Pack'],
    [['🧩', '🎉'], 'Puyo Puyo Tetris'],
    [['🦑', '🔫'], 'Splatoon'],
    [['👾', '🎉'], 'Among Us'],
  ]
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class GamesQuiz {
  constructor(appendMessage) {
    this.appendMessage = appendMessage;
    this.state = 'init';
    this.category = null;
    this.gameList = null;
    this.chosenPair = null;
    this.correctAnswer = null;
    this.allOptions = null;
    this.attempts = 2;
  }

  start() {
    this.state = 'category';
    this.appendMessage('backend', 'Welcome to the Games Emoji Quiz 🎮<br>You will be given 2 emojis and will have to guess the game.<br>You have 2 attempts to guess correctly. Good luck!<br>Choose a category: <b>Classic games</b>, <b>Modern games</b>, or <b>Party games</b>');
  }

  handleInput(input) {
    if (this.state === 'category') {
      const answer = input.trim().toLowerCase();
      if (!gameCategories[answer]) {
        this.appendMessage('backend', '❌ Invalid category. Please type: <b>Classic games</b>, <b>Modern games</b>, or <b>Party games</b>.');
        return;
      }
      this.category = answer;
      this.gameList = gameCategories[answer];
      this.state = 'quiz';
      this.nextQuestion();
      return;
    }
    if (this.state === 'quiz') {
      const guessNum = parseInt(input, 10);
      if (!guessNum || guessNum < 1 || guessNum > 4) {
        this.appendMessage('backend', '⚠️ Please enter a valid number from 1 to 4.');
        return;
      }
      if (this.allOptions[guessNum - 1] === this.correctAnswer) {
        this.appendMessage('backend', '✅ Correct! Restarting game...');
        this.reset();
        this.start();
      } else {
        this.attempts--;
        if (this.attempts > 0) {
          this.appendMessage('backend', `❌ Wrong! ${this.attempts} attempt(s) left. Please try again.`);
        } else {
          this.appendMessage('backend', `❌ Out of tries. The correct answer was: <b>${this.correctAnswer}</b><br>Taking you back to the main menu...`);
          this.reset();
          this.appendMessage('backend', 'Welcome! Please select a quiz to begin: <b>Movie Emoji Quiz</b>, <b>Games Emoji Quiz</b>, <b>Indian Movie Emoji Quiz</b>, or <b>Indian TV Emoji Quiz</b>.');
          // Set quizInstance to null to go back to main menu
          window.quizInstance = null;
        }
      }
      return;
    }
  }

  nextQuestion() {
    const idx = Math.floor(Math.random() * this.gameList.length);
    [this.chosenPair, this.correctAnswer] = this.gameList[idx];
    const wrongAnswers = shuffle(this.gameList.filter(([_, title]) => title !== this.correctAnswer)).slice(0, 3).map(([_, title]) => title);
    this.allOptions = shuffle([this.correctAnswer, ...wrongAnswers]);
    this.attempts = 2;
    let optionsText = `Guess the game: ${this.chosenPair[0]} ${this.chosenPair[1]}<br>`;
    this.allOptions.forEach((option, i) => {
      optionsText += `${i + 1}. ${option}<br>`;
    });
    optionsText += `You have 2 attempts. Type the <b>number</b> of your guess (1-4).`;
    this.appendMessage('backend', optionsText);
  }

  reset() {
    this.state = 'category';
    this.category = null;
    this.gameList = null;
    this.chosenPair = null;
    this.correctAnswer = null;
    this.allOptions = null;
    this.attempts = 2;
  }
}

// Export for use in index.html
window.GamesQuiz = GamesQuiz; 
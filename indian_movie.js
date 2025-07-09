// Indian Movie Emoji Quiz - Chat Integrated Version

const indianCategories = {
  'classic': [
    [['🏠', '👨‍👩‍👧‍👦'], 'Hum Aapke Hain Koun'],
    [['🌙', '⭐'], 'Chandni'],
    [['👨‍⚖️', '⚖️'], 'Damini'],
    [['🎪', '🎭'], 'Circus'],
    [['👨‍💼', '💼'], 'Guru'],
    [['🎭', '🎬'], 'Om Shanti Om'],
    [['👨‍⚕️', '💊'], 'Munna Bhai MBBS'],
    [['🚗', '💨'], 'Dhoom'],
  ],
  'modern': [
    [['👩‍🎤', '🎤', '🇮🇳'], 'Rockstar'],
    [['👮‍♂️', '🚨'], 'Singham'],
    [['👰', '🤵', '💔'], 'Kabir Singh'],
    [['🏏', '🇮🇳'], 'MS Dhoni: The Untold Story'],
    [['👨‍🎓', '🎓'], '3 Idiots'],
    [['👨‍💻', '💻'], 'PK'],
    [['👑', '🦁'], 'The Lion King (Hindi Dub)'],
    [['🎬', '🎭'], 'Om Shanti Om'],
  ],
  'action': [
    [['🚗', '💨'], 'Dhoom'],
    [['👮‍♂️', '🚨'], 'Singham'],
    [['🕵️', '🔫'], 'Dhoom 2'],
    [['🏍️', '💨'], 'Dhoom 3'],
    [['👨‍💼', '💼'], 'Guru'],
    [['🎭', '🎬'], 'Om Shanti Om'],
    [['👨‍⚕️', '💊'], 'Munna Bhai MBBS'],
    [['👨‍🎓', '🎓'], '3 Idiots'],
  ]
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class IndianMovieQuiz {
  constructor(appendMessage) {
    this.appendMessage = appendMessage;
    this.state = 'init';
    this.category = null;
    this.movieList = null;
    this.chosenPair = null;
    this.correctAnswer = null;
    this.allOptions = null;
    this.attempts = 2;
  }

  start() {
    this.state = 'category';
    this.appendMessage('backend', 'Welcome to the Indian Movie Emoji Quiz 🎬🇮🇳<br>You will be given 2-3 emojis and will have to guess the Indian movie.<br>You have 2 attempts to guess correctly. Good luck!<br>Choose a category: <b>Classic movies</b>, <b>Modern movies</b>, or <b>Action movies</b>');
  }

  handleInput(input) {
    if (this.state === 'category') {
      const answer = input.trim().toLowerCase();
      if (!indianCategories[answer]) {
        this.appendMessage('backend', '❌ Invalid category. Please type: <b>Classic movies</b>, <b>Modern movies</b>, or <b>Action movies</b>.');
        return;
      }
      this.category = answer;
      this.movieList = indianCategories[answer];
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
        this.appendMessage('backend', 'Choose a category: <b>Classic movies</b>, <b>Modern movies</b>, or <b>Action movies</b>');
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
    const idx = Math.floor(Math.random() * this.movieList.length);
    [this.chosenPair, this.correctAnswer] = this.movieList[idx];
    const wrongAnswers = shuffle(this.movieList.filter(([_, title]) => title !== this.correctAnswer)).slice(0, 3).map(([_, title]) => title);
    this.allOptions = shuffle([this.correctAnswer, ...wrongAnswers]);
    this.attempts = 2;
    let optionsText = `Guess the Indian movie: ${this.chosenPair.join(' ')}<br>`;
    this.allOptions.forEach((option, i) => {
      optionsText += `${i + 1}. ${option}<br>`;
    });
    optionsText += `You have 2 attempts. Type the <b>number</b> of your guess (1-4).`;
    this.appendMessage('backend', optionsText);
  }

  reset() {
    this.state = 'category';
    this.category = null;
    this.movieList = null;
    this.chosenPair = null;
    this.correctAnswer = null;
    this.allOptions = null;
    this.attempts = 2;
  }
}

// Export for use in index.html
window.IndianMovieQuiz = IndianMovieQuiz; 
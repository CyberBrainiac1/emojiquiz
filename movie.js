// Movie Emoji Quiz - Chat Integrated Version

const categories = {
  'kids': [
    [['🐭', '🧀'], 'Ratatouille'],
    [['🦁', '👑'], 'The Lion King'],
    [['🧚', '✨'], 'Tinker Bell'],
    [['🐠', '🌊'], 'Finding Nemo'],
    [['🧞‍♂️', '🕌'], 'Aladdin'],
    [['❄️', '👭'], 'Frozen'],
    [['🐉', '👦'], 'How to Train Your Dragon'],
    [['🚗', '🏁'], 'Cars'],
    [['🧸', '🚀'], 'Toy Story'],
    [['🌮', '🎸'], 'Coco'],
  ],
  'teens': [
    [['🧛‍♂️', '💔'], 'Twilight'],
    [['🏹', '🔥'], 'The Hunger Games'],
    [['🎤', '🎶'], 'Pitch Perfect'],
    [['📓', '💑'], 'The Notebook'],
    [['🎭', '🏫'], 'High School Musical'],
    [['💃', '🕺'], 'Step Up'],
    [['🛹', '👊'], 'Scott Pilgrim vs. the World'],
    [['🎮', '👾'], 'Ready Player One'],
  ],
  'adult': [
    [['🕵️‍♂️', '🎞️'], 'Inception'],
    [['🤯', '🧠'], 'Interstellar'],
    [['🔪', '🚿'], 'Psycho'],
    [['💊', '🔫'], 'The Matrix'],
    [['👨‍⚖️', '📜'], 'A Few Good Men'],
    [['🕶️', '🧥'], 'John Wick'],
    [['🕵️', '🧩'], 'Se7en'],
  ]
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class MovieQuiz {
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
    this.appendMessage('backend', 'Welcome to the Movie Emoji Quiz 🎥<br>You will be given 2 emojis and will have to guess the movie.<br>You have 2 attempts to guess correctly. Good luck!<br>Choose a category: <b>Kids movies</b>, <b>Teens movies</b>, or <b>Adult movies</b>');
  }

  handleInput(input) {
    if (this.state === 'category') {
      const answer = input.trim().toLowerCase();
      if (!categories[answer]) {
        this.appendMessage('backend', '❌ Invalid category. Please type: <b>Kids movies</b>, <b>Teens movies</b>, or <b>Adult movies</b>.');
        return;
      }
      this.category = answer;
      this.movieList = categories[answer];
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
          this.appendMessage('backend', `❌ Out of tries. The correct answer was: <b>${this.correctAnswer}</b><br>Restarting game...`);
          this.reset();
          this.start();
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
    let optionsText = `Guess the movie: ${this.chosenPair[0]} ${this.chosenPair[1]}<br>`;
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
window.MovieQuiz = MovieQuiz; 
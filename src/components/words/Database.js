function initializeWords() {
    const initialWords = {
      easy: ["kot", "pies", "lama"],
      medium: ["gitara", "sterta", "keczup"],
      hard: ["rachunek", "generator"],
    };
  
    Object.keys(initialWords).forEach((difficulty) => {
      const words = initialWords[difficulty];
      localStorage.setItem(`${difficulty}Words`, JSON.stringify(words));
    });
  }

  // Funkcja zwracająca słowa z bazy danych
function getWordsFromDatabase(difficulty) {
    const wordsByDifficulty = {
      easy: JSON.parse(localStorage.getItem('easyWords')) || [],
      medium: JSON.parse(localStorage.getItem('mediumWords')) || [],
      hard: JSON.parse(localStorage.getItem('hardWords')) || [],
    };
  
    return wordsByDifficulty[difficulty] || [];
  }
  
  // Funkcja dodająca nowe słowo do bazy danych
  function addWordToDatabase(difficulty, word) {
    const existingWords = getWordsFromDatabase(difficulty);
    const updatedWords = [...existingWords, word];
  
    switch (difficulty) {
      case 'easy':
        localStorage.setItem('easyWords', JSON.stringify(updatedWords));
        break;
      case 'medium':
        localStorage.setItem('mediumWords', JSON.stringify(updatedWords));
        break;
      case 'hard':
        localStorage.setItem('hardWords', JSON.stringify(updatedWords));
        break;
      default:
        // Obsłuż błąd lub wyślij informację o nieprawidłowej trudności
        break;
    }
  }
  
  initializeWords();

  export { getWordsFromDatabase, addWordToDatabase };
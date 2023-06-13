import { getWordsFromDatabase, addWordToDatabase } from './Database.js';

function randomWord(difficulty) {
  const words = getWordsFromDatabase(difficulty);

  if (words.length === 0) {
    return "brak słów w bazie danych";
  }

  return words[Math.floor(Math.random() * words.length)];
}

export { randomWord };
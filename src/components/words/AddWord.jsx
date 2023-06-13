import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addWordToDatabase } from './Database.js';
import './addWord.css';

const AddWord = () => {
  const initialValues = {
    difficulty: '',
    newWord: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const { difficulty, newWord } = values;

    if (newWord.trim() !== '') {
      addWordToDatabase(difficulty, newWord);
      resetForm();
      alert('Słowo zostało dodane do bazy danych.');
    }
  };

  return (
    <div className="Hangman__addWord">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="difficulty">Trudność:</label>
          <Field as="select" id="difficulty" name="difficulty">
            <option value="">Wybierz trudność</option>
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
          </Field>
          <br />
          <label htmlFor="newWord">Nowe słowo:</label>
          <Field type="text" id="newWord" name="newWord" />
          <br />
          <ErrorMessage name="newWord" component="div" className="error" />
          <br />
          <button type="submit">Dodaj słowo</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddWord;

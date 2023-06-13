import React from 'react';
import './footer.css';

interface FooterProps {
  author: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ author, year }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Hangman__footer">
      <p>Made by {author}</p>
      <p>&copy; {year} - {currentYear}</p>
    </div>
  );
};

export default Footer;
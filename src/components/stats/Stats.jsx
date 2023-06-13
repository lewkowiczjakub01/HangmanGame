import React, { useContext } from 'react';
import { useStats } from '../../contexts/statsContext/StatsContext'

const Stats = () => {
  const { wins, losses } = useStats();
  const totalGames = wins + losses;
  const winPercentage = (wins / totalGames) * 100 || 0;

  return (
    <div className="Hangman__stats">
      <p>Wins: {wins} Losses: {losses}</p>
      <p>Wins Percentage: {winPercentage.toFixed(2)}%</p>
    </div>
  );
};

export default Stats;

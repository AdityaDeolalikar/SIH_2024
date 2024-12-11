import React, { useState } from 'react';
import { Achievements } from '../../components/dashboard';

const AchievementsPage = () => {
  const [achievements] = useState([
    {
      id: 1,
      type: 'Research Paper Publication',
      date: '2024-03-15',
      document: 'research_paper.pdf'
    },
    {
      id: 2,
      type: 'Patent Filed',
      date: '2024-02-20',
      document: 'patent_filing.pdf'
    },
    {
      id: 3,
      type: 'Hackathon Winner',
      date: '2024-01-10',
      document: 'certificate.pdf'
    },
    {
      id: 4,
      type: 'International Conference',
      date: '2023-12-05',
      document: 'conference_paper.pdf'
    }
  ]);

  return <Achievements achievements={achievements} />;
};

export default AchievementsPage; 
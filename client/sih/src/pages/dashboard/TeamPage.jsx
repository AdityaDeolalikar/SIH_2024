import React, { useState } from 'react';
import { Team } from '../../components/dashboard';

const TeamPage = () => {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Tech Innovators',
      projectType: 'Web Development',
      description: 'Building innovative web solutions',
      members: ['John Doe', 'Jane Smith', 'Mike Johnson']
    }
  ]);

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = teamMembers.map((member, i) => 
      i === index ? value : member
    );
    setTeamMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(team => team.id !== teamId));
    }
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: teamName,
      projectType,
      description: teamDescription,
      members: teamMembers.filter(member => member.trim() !== '')
    };
    setTeams([...teams, newTeam]);
    
    // Reset form
    setTeamName('');
    setProjectType('');
    setTeamDescription('');
    setTeamMembers(['']);
    setShowTeamForm(false);
  };

  return (
    <Team
      teams={teams}
      showTeamForm={showTeamForm}
      setShowTeamForm={setShowTeamForm}
      teamName={teamName}
      setTeamName={setTeamName}
      projectType={projectType}
      setProjectType={setProjectType}
      teamDescription={teamDescription}
      setTeamDescription={setTeamDescription}
      teamMembers={teamMembers}
      handleAddMember={handleAddMember}
      handleRemoveMember={handleRemoveMember}
      handleMemberChange={handleMemberChange}
      handleTeamSubmit={handleTeamSubmit}
      handleDeleteTeam={handleDeleteTeam}
    />
  );
};

export default TeamPage; 
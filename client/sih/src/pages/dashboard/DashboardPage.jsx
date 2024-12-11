import React, { useState } from 'react';
import { Dashboard } from '../../components/dashboard';

const DashboardPage = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    class: "BE Computer Engineering",
    rollNo: "21CE1234",
    division: "A",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123, College Road, Mumbai, Maharashtra - 400001",
    parentPhone: "+91 9876543211"
  });
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedStudentInfo, setEditedStudentInfo] = useState(studentInfo);

  const handleEditInfoSubmit = (e) => {
    e.preventDefault();
    setStudentInfo(editedStudentInfo);
    setIsEditingInfo(false);
  };

  const handleInfoChange = (field, value) => {
    setEditedStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dashboard
      studentInfo={studentInfo}
      isEditingInfo={isEditingInfo}
      setIsEditingInfo={setIsEditingInfo}
      editedStudentInfo={editedStudentInfo}
      setEditedStudentInfo={setEditedStudentInfo}
      handleEditInfoSubmit={handleEditInfoSubmit}
      handleInfoChange={handleInfoChange}
    />
  );
};

export default DashboardPage; 
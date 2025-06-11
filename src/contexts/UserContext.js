import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  const addFamilyMember = (member) => {
    setFamilyMembers([...familyMembers, { ...member, id: Date.now().toString() }]);
  };

  const selectUser = (userId) => {
    const selected = familyMembers.find(member => member.id === userId);
    setCurrentUser(selected);
  };

  return (
    <UserContext.Provider value={{ 
      familyMembers, 
      addFamilyMember, 
      currentUser, 
      selectUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};
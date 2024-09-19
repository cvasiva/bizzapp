/* eslint-disable prettier/prettier */
import React, {createContext, useState, useContext} from 'react';

// Define the initial state for the context
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Define a provider component
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

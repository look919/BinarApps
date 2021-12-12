import React, { FC, useState } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface ContextValues {
  name: string;
  isNameProvided: boolean;
  handleChangeName: (e: InputEvent) => void;
}

const UserContext = React.createContext<ContextValues | undefined>(undefined);

const UserContextProvider: FC = ({ children }) => {
  const [name, setName] = useState('');
  const isNameProvided = Boolean(name);

  const handleChangeName = (e: InputEvent) => setName(e.target.value);

  const value = {
    name,
    isNameProvided,
    handleChangeName
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}

export { UserContextProvider, useUserContext };

import React, { createContext, useContext, useState, useEffect } from 'react';


const StringContext = createContext();


export const useString = () => {
  return useContext(StringContext);
};
export const StringProvider = ({ children }) => {
 
  const [sharedString, setSharedString] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sharedString') || '';
    }
    return '';
  });

  
  useEffect(() => {
    if (sharedString) {
      localStorage.setItem('sharedString', sharedString);
    }
  }, [sharedString]);
  const updateString = (newString) => {
    setSharedString(newString);
  };

  return (
    <StringContext.Provider value={{ sharedString, updateString }}>
      {children}
    </StringContext.Provider>
  );
};

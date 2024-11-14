import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState({
        nome: '',
        sobreNome: '',
        email: '',
        status: ''
    });

  return (
    <AppContext.Provider value={{dataUser, setDataUser}}>
      {children}
    </AppContext.Provider>
  )
}

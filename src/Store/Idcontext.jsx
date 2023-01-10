import { createContext, useState } from 'react';


export const IdContext = createContext([]);


function Id({ children }) {

  const [id, setId] = useState('');

  return (

    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  )
}


export default Id;
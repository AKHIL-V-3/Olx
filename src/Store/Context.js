import  {createContext,useState} from 'react';


export const Authcontext = createContext('AKHIL V');
export const FirebaseContext =createContext(null);

// export const idContext = createContext(null);

 
 
// export const  IdContext = ({children})=>{

//     const [id,setId] = useState('');

//     return (
        
//         <idContext.Provider value={{id,setId}}>
//                {children}
//         </idContext.Provider>
//     )
// }




export default function Context ({children}){

      const [user,setUser] = useState('');

      return (
          
          <Authcontext.Provider value={{user,setUser}}>
                 {children}
          </Authcontext.Provider>
      )
}


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './Store/Context';
import { app } from './Store/Firebase';

import  Context from './Store/Context'



ReactDOM.render(
  

  <FirebaseContext.Provider value={app}>
 <Context>

  <App />

</Context>
</FirebaseContext.Provider>



, document.getElementById('root'));

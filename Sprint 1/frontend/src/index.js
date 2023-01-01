import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CourseContextprovider} from './Context/CourseContext';
import { LoginContextProvider } from './Context/LoginContext';
import { LoginContextProviderinst } from './Context/LoginContextins';
import { LoginContextProvidertrainee } from './Context/LoginContextTrainee';
import { LoginContextProvideradmin } from './Context/LoginContextadmin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvideradmin>
    <LoginContextProvidertrainee>
     <LoginContextProviderinst>
    <LoginContextProvider>
      <CourseContextprovider>
        <App />
      </CourseContextprovider>
    </LoginContextProvider>
  </LoginContextProviderinst>
  </LoginContextProvidertrainee>
  </LoginContextProvideradmin>
  </React.StrictMode>
);


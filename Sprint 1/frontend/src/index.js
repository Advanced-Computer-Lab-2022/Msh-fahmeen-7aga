import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CourseContextprovider} from './Context/CourseContext';
import { LoginContextProvider } from './Context/LoginContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <CourseContextprovider>
        <App />
      </CourseContextprovider>
    </LoginContextProvider>
  </React.StrictMode>
);


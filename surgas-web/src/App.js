import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

document.title = 'Surgas de Antioquia';

//const store = ConfigureStore();

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
  );
}

export default App;
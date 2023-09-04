import React from 'react';
import './App.css';
import VersionsEditor from './VersionsEditor';
import { VersionsControl } from './components';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <div className='App'>
        <header className='App-header'>Tactile React Interview Test</header>
        <main className='App-main'>
          <VersionsEditor />
          <VersionsControl />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

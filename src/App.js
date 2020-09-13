import React from 'react';
import './App.css';
import WPService from './services/wp';
import ContentProvider from './providers/content.provider';
import LiveEditor from './components/liveeditor/LiveEditor';
import PropertyEditor from './components/propertyeditor/PropertyEditor';

function App() {
  const wpService = new WPService();
  return (
    <ContentProvider pageService={wpService}>
      <LiveEditor/>
      <PropertyEditor/>
    </ContentProvider>
  );
}

export default App;

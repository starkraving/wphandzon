import React from 'react';
import './App.css';
import WPService from './services/wp';
import ContentProvider from './providers/content.provider';
import LiveEditor from './components/liveeditor/LiveEditor';
import PropertyEditor from './components/propertyeditor/PropertyEditor';
import ModalProvider from './providers/modal.provider';

function App() {
  const wpService = new WPService();
  return (
    <ContentProvider pageService={wpService}>
      <ModalProvider>
        <LiveEditor/>
      </ModalProvider>
      <PropertyEditor/>
    </ContentProvider>
  );
}

export default App;

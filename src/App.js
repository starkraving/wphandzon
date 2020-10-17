import React from 'react';
import './App.css';
import WPService from './services/wp';
import ContentProvider from './providers/content.provider';
import LiveEditor from './components/liveeditor/LiveEditor';
import PropertyEditor from './components/propertyeditor/PropertyEditor';
import ModalProvider from './providers/modal.provider';
import EditorProvider from './providers/editor.provider';

function App() {
  const wpService = new WPService();
  return (
    <ContentProvider pageService={wpService}>
      <EditorProvider>
        <ModalProvider>
          <LiveEditor/>
        </ModalProvider>
      </EditorProvider>
      <PropertyEditor/>
    </ContentProvider>
  );
}

export default App;

import React from 'react';
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import ListTools from './ListTools';
import DndArea from './DndArea';

import './App.css';

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <div className="app-wrapper">
 
      <ListTools />
      <DndArea />
   
    </div>
  </DndProvider>
);

export default App;
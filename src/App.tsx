import React from 'react';
import 'normalize.css/normalize.css';
import './App.module.scss';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Root } from './Root/Root';
import {LayoutContent} from './transactiontable/tables'

function App() {
  // return <Root />;
  return <LayoutContent />;
}

export default App;

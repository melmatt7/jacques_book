import React from 'react';
import 'normalize.css/normalize.css';
import './App.module.scss';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Root } from './Root/Root';
import {LayoutContent} from './transactiontable/tables'
import {Home} from './home/home'

function App() {
  // return <Root />;
  return <Home />;
}

export default App;

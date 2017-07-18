
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css';
import Root from './components/root';

render(<Root/>, document.querySelector('#main'));
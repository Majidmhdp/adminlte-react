import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from '@store/store';

import { BrowserRouter } from 'react-router-dom';

import './shared/lib/utils/i18n';
import './index.scss';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
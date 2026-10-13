import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LocaleProvider } from './i18n'
import LinksPage from './components/pages/LinksPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/^[\/]+links[\/]*$/i.test(window.location.pathname) ? (
      <LinksPage />
    ) : (
      <LocaleProvider>
        <App />
      </LocaleProvider>
    )}
  </React.StrictMode>,
)

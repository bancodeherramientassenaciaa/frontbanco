import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { MediosApp } from './MediosApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MediosApp />
  </React.StrictMode>,
)

// Minor change to trigger deployment
console.log('Triggering frontend deployment');

// Additional change to force Vercel deployment
console.log('Force deployment update');

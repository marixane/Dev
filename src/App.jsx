import { useState } from 'react';
import App6 from './App6.jsx';

export default function App() {
  const [zoom, setZoom] = useState(100);
  const changeZoom = () => setZoom((current) => current === 100 ? 55 : current === 55 ? 45 : 100);

  return <div className={`site-preview-zoom site-preview-zoom-${zoom}`}>
    <button type="button" className="global-preview-zoom-button" onClick={changeZoom}>Zoom affichage pages : {zoom}%</button>
    <App6 />
  </div>;
}

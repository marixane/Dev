import React, { useEffect, useState } from 'react';

function ErrorBox({ error }) {
  return (
    <div style={{ padding: 40, color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h1>Erreur Safari au chargement de App6</h1>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#111827', padding: 16, borderRadius: 8 }}>
        {String(error && (error.stack || error.message || error))}
      </pre>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('App render error:', error);
  }

  render() {
    if (this.state.error) {
      return <ErrorBox error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default function App() {
  const [LoadedApp, setLoadedApp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    import('./App6.jsx')
      .then((module) => {
        setLoadedApp(() => module.default);
      })
      .catch((err) => {
        console.error('App6 import error:', err);
        setError(err);
      });
  }, []);

  if (error) return <ErrorBox error={error} />;

  if (!LoadedApp) {
    return (
      <div style={{ padding: 40, color: 'white', fontFamily: 'Arial, sans-serif' }}>
        Chargement de App6...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <LoadedApp />
    </ErrorBoundary>
  );
}

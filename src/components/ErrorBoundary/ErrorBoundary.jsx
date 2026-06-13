import React, { Component } from 'react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer} role="alert" aria-live="assertive">
          <div className={styles.errorCard}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.warningIcon} aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h1 className={styles.title}>System Malfunction</h1>
            <p className={styles.message}>
              A cosmic system error occurred while cruising. The diagnostic logs report a rendering collision.
            </p>
            <div className={styles.detailsBox}>
              <div className={styles.summaryTitle}>Diagnostic Logs</div>
              <pre className={styles.errorDetails}>
                {this.state.error?.toString() || 'Unknown rendering error'}
              </pre>
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={this.handleReset} className={styles.resetBtn}>
                Restart Thrusters (Go Home)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

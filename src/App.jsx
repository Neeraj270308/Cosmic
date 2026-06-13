import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { AppRoutes } from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Navbar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <AppRoutes />
          </div>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;

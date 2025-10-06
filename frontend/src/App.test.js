import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the main header', () => {
    render(<App />);
    expect(screen.getByText(/CarbonChain - Blue Carbon Registry/i)).toBeInTheDocument();
  });

  it('displays all navigation steps', () => {
    render(<App />);
    expect(screen.getByText(/Initial Assessment/i)).toBeInTheDocument();
    expect(screen.getByText(/Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/Blockchain Registry/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Contracts/i)).toBeInTheDocument();
    expect(screen.getByText(/Carbon Marketplace/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact Dashboard/i)).toBeInTheDocument();
  });

  it('starts with Initial Assessment step active', () => {
    render(<App />);
    const activeStep = document.querySelector('.step.active');
    expect(activeStep).toHaveTextContent('1');
  });

  it('allows navigation between steps', () => {
    render(<App />);
    const steps = document.querySelectorAll('.step');
    
    // Click on step 2
    fireEvent.click(steps[1]);
    
    // Check if step 2 is now active
    expect(steps[1]).toHaveClass('active');
  });

  it('renders footer with copyright', () => {
    render(<App />);
    expect(screen.getByText(/© 2024 CarbonChain/i)).toBeInTheDocument();
  });
});

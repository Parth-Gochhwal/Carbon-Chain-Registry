import React, { useState } from 'react';
import InitialAssessment from './components/InitialAssessment';
import VerificationSteps from './components/VerificationSteps';
import BlockchainRegistry from './components/BlockchainRegistry';
import SmartContracts from './components/SmartContracts';
import CarbonMarketplace from './components/CarbonMarketplace';
import ImpactDashboard from './components/ImpactDashboard';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState(null);

  const steps = [
    { id: 1, name: 'Initial Assessment', component: InitialAssessment },
    { id: 2, name: 'Verification', component: VerificationSteps },
    { id: 3, name: 'Blockchain Registry', component: BlockchainRegistry },
    { id: 4, name: 'Smart Contracts', component: SmartContracts },
    { id: 5, name: 'Carbon Marketplace', component: CarbonMarketplace },
    { id: 6, name: 'Impact Dashboard', component: ImpactDashboard }
  ];

  const handleStepComplete = (data) => {
    setProjectData(prev => ({ ...prev, ...data }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const CurrentComponent = steps[currentStep - 1].component;

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>🌊 CarbonChain - Blue Carbon Registry</h1>
          <p>Revolutionizing Carbon Credit Management with Blockchain Technology</p>
        </div>
      </header>

      <nav className="step-navigation">
        <div className="container">
          <div className="steps">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`step ${currentStep === step.id ? 'active' : ''} ${
                  currentStep > step.id ? 'completed' : ''
                }`}
                onClick={() => handleStepChange(step.id)}
              >
                <div className="step-number">{step.id}</div>
                <div className="step-name">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <CurrentComponent
            projectData={projectData}
            onComplete={handleStepComplete}
            onNext={() => handleStepComplete({})}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 CarbonChain - Blue Carbon Registry Platform</p>
          <p>Powered by Aptos Blockchain & Real-time Market Data</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

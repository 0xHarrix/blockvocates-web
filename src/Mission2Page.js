import React, { useState } from 'react';
import Step1 from './components/mission2/Step1';
import Step2 from './components/mission2/Step2';
import Step3 from './components/mission2/Step3';
import Step4 from './components/mission2/Step4';
import Step5 from './components/mission2/Step5';

const Mission1Page = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return <Step1 nextStep={() => setStep(step + 1)} />;
      case 2:
        return <Step2 nextStep={() => setStep(step + 1)} prevStep={() => setStep(step - 1)} />;
      case 3:
        return <Step3 nextStep={() => setStep(step + 1)} prevStep={() => setStep(step - 1)} />;
      case 4:
        return <Step4 nextStep={() => setStep(step + 1)} prevStep={() => setStep(step - 1)} />;
      case 5:
        return <Step5 prevStep={() => setStep(step - 1)} />;
      default:
        return <Step1 nextStep={() => setStep(step + 1)} />;
    }
  };

  return (
    <div className='bg1'>
    {renderStep()}
    </div>
  );
};

export default Mission1Page;

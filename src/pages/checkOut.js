import React, { useState } from 'react';
import CustomerDetails from './customerDetails';
import PaymentMethod from './paymentMethode';
import Confirmation from './confirmation';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <CustomerDetails nextStep={nextStep} />;
    case 2:
      return <PaymentMethod nextStep={nextStep} previousStep={previousStep} />;
    case 3:
      return <Confirmation />;
    default:
      return <CustomerDetails nextStep={nextStep} />;
  }
};

export default Checkout;

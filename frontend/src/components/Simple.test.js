import React from 'react';
import { render } from '@testing-library/react';
import InitialAssessment from './InitialAssessment';

describe('InitialAssessment Component', () => {
  it('renders without crashing', () => {
    render(<InitialAssessment />);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddPersonForm from '../components/AddPersonForm';

describe('AddPersonForm', () => {
  let props;

  beforeEach(() => {
    props = {
      firstName: '',
      lastName: '',
      onFirstNameChange: jest.fn(),
      onLastNameChange: jest.fn(),
      onSubmit: jest.fn(),
      isDisabled: false,
    };
  });

  test('updates input values when user types', () => {
    render(<AddPersonForm {...props} />);

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    expect(props.onFirstNameChange).toHaveBeenCalledWith('Jane');

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(props.onLastNameChange).toHaveBeenCalledWith('Doe');
  });

  // Other tests where you render <AddPersonForm {...props} /> similarly
});
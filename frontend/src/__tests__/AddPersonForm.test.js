import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddPersonForm from '../components/AddPersonForm';

describe('AddPersonForm', () => {
  const setup = (overrides = {}) => {
    const values = overrides.values || { firstName: '', lastName: '' };
    const handleChange = overrides.handleChange || jest.fn();
    const onSubmit = overrides.onSubmit || jest.fn();
    const isDisabled = overrides.isDisabled || false;

    render(
      <AddPersonForm
        values={values}
        handleChange={handleChange}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
      />
    );

    return {
      firstNameInput: screen.getByPlaceholderText(/first name/i),
      lastNameInput: screen.getByPlaceholderText(/last name/i),
      submitButton: screen.getByRole('button', { name: /add person/i }),
      handleChange,
      onSubmit,
    };
  };

  test('updates input values when user types', () => {
    const handleChange = jest.fn();
    const { firstNameInput, lastNameInput } = setup({ handleChange });

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    expect(handleChange).toHaveBeenCalledWith('firstName', 'Jane');

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(handleChange).toHaveBeenCalledWith('lastName', 'Doe');
  });

  test('calls onSubmit handler when form is submitted', () => {
    const onSubmit = jest.fn();
    const { submitButton } = setup({ onSubmit });

    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  test('disables button when isDisabled is true', () => {
    const { submitButton } = setup({ isDisabled: true });
    expect(submitButton).toBeDisabled();
  });
});
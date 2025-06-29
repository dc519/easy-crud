import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddPersonForm from '../components/AddPersonForm';

describe('AddPersonForm', () => {
  const setup = (propsOverrides = {}) => {
    const props = {
      firstName: '',
      lastName: '',
      onFirstNameChange: jest.fn(),
      onLastNameChange: jest.fn(),
      onSubmit: jest.fn((e) => e.preventDefault()),
      isAnyEditing: false,
      ...propsOverrides,
    };

    const utils = render(<AddPersonForm {...props} />);
    return { ...utils, props };
  };

  it('renders input fields and submit button', () => {
    setup();

    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add person/i })).toBeInTheDocument();
  });

  it('calls change handlers when input values change', () => {
    const { props } = setup();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'Jane' },
    });
    expect(props.onFirstNameChange).toHaveBeenCalledWith('Jane');

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Doe' },
    });
    expect(props.onLastNameChange).toHaveBeenCalledWith('Doe');
  });

  it('calls onSubmit handler when form is submitted', () => {
    const { props } = setup({
      firstName: 'Jane',
      lastName: 'Doe',
    });

    fireEvent.click(screen.getByRole('button', { name: /add person/i }));
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('disables button when editing is in progress', () => {
    setup({ isAnyEditing: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onSubmit when either first or last name is empty', () => {
    const { props } = setup({
      firstName: '',
      lastName: '',
    });

    fireEvent.click(screen.getByRole('button', { name: /add person/i }));
    expect(props.onSubmit).not.toHaveBeenCalled();
  });
});
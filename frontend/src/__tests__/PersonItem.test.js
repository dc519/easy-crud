import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonItem from '../components/PersonItem';

describe('PersonItem', () => {
  const person = { _id: '1', firstName: 'John', lastName: 'Doe' };

  const defaultProps = {
    person,
    isEditing: false,
    editFirstName: '',
    editLastName: '',
    onEditFirstNameChange: jest.fn(),
    onEditLastNameChange: jest.fn(),
    onEditSubmit: jest.fn((e) => e.preventDefault()),
    onCancelEdit: jest.fn(),
    onStartEdit: jest.fn(),
    onDelete: jest.fn(),
    isAnyEditing: false,
  };

  const setup = (props = {}) => {
    const utils = render(<PersonItem {...defaultProps} {...props} />);
    return {
      ...utils,
      props: { ...defaultProps, ...props },
    };
  };

  it('displays first and last name when not editing', () => {
    setup();
    expect(screen.getByText(/First name: John/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name: Doe/i)).toBeInTheDocument();
  });

  it('calls onStartEdit when Edit button is clicked', () => {
    const { props } = setup();
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(props.onStartEdit).toHaveBeenCalled();
  });

  it('calls onDelete when Delete button is clicked', () => {
    const { props } = setup();
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(props.onDelete).toHaveBeenCalled();
  });

  it('disables Edit and Delete buttons when isAnyEditing is true', () => {
    setup({ isAnyEditing: true });
    expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });

  it('renders input fields when in edit mode', () => {
    setup({ isEditing: true, editFirstName: 'Jane', editLastName: 'Smith' });
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
  });

  it('calls onEditFirstNameChange and onEditLastNameChange when inputs change', () => {
    const { props } = setup({ isEditing: true });
    fireEvent.change(screen.getByPlaceholderText(/First name/i), {
      target: { value: 'UpdatedFirst' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last name/i), {
      target: { value: 'UpdatedLast' },
    });
    expect(props.onEditFirstNameChange).toHaveBeenCalledWith('UpdatedFirst');
    expect(props.onEditLastNameChange).toHaveBeenCalledWith('UpdatedLast');
  });

  it('calls onEditSubmit when Save is clicked', () => {
    const { props } = setup({ isEditing: true });
    fireEvent.submit(screen.getByTestId('edit-form'));
      expect(props.onEditSubmit).toHaveBeenCalled();
  });

  it('calls onCancelEdit when Cancel is clicked', () => {
    const { props } = setup({ isEditing: true });
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(props.onCancelEdit).toHaveBeenCalled();
  });
});
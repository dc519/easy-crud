import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PersonItem from '../components/PersonItem';

describe('PersonItem', () => {
  const mockPerson = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
  };

  const defaultProps = {
    person: mockPerson,
    isEditing: false,
    editFirstName: '',
    editLastName: '',
    onEditFirstNameChange: jest.fn(),
    onEditLastNameChange: jest.fn(),
    onEditSubmit: jest.fn(),
    onCancelEdit: jest.fn(),
    onStartEdit: jest.fn(),
    onDelete: jest.fn(),
    isAnyEditing: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders person details when not editing', () => {
    render(<PersonItem {...defaultProps} />);

    expect(screen.getByText(/First name: John/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name: Doe/i)).toBeInTheDocument();

    // Edit and Delete buttons should be enabled
    expect(screen.getByRole('button', { name: /edit/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /delete/i })).toBeEnabled();
  });

  it('disables buttons when isAnyEditing is true', () => {
    render(<PersonItem {...defaultProps} isAnyEditing={true} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });

  it('calls onStartEdit when Edit button is clicked', () => {
    render(<PersonItem {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(defaultProps.onStartEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(<PersonItem {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('renders edit form when isEditing is true', () => {
    render(
      <PersonItem
        {...defaultProps}
        isEditing={true}
        editFirstName="Jane"
        editLastName="Smith"
      />
    );

    expect(screen.getByPlaceholderText(/first name/i)).toHaveValue('Jane');
    expect(screen.getByPlaceholderText(/last name/i)).toHaveValue('Smith');

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onEditFirstNameChange when first name input changes', () => {
    render(
      <PersonItem
        {...defaultProps}
        isEditing={true}
        editFirstName="Jane"
        editLastName="Smith"
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'Janet' },
    });
    expect(defaultProps.onEditFirstNameChange).toHaveBeenCalledWith('Janet');
  });

  it('calls onEditLastNameChange when last name input changes', () => {
    render(
      <PersonItem
        {...defaultProps}
        isEditing={true}
        editFirstName="Jane"
        editLastName="Smith"
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Doe' },
    });
    expect(defaultProps.onEditLastNameChange).toHaveBeenCalledWith('Doe');
  });

  it('calls onEditSubmit when the edit form is submitted', () => {
    render(
      <PersonItem
        {...defaultProps}
        isEditing={true}
        editFirstName="Jane"
        editLastName="Smith"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
      expect(defaultProps.onEditSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onCancelEdit when Cancel button is clicked', () => {
    render(
      <PersonItem
        {...defaultProps}
        isEditing={true}
        editFirstName="Jane"
        editLastName="Smith"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(defaultProps.onCancelEdit).toHaveBeenCalledTimes(1);
  });
});
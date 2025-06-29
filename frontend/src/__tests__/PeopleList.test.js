import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PeopleList from '../components/PeopleList';

const mockPeople = [
  { _id: '1', firstName: 'John', lastName: 'Doe' },
  { _id: '2', firstName: 'Jane', lastName: 'Smith' },
];

const defaultProps = {
  people: mockPeople,
  editingId: null,
  editFirstName: '',
  editLastName: '',
  setEditFirstName: jest.fn(),
  setEditLastName: jest.fn(),
  submitEdit: jest.fn(),
  cancelEdit: jest.fn(),
  startEdit: jest.fn(),
  removePerson: jest.fn(),
};

describe('PeopleList', () => {
  it('renders a PersonItem for each person', () => {
    render(<PeopleList {...defaultProps} />);
    const items = screen.getAllByText(/First name:/i);
    expect(items).toHaveLength(mockPeople.length);
  });

  it('calls startEdit when Edit button is clicked', () => {
    render(<PeopleList {...defaultProps} />);
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(defaultProps.startEdit).toHaveBeenCalledWith(mockPeople[0]);
  });

  it('calls removePerson when Delete button is clicked', () => {
    render(<PeopleList {...defaultProps} />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[1]);
    expect(defaultProps.removePerson).toHaveBeenCalledWith(mockPeople[1]._id);
  });

  it('shows input fields and calls setters during editing', () => {
    const editingPerson = mockPeople[0];
    render(
      <PeopleList
        {...defaultProps}
        editingId={editingPerson._id}
        editFirstName={editingPerson.firstName}
        editLastName={editingPerson.lastName}
      />
    );

    const firstNameInput = screen.getByDisplayValue(editingPerson.firstName);
    const lastNameInput = screen.getByDisplayValue(editingPerson.lastName);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();

    fireEvent.change(firstNameInput, { target: { value: 'NewFirst' } });
    fireEvent.change(lastNameInput, { target: { value: 'NewLast' } });

    expect(defaultProps.setEditFirstName).toHaveBeenCalledWith('NewFirst');
    expect(defaultProps.setEditLastName).toHaveBeenCalledWith('NewLast');
  });

  it('calls submitEdit on form submission', () => {
    const editingPerson = mockPeople[0];
    render(
      <PeopleList
        {...defaultProps}
        editingId={editingPerson._id}
        editFirstName={editingPerson.firstName}
        editLastName={editingPerson.lastName}
      />
    );

    fireEvent.submit(screen.getByTestId('edit-form'));
    expect(defaultProps.submitEdit).toHaveBeenCalled();
  });

  it('calls cancelEdit when Cancel button clicked', () => {
    const editingPerson = mockPeople[0];
    render(
      <PeopleList
        {...defaultProps}
        editingId={editingPerson._id}
        editFirstName={editingPerson.firstName}
        editLastName={editingPerson.lastName}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(defaultProps.cancelEdit).toHaveBeenCalled();
  });
});
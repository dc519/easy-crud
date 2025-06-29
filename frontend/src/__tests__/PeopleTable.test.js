import React from 'react';
import { render, screen } from '@testing-library/react';
import PeopleTable from '../components/PeopleTable';

describe('PeopleTable', () => {
  it('renders a table with people data', () => {
    const people = [
      { _id: '1', firstName: 'John', lastName: 'Doe' },
      { _id: '2', firstName: 'Jane', lastName: 'Smith' }
    ];

    render(<PeopleTable people={people} />);

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
  });

  it('renders a fallback message if the people list is empty', () => {
    render(<PeopleTable people={[]} />);
    expect(screen.getByText(/there aren't any people to show yet/i)).toBeInTheDocument();
  });
});
import React from 'react';

export default function PeopleTable({ people }) {
  if (people.length === 0) {
    return <p>There aren't any people to show yet.</p>;
  }

  return (
    <table className="people-table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person._id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
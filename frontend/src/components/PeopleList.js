import React from 'react';
import PersonItem from './PersonItem';

export default function PeopleList({
  people,
  editingId,
  editFirstName,
  editLastName,
  setEditFirstName,
  setEditLastName,
  submitEdit,
  cancelEdit,
  startEdit,
  removePerson,
}) {
  return (
    <ul className="people-list">
      {people.map((person) => (
        <li key={person._id} className="people-item">
          <PersonItem
            person={person}
            isEditing={editingId === person._id}
            editFirstName={editFirstName}
            editLastName={editLastName}
            onEditFirstNameChange={setEditFirstName}
            onEditLastNameChange={setEditLastName}
            onEditSubmit={submitEdit}
            onCancelEdit={cancelEdit}
            onStartEdit={() => startEdit(person)}
            onDelete={() => removePerson(person._id)}
            isAnyEditing={editingId !== null}
          />
        </li>
      ))}
    </ul>
  );
}
import React from 'react';
import '../admin.css';

export default function AddPersonForm({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onSubmit,
  isAnyEditing,
}) {
  return (
    <form onSubmit={onSubmit} className="add-person-form">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        required
        disabled={isAnyEditing} // Disable input when a block is being edited
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        required
        disabled={isAnyEditing} // Disable input when a block is being edited
      />
      <button type="submit" disabled={isAnyEditing}>
        Add person
      </button>
    </form>
  );
}

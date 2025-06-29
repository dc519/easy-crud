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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="add-person-form">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        required
        disabled={isAnyEditing}
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        required
        disabled={isAnyEditing}
      />
      <button type="submit" disabled={isAnyEditing}>
        Add person
      </button>
    </form>
  );
}
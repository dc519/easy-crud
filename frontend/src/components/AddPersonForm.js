import React from 'react';
import '../admin.css';

export default function AddPersonForm({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onSubmit,
  isDisabled,
}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }} className="add-person-form">
      <input
        type="text"
        placeholder="First name"
        className="input-field"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        required
        disabled={isDisabled}
      />
      <input
        type="text"
        placeholder="Last name"
        className="input-field"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        required
        disabled={isDisabled}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isDisabled}
      >
        Add person
      </button>
    </form>
  );
}
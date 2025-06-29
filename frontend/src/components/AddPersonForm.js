import React from 'react';
import '../admin.css';

export default function AddPersonForm({ values, handleChange, onSubmit, isDisabled }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="add-person-form"
    >
      <input
        type="text"
        placeholder="First name"
        className="input-field"
        value={values.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        required
        disabled={isDisabled}
      />
      <input
        type="text"
        placeholder="Last name"
        className="input-field"
        value={values.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        required
        disabled={isDisabled}
      />
      <button type="submit" className="btn btn-primary" disabled={isDisabled}>
        Add person
      </button>
    </form>
  );
}
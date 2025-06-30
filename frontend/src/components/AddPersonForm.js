// src/components/AddPersonForm.js
import React from 'react';
//import '../admin.css';

export default function AddPersonForm({
  values,
  handleChange,
  handleSubmit,
  isDisabled,
  errors = {},
}) {
  return (
    <form onSubmit={handleSubmit} className="add-person-form">
      <input
        type="text"
        placeholder="First name"
        className="input-field"
        value={values.firstName}
        onChange={(e) => handleChange('firstName', e)}
        required
        disabled={isDisabled}
      />
      {errors.firstName && <div className="form-error">{errors.firstName}</div>}

      <input
        type="text"
        placeholder="Last name"
        className="input-field"
        value={values.lastName}
        onChange={(e) => handleChange('lastName', e)}
        required
        disabled={isDisabled}
      />
      {errors.lastName && <div className="form-error">{errors.lastName}</div>}

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
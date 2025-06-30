// src/hooks/useForm.js
import { useState } from 'react';

export default function useForm(initialValues = {}, onSubmitCallback) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(fieldName, valueOrEvent) {
    const value = valueOrEvent?.target?.value ?? valueOrEvent;

    setValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  function validate(validators = {}) {
    const newErrors = {};
    for (const [field, validator] of Object.entries(validators)) {
      const error = validator(values[field], values);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e, validators = {}) {
    if (e?.preventDefault) e.preventDefault();

    const isValid = validate(validators);
    if (!isValid) return false;

    if (onSubmitCallback) {
      await onSubmitCallback(values);
    }
    return true;
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
}
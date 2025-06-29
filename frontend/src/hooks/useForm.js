import { useState } from 'react';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  function handleChange(fieldName, value) {
    setValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function reset() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    reset,
  };
}
import { useState } from 'react';

export function usePersonForm(initialValues = { firstName: '', lastName: '' }, onSubmitCallback) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field) => (e) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: require both fields non-empty
    if (!values.firstName.trim() || !values.lastName.trim()) {
      // You can handle errors here if needed
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitCallback(values);
      // Reset form values after successful submit
      setValues(initialValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    onChange,
    onSubmit,
    isSubmitting,
    setValues,
    reset,
  };
}
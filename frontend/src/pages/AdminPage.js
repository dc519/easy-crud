// src/pages/AdminPage.js
import React from 'react';
import AddPersonForm from '../components/AddPersonForm';
import PeopleList from '../components/PeopleList';
import usePeople from '../hooks/usePeople';
import useForm from '../hooks/useForm';
import '../styles/admin.css';

export default function AdminPage() {
  const {
    people,
    addPerson,
    removePerson,
    editingId,
    editFirstName,
    editLastName,
    setEditFirstName,
    setEditLastName,
    submitEdit,
    startEdit,
    cancelEdit,
  } = usePeople();

  const { values, handleChange, handleSubmit, reset, errors } = useForm(
    { firstName: '', lastName: '' },
    async (formValues) => {
      await addPerson(formValues.firstName, formValues.lastName);
      reset();
    }
  );

  const validators = {
    firstName: (val) => (!val ? 'First name is required' : ''),
    lastName: (val) => (!val ? 'Last name is required' : ''),
  };

  return (
    <div className="people-container">
      <h1 className="admin-title">Admin</h1>
      <AddPersonForm
        values={values}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, validators)}
        errors={errors}
        isDisabled={editingId !== null}
      />
      <PeopleList
        people={people}
        editingId={editingId}
        editFirstName={editFirstName}
        editLastName={editLastName}
        setEditFirstName={setEditFirstName}
        setEditLastName={setEditLastName}
        submitEdit={submitEdit}
        cancelEdit={cancelEdit}
        startEdit={startEdit}
        removePerson={removePerson}
      />
    </div>
  );
}
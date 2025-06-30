import React from 'react';
import AddPersonForm from '../components/AddPersonForm';
import PeopleList from '../components/PeopleList';
import usePeople from '../hooks/usePeople';
import useForm from '../hooks/useForm';
import '../styles/admin.css'; //import '../admin.css';

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

  // Use useForm to manage firstName and lastName in one object
  const { values, handleChange, reset } = useForm({ firstName: '', lastName: '' });

  const handleSubmit = async () => {
    await addPerson(values.firstName, values.lastName);
    reset();
  };

  return (
    <div className="people-container">
      <h1 className="admin-title">Admin</h1>
      <AddPersonForm
        values={values}
        handleChange={handleChange}
        onSubmit={handleSubmit}
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
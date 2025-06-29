import React from 'react';
import AddPersonForm from '../components/AddPersonForm';
import PeopleList from '../components/PeopleList';
import usePeople from '../hooks/usePeople';
import '../admin.css';

export default function AdminPage() {
  const {
    people,
    firstName,
    lastName,
    setFirstName,
    setLastName,
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

  const handleSubmit = async () => {
    await addPerson(firstName, lastName);
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="people-container">
      <h1 className="admin-title">Admin</h1>
      <AddPersonForm
        firstName={firstName}
        lastName={lastName}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
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
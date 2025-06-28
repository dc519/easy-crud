import { useState, useEffect } from 'react';
import {
  fetchPeople,
  createPerson,
  deletePerson,
  updatePerson,
} from '../services/personService';

export default function usePeople() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');

  useEffect(() => {
    fetchPeople().then(setPeople);
  }, []);

  const addPerson = async (firstName, lastName) => {
    const newPerson = await createPerson(firstName, lastName);
    setPeople(prev => [...prev, newPerson]);
  };

  const removePerson = async (id) => {
    const confirmed = window.confirm('Delete this person?');
    if (!confirmed) return;
  
    await deletePerson(id);
    setPeople(prev => prev.filter(p => p._id !== id));
  };

  /*
  const removePerson = async (id) => {
    await deletePerson(id);
    setPeople(prev => prev.filter(p => p._id !== id));
  };
  */
  const submitEdit = async () => {
    const updated = await updatePerson(editingId, editFirstName, editLastName);
    setPeople(prev => prev.map(p => (p._id === editingId ? updated : p)));
    cancelEdit();
  };

  const startEdit = (person) => {
    setEditingId(person._id);
    setEditFirstName(person.firstName);
    setEditLastName(person.lastName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFirstName('');
    setEditLastName('');
  };

  return {
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
    firstName,
    lastName,
    setFirstName,
    setLastName,
  };
}
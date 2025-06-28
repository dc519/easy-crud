import React from 'react';
import usePeopleList from '../hooks/usePeopleList';
import PeopleTable from '../components/PeopleTable';
import '../index.css';

export default function ViewerPage() {
  const people = usePeopleList();

  return (
    <div className="container">
      <h1>Public</h1>
      <PeopleTable people={people} />
    </div>
  );
}
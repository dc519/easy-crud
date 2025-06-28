import { useEffect, useState } from 'react';

export default function usePeopleList() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('/api/people')
      .then(res => res.json())
      .then(setPeople);
  }, []);

  return people;
}
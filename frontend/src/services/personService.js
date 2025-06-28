const BASE_URL = '/api/people';

export async function fetchPeople() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createPerson(firstName, lastName) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName }),
  });
  return res.json();
}

export async function deletePerson(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function updatePerson(id, firstName, lastName) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName }),
  });
  return res.json();
}
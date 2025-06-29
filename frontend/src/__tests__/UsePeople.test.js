import { renderHook, act, waitFor } from '@testing-library/react';
import usePeople from '../hooks/usePeople';
import * as personService from '../services/personService';

jest.mock('../services/personService');

describe('usePeople hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty people list', async () => {
    personService.fetchPeople.mockResolvedValueOnce([]);

    const { result } = renderHook(() => usePeople());

    // Wait for state update where people becomes an array (empty here)
    await waitFor(() => expect(result.current.people).toEqual([]));
  });

  it('adds a person correctly', async () => {
    const newPerson = { _id: '1', firstName: 'John', lastName: 'Doe' };

    personService.fetchPeople.mockResolvedValueOnce([]);
    personService.createPerson.mockResolvedValueOnce(newPerson);

    const { result } = renderHook(() => usePeople());

    await waitFor(() => expect(result.current.people).toEqual([]));

    await act(async () => {
      await result.current.addPerson(newPerson.firstName, newPerson.lastName);
    });

    expect(result.current.people).toEqual([newPerson]);
  });
});
import React from 'react';
import '../admin.css';

export default function PersonItem({
  person,
  isEditing,
  editFirstName,
  editLastName,
  onEditFirstNameChange,
  onEditLastNameChange,
  onEditSubmit,
  onCancelEdit,
  onStartEdit,
  onDelete,
  isAnyEditing
}) {
  return (
    <div className="person-item-details">
      {isEditing ? (
        <form onSubmit={onEditSubmit} className="edit-form" data-testid="edit-form">          <input
            type="text"
            placeholder="First name"
            value={editFirstName}
            onChange={(e) => onEditFirstNameChange(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={editLastName}
            onChange={(e) => onEditLastNameChange(e.target.value)}
            required
          />
          <div className="action-buttons-confirmation-container">
            <button type="submit" className="button">
              Save
            </button>
            <button type="button" className="button cancel" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="person-and-action-buttons-container">
            <div className="person-container">
              <span>First name: {person.firstName}</span>
              <span>Last name: {person.lastName}</span>
            </div>
            <div className="action-buttons-container">
              <button className="button action-button edit" onClick={onStartEdit} disabled={isAnyEditing}>
                Edit
              </button>
              <button className="button action-button delete" onClick={onDelete} disabled={isAnyEditing}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
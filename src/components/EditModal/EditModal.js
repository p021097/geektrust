import React, { useState } from "react";
import styles from "./EditModal.module.css";

const EditModal = ({ handleEditSave, handleEditClose, admin }) => {
  const [editedAdmin, setEditedItem] = useState({ ...admin });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const handleSaveClick = () => {
    handleEditSave(editedAdmin);
    handleEditClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>Edit Admin Details</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedAdmin.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedAdmin.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={editedAdmin.role}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.modal_buttons}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleEditClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

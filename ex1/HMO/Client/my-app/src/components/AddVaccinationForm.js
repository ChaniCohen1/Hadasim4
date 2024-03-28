import React, { useState } from 'react';
import '../css/AddVaccinationForm.css';

const AddVaccinationForm = ({memberID, onAdd, onClose }) => {
  const [newVaccination, setNewVaccination] = useState({
    memberID: memberID,
    vaccination_date: '',
    vaccination_code: '',
    manufacturer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination({ ...newVaccination, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newVaccination);
    console.log(newVaccination)
    setNewVaccination({
      memberID: memberID,
      vaccination_date: '',
      vaccination_code: '',
      manufacturer: ''
    });
  };

  const handleClose = () => {
    onClose();
    setNewVaccination({
      memberID: memberID,
      vaccination_date: '',
      vaccination_code: '',
      manufacturer: ''
    });
  };

  return (
    <div className="add-vaccination-form">
      <div className="close-btn" onClick={handleClose}>X</div>
      <h3>הוספת חיסון חדש</h3>
      <form onSubmit={handleSubmit}>
        <label>
          תאריך חיסון:
          <input type="date" name="vaccination_date" value={newVaccination.vaccination_date} onChange={handleChange} />
        </label>
        <label>
          קוד חיסון:
          <input type="text" name="vaccination_code" value={newVaccination.vaccination_code} onChange={handleChange} />
        </label>
        <label>
          יצרן:
          <input type="text" name="manufacturer" value={newVaccination.manufacturer} onChange={handleChange} />
        </label>
        <button type="submit">הוספת חיסון</button>
      </form>
    </div>
  );
};

export default AddVaccinationForm;

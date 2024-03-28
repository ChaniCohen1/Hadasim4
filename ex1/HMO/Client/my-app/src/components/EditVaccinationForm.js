import React, { useState } from 'react';
import '../css/EditVaccinationForm.css';

const EditVaccinationForm = ({ vaccination, onUpdate, onClose }) => {
  const [updatedVaccination, setUpdatedVaccination] = useState(vaccination);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVaccination({ ...updatedVaccination, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedVaccination);
    console.log(updatedVaccination);
    setUpdatedVaccination({}); // איפוס ערכי השדות לריקים לאחר שליחת הטופס
    onClose();
  };

  const handleCancel = () => {
    setUpdatedVaccination({}); // איפוס ערכי השדות לריקים במקרה של ביטול
    onClose();
  };

  return (
    <div className="edit-vaccination-form">
      <h2>עריכת חיסון</h2>
      <form onSubmit={handleSubmit}>
        <label>יצרן:</label>
        <input
          type="text"
          name="manufacturer"
          value={updatedVaccination.manufacturer}
          onChange={handleChange}
        />
        <label>קוד חיסון:</label>
        <input
          type="text"
          name="vaccination_code"
          value={updatedVaccination.vaccination_code}
          onChange={handleChange}
        />
        <label>תאריך:</label>
        <input
          type="text"
          name="vaccination_date"
          value={updatedVaccination.vaccination_date}
          onChange={handleChange}
        />
        <button type="submit">עדכן</button>
        <button type="button" onClick={handleCancel}>ביטול</button>
      </form>
    </div>
  );
};

export default EditVaccinationForm;

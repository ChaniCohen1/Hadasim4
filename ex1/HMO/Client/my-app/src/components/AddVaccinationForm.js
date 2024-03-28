import React, { useState } from 'react';
import '../css/AddVaccinationForm.css';

const AddVaccinationForm = ({memberID, onAdd, onClose }) => {
  const [newVaccination, setNewVaccination] = useState({
    memberID: memberID,
    vaccination_date: '',
    vaccination_code: '',
    manufacturer: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newVaccination.vaccination_code && newVaccination.vaccination_date && newVaccination.manufacturer){
    onAdd(newVaccination);
    console.log(newVaccination)
    setNewVaccination({
      memberID: memberID,
      vaccination_date: '',
      vaccination_code: '',
      manufacturer: ''
    });
  }  else{
          alert('Please fill in all required fields.');
  }
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
          <input type="date" name="vaccination_date" value={newVaccination.vaccination_date} onChange={(e) => {setNewVaccination(prevState => ({ ...prevState, vaccination_date: e.target.value })); }} />
        </label>
        <label>
          קוד חיסון:
          <input type="text" name="vaccination_code" value={newVaccination.vaccination_code} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setNewVaccination(prevState => ({ ...prevState, vaccination_code: value })); }}  />
        </label>
        <label>
          יצרן:
          <input type="text" name="manufacturer" value={newVaccination.manufacturer} onChange={(e) => { const value = e.target.value.replace(/\d/g, ''); setNewVaccination(prevState => ({ ...prevState, manufacturer: value })); }}  />
        </label>
        <button type="submit">הוספת חיסון</button>
      </form>
    </div>
  );
};

export default AddVaccinationForm;

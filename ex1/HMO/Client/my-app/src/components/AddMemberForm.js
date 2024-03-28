import React, { useState } from 'react';
import '../css/AddMemberForm.css';

const AddMemberForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    memberID: '',
    first_name: '',
    last_name: '',
    city: '',
    street: '',
    house_number:'',
    birth_date: '',
    phone: '',
    cellular:'',
    illness_date: '',
    recovery_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.memberID && formData.first_name && formData.last_name && formData.city && formData.birth_date && formData.street && formData.house_number) {
      onAdd(formData);
      setFormData({
        memberID: '',
        first_name: '',
        last_name: '',
        city: '',
        street: '',
        house_number:'',
        birth_date: '',
        phone: '',
        cellular:'',
        illness_date: '',
        recovery_date: '',
      });
      onClose(); // Close the popup after adding a new member
    } else {
      alert('Please fill in all required fields.');
    }
  };


  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h2>הוספת חבר חדש</h2>
          <label>
            תז:
            <input type="text" name="memberID" value={formData.memberID} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setFormData(prevState => ({ ...prevState, memberID: value })); }} />
          </label>
          <br />
          <label>
             שם פרטי:
            <input type="text" name="first_name" value={formData.first_name} onChange={(e) => { const value = e.target.value.replace(/\d/g, ''); setFormData(prevState => ({ ...prevState, first_name: value })); }} />
          </label>
          <br />
          <label>
            שם משפחה:
            <input type="text" name="last_name" value={formData.last_name} onChange={(e) => { const value = e.target.value.replace(/\d/g, ''); setFormData(prevState => ({ ...prevState, last_name: value })); }} />
          </label>
          <br />
          <label>
            עיר:
            <input type="text" name="city" value={formData.city} onChange={(e) => { const value = e.target.value.replace(/\d/g, ''); setFormData(prevState => ({ ...prevState, city: value })); }} />
          </label>
          <br />
          <label>
            רחוב:
            <input type="text" name="street" value={formData.street} onChange={(e) => {setFormData(prevState => ({ ...prevState, street: e.target.value })); }} />
          </label>
          <br />
          <label>
            מספר בית:
            <input type="text" name="house_number" value={formData.house_number} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setFormData(prevState => ({ ...prevState, house_number: value })); }} />
          </label>
          <br />
          <label>
            תאריך לידה:
            <input type="date" name="birth_date" value={formData.birth_date} onChange={(e) => {setFormData(prevState => ({ ...prevState, birth_date: e.target.value })); }} />
          </label>
          <br />
          <label>
            טלפון:
            <input type="tel" name="phone" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setFormData(prevState => ({ ...prevState, phone: value })); }} />
          </label>
          <br />
          <label>
            נייד:
            <input type="tel" name="cellular" value={formData.cellular} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); setFormData(prevState => ({ ...prevState, cellular: value })); }}  />
          </label>
          <br />
          <label>
            תאריך מחלה:
            <input type="date" name="illness_date" value={formData.illness_date} onChange={(e) => {setFormData(prevState => ({ ...prevState, illness_date: e.target.value })); }} />
          </label>
          <br />
          <label>
            תאריך החלמה:
            <input type="date" name="recovery_date" value={formData.recovery_date} onChange={(e) => {setFormData(prevState => ({ ...prevState, recovery_date: e.target.value })); }} />
          </label>
          <br />
          <button type="submit">Add new member</button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;

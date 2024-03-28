import React, { useState } from 'react';

const AddMemberForm = ({ onAdd }) => {
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
      console.log(formData)
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
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>הוספת חבר חדש</h2>
      <label>
        id:
        <input type="text" name="memberID" value={formData.memberID} onChange={handleChange} />
      </label>
      <br />
      <label>
        first name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        last name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        city:
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </label>
      <br />
      <label>
        street:
        <input type="text" name="street" value={formData.street} onChange={handleChange} />
      </label>
      <br />
      <label>
        number house:
        <input type="text" name="house_number" value={formData.house_number} onChange={handleChange} />
      </label>
      <br />
      <label>
        birth date:
        <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
      </label>
      <br />
      <label>
        phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <br />
      <label>
        cellular:
        <input type="tel" name="cellular" value={formData.cellular} onChange={handleChange} />
      </label>
      <br />
      <label>
      positiveTestDate:
        <input type="date" name="illness_date" value={formData.illness_date} onChange={handleChange} />
      </label>
      <br />
      <label>
      recoveryDate:
        <input type="date" name="recovery_date" value={formData.recovery_date} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add new member</button>
    </form>
  );
};

export default AddMemberForm;

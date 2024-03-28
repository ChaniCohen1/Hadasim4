import React, { useState } from 'react';
import '../css/MemberDetails.css'; // ייבוא קובץ CSS
import VaccinationList from './VaccinationList'; // ייבוא קומפוננטה של VaccinationList

const MemberDetails = ({ member, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);
  const [showVaccinationList, setShowVaccinationList] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedMember);
    console.log(editedMember)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMember(member);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember({ ...editedMember, [name]: value });
  };

  const handleShowVaccinationList = () => {
    setShowVaccinationList(true);
  };

  return (
    <div className="member-details-container">
      {isEditing ? (
        <div className="edit-mode">
          <div className="edit-section">
            <label>שם פרטי</label>
            <input type="text" name="first_name" value={editedMember.first_name} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>שם משפחה</label>
            <input type="text" name="last_name" value={editedMember.last_name} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>תאריך לידה</label>
            <input type="text" name="birth_date" value={editedMember.birth_date} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>עיר</label>
            <input type="text" name="city" value={editedMember.city} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>רחוב</label>
            <input type="text" name="street" value={editedMember.street} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>מספר בית</label>
            <input type="text" name="house_number" value={editedMember.house_number} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>טלפון</label>
            <input type="tel" name="phone" value={editedMember.phone} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>נייד</label>
            <input type="tel" name="cellular" value={editedMember.cellular} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>תאריך מחלה</label>
            <input type="text" name="illness_date" value={editedMember.illness_date} onChange={handleChange} />
          </div>
          <div className="edit-section">
            <label>תאריך החלמה</label>
            <input type="text" name="recovery_date" value={editedMember.recovery_date} onChange={handleChange} />
          </div>


          {/* קבצים נוספים */}
          <div className="edit-buttons">
            <button onClick={handleSave}>שמירה</button>
            <button onClick={handleCancel}>ביטול</button>
          </div>
        </div>
      ) : (
        <div className="display-mode">
          <p><span className="details-label">תז</span> {editedMember.memberID}</p>
          <p><span className="details-label">שם פרטי</span> {editedMember.first_name}</p>
          <p><span className="details-label">שם משפחה</span> {editedMember.last_name}</p>
          <p><span className="details-label">תאריך לידה</span> {editedMember.birth_date}</p>
          <p><span className="details-label">עיר</span> {editedMember.city}</p>
          <p><span className="details-label">רחוב</span> {editedMember.street}</p>
          <p><span className="details-label">מספר בית</span> {editedMember.house_number}</p>
          <p><span className="details-label">טלפון</span> {editedMember.phone}</p>
          <p><span className="details-label">נייד</span> {editedMember.cellular}</p>
          <p><span className="details-label">תאריך מחלה</span> {editedMember.illness_date}</p>
          <p><span className="details-label">תאריך החלמה</span> {editedMember.recovery_date}</p>

          {/* קבצים נוספים */}
          <div className="buttons">
            <button onClick={handleEdit}>עריכה</button>
            <button onClick={() => onDelete(editedMember.memberID)}>מחיקה</button>
            <button onClick={handleShowVaccinationList}>חיסונים</button>
          </div>
        </div>
      )}
      {showVaccinationList && <VaccinationList memberID={editedMember.memberID} />}
    </div>
  );
};

export default MemberDetails;

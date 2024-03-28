import React, { useState, useEffect } from 'react';
import '../css/VaccinationList.css';
import AddVaccinationForm from './AddVaccinationForm';
import EditVaccinationForm from './EditVaccinationForm';

const VaccinationList = ({ memberID }) => {
  const [vaccinations, setVaccinations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null); // הוסף משתנה סטייט לקומפוננטה שמכיל את החיסון שנבחר לעריכה

useEffect(() => {
    fetchVaccinations(memberID);
  }, [memberID]);

  const fetchVaccinations = async (memberID) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/read_veccination_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberID })
      });
  
      if (!response.ok) {
        throw new Error('תגובת השרת לא הייתה תקינה');
      }
  
      const data = await response.json();
      console.log(data.vaccinations)
      // יצירת רשימת חיסונים חדשה עם השדות הרצויים בלבד, כולל vaccinationID
      const simplifiedVaccinations = data.vaccinations.map(vaccination => ({
        vaccinationID: vaccination.vaccination_id,
        manufacturer: vaccination.manufacturer,
        vaccination_code: vaccination.vaccination_code,
        vaccination_date: vaccination.vaccination_date
      }));
      setVaccinations(simplifiedVaccinations);
      console.log(simplifiedVaccinations);
    } catch (error) {
      console.error('שגיאה בקריאת רשימת החיסונים:', error);
    }
  };
  

const addVaccinations = async (vaccination) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/create_veccination', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ vaccination })
        });
  
        if (!response.ok) {
          throw new Error('תגובת השרת לא הייתה תקינה');
        }
  
        const data = await response.json();
        fetchVaccinations(vaccination.memberID);
        console.log(vaccination.memberID);
      } catch (error) {
        console.error('שגיאה בהוספת חיסון חדש', error);
      }
    };
   
    
const updateVaccination = async (vaccination) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_veccination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vaccination })
      });
      
        if (!response.ok) {
            throw new Error('תגובת השרת לא הייתה תקינה');
          }
      
        const data = await response.json();
        fetchVaccinations(memberID);
        console.log(data.message); // הדפסת הודעת השרת
        } catch (error) {
          console.error('שגיאה בעדכון חיסון:', error);
        }
    };
      


const deleteVaccination = async (vaccinationID) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/delete_veccination', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vaccinationID })
        });
    
        if (!response.ok) {
            throw new Error('תגובת השרת לא הייתה תקינה');
        }
    
        const data = await response.json();
        fetchVaccinations(memberID);
    } catch (error) {
        console.error('שגיאה במחיקת חיסון', error);
    }
};


const editVaccination = (vaccination) => {
    setSelectedVaccination(vaccination); // קבע את החיסון שנבחר לעריכה
    setShowPopup(true); // פתח את הפופאפ לעריכה
  };



const closePopup = () => {
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="vaccination-list">
      <h2>רשימת חיסונים</h2>
      <button onClick={() => setShowPopup(true)}>הוספה</button>
      {showPopup && (
        selectedVaccination ? ( // בדוק אם יש חיסון שנבחר לעריכה
          <EditVaccinationForm
            vaccination={selectedVaccination}
            onUpdate={updateVaccination}
            onClose={closePopup}
          />
        ) : (
          <AddVaccinationForm
            memberID={memberID}
            onAdd={addVaccinations}
            onClose={closePopup}
          />
        )
      )}
      <table>
        <thead>
          <tr>
            <th>יצרן</th>
            <th>קוד חיסון</th>
            <th>תאריך</th>
            <th>מספר סידורי</th>
            <th>עדכון</th>
            <th>מחיקה</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations.map((vaccination, index) => (
            <tr key={index}>
              <td>{vaccination.manufacturer}</td>
              <td>{vaccination.vaccination_code}</td>
              <td>{vaccination.vaccination_date}</td>
              <td>{vaccination.vaccinationID}</td>
              <td><button onClick={() => editVaccination(vaccination)}>עדכן</button></td>
              <td><button onClick={() => deleteVaccination(vaccination.vaccinationID)}>מחק</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default VaccinationList;

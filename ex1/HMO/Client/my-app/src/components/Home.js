import React, { useState, useEffect } from 'react';
import MembersList from './MembersList';
import AddMemberForm from './AddMemberForm';


const Home = () => {
  // קבלת רשימת החברים מהשרת
  const [members, setMembers] = useState([]);

  const [isAddMemberFormVisible, setIsAddMemberFormVisible] = useState(false);

  //פונקציה לקריאת כל החברים מהשרת
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/read_members', { method: 'POST' });
      if (!response.ok) {
        throw new Error("תגובת הרשת לא הייתה תקינה");
      }
      const data = await response.json();
      setMembers(data.members);
    } catch (error) {
      console.log('שגיאה:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  // פונקציה שמוסיפה חבר חדש
  const addMember = async (member) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/create_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      });

      if (!response.ok) {
        alert('יצירת חבר נכשל');
      }

      const data = await response.json();
      console.log(data.message); // הדפסת הודעת הצלחה מהשרת
      fetchData();
    } catch (error) {
      console.error('שגיאה ביצירת חבר:', error);
    }
  };

  // פונקציה שמוחקת חבר
  const deleteMember = async (memberID) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/delete_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberID: memberID })
      });

      if (!response.ok) {
        throw new Error('מחיקת חבר נכשלה');
      }

      const data = await response.json();
      console.log(data.message); // הדפסת הודעת הצלחה מהשרת
      fetchData();
    } catch (error) {
      console.error('שגיאה במחיקת חבר:', error);
    }
  };

  // פונקציה שמעדכנת חבר
  const updateMember = async (member) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/update_member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      });

      if (!response.ok) {
        throw new Error('עדכון החבר נכשל');
      }

      const data = await response.json();
      console.log(data.message); // הדפסת הודעת הצלחה מהשרת
      fetchData();
    } catch (error) {
      console.error('שגיאה בעדכון חבר:', error);
    }
  };

  return (
    <div>
       {/* הוספת הכותרת ואפשרות להוספת חבר חדש */}
      <button onClick={() => setIsAddMemberFormVisible(!isAddMemberFormVisible)}>
        {isAddMemberFormVisible ? 'סגירת טופס' : 'הוספת חבר חדש'}
      </button>
      {/* תצוגת טופס הוספת החבר */}
      {isAddMemberFormVisible && <AddMemberForm onAdd={addMember} />}
      {/* הצגת רשימת החברים */}
      <MembersList members={members} onEdit={updateMember} onDelete={deleteMember} />    </div>
  );
};

export default Home;

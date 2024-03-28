import React, { useState } from 'react';
import MemberDetails from './MemberDetails';
import '../css/MembersList.css'; // ייבוא קובץ CSS

const MembersList = ({ members, onEdit, onDelete }) => {
  const [expandedMembers, setExpandedMembers] = useState([]);

  const toggleMemberDetails = (memberID) => {
    if (expandedMembers.includes(memberID)) {
      setExpandedMembers(expandedMembers.filter(id => id !== memberID));
    } else {
      setExpandedMembers([...expandedMembers, memberID]);
    }
  };

  return (
    <div className="members-list-container">
      {members.length > 0 ? (
        <table className="members-list">
          <thead>
            <tr>
              <th>שם משפחה</th>
              <th>שם פרטי</th>
              <th>תז</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <React.Fragment key={member.memberID}>
                <tr className="member-row" onClick={() => toggleMemberDetails(member.memberID)}>
                  <td>{member.last_name}</td>
                  <td>{member.first_name}</td>
                  <td>{member.memberID}</td>
                </tr>
                {expandedMembers.includes(member.memberID) && (
                  <tr>
                    <td colSpan="3">
                      <MemberDetails member={member} onUpdate={onEdit} onDelete={onDelete} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>אין חברים להצגה</p>
      )}
    </div>
  );
};

export default MembersList;

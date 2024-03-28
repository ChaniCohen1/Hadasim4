from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
import urllib
from sqlalchemy import create_engine,func
from Member import Member, Base
from Vaccination import Vaccination
from connectDB import connect_to_database
from datetime import datetime

app = Flask(__name__)
CORS(app)

#הוספת חבר חדש
@app.route('/create_member', methods=['POST'])
def create_member():
    session = connect_to_database()
    try:
        # קבלת האובייקט המעודכן מהלקוח
        new_member = request.json
        print(new_member)
        print("$$$$$$$$$$$$$",new_member['first_name'],new_member['illness_date'])

        # יצירת אובייקט Member חדש עם הנתונים המעודכנים
        member = Member(
            memberID=new_member['memberID'],
            first_name=new_member['first_name'],
            last_name=new_member['last_name'],
            city=new_member['city'],
            street=new_member['street'],
            house_number=new_member['house_number'],
            birth_date=new_member['birth_date'],
            phone=new_member['phone'],
            cellular=new_member['cellular'],
            illness_date=new_member['illness_date'],
            recovery_date=new_member['recovery_date'],
        )
        print(member)
        # עדכון המידע במסד הנתונים
        session.add(member)
        session.commit()
        return jsonify({'message': 'Member create successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400 
    finally:
        session.close() 

#   קריאת נתונים מהטבלה חברים
@app.route('/read_members', methods=['POST'])
def read_members():
    session = connect_to_database()
    try:
        members = session.query(Member).all()
        member_objects = [member.to_dict() for member in members]
        return jsonify({'members': member_objects}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()
    
#עדכון חבר
@app.route('/update_member', methods=['post'])
def update_member():
    session = connect_to_database()
    try:
        # קבלת האובייקט המעודכן מהלקוח
        updated_member_data = request.json
        print(updated_member_data)
        birth_date_str = updated_member_data['birth_date']
        birth_date = datetime.strptime(birth_date_str, '%d.%m.%Y').date()
        illness_date_str = updated_member_data['illness_date']
        illness_date = datetime.strptime(illness_date_str, '%d.%m.%Y').date()
        recovery_date_str = updated_member_data['recovery_date']
        recovery_date = datetime.strptime(recovery_date_str, '%d.%m.%Y').date()
        # יצירת אובייקט Member חדש עם הנתונים המעודכנים
        updated_member = Member(
            memberID=updated_member_data['memberID'],
            first_name=updated_member_data['first_name'],
            last_name=updated_member_data['last_name'],
            city=updated_member_data['city'],
            street=updated_member_data['street'],
            house_number=updated_member_data['house_number'],
            birth_date=birth_date,
            phone=updated_member_data['phone'],
            cellular=updated_member_data['cellular'],
            illness_date=illness_date,
            recovery_date=recovery_date,
        )
        print(updated_member)
        # עדכון המידע במסד הנתונים
        session.merge(updated_member)
        session.commit()
        
        return jsonify({'message': 'Member updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400  
    finally:
        session.close()    
    
# מחיקת חבר מהטבלה.    
@app.route('/delete_member', methods=['post'])
def delete_member():
    session = connect_to_database()
    try:
        memberID = request.json.get('memberID')
        member_to_delete = session.query(Member).filter_by(memberID=memberID).first()
        if member_to_delete:
            # מחיקת כל הרשומות המקושרות לחבר
            # related_records = session.query(VaccinationMember).filter_by(memberID=memberID).all()
            # print(related_records)
            # for record in related_records:
            #     print(record)
            #     session.delete(record)
             # מחיקת החבר ממסד הנתונים
            session.delete(member_to_delete)
            session.commit()
            return jsonify({'message': 'Member deleted successfully'}), 200
        else:
            return jsonify({'error': 'Member not found'}), 404
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()    

#הוספת חיסון חדש
@app.route('/create_veccination', methods=['POST'])
def create_veccination_member():
    session = connect_to_database()
    try:
        new_veccination = request.json
        print(new_veccination)
        # בדיקה אם מספר החיסונים של memberID גדול או שווה לארבע
        memberID = new_veccination['vaccination'].get('memberID')
        print(memberID)
        num_vaccinations = session.query(func.count(Vaccination.memberID)).filter(Vaccination.memberID == memberID).scalar()
        print(num_vaccinations)
        if num_vaccinations >= 4:
            return jsonify({'message': 'לא ניתן להוסיף חיסון נוסף, מספר החיסונים עבר את המגבלה'})
        else:
            # יצירת אובייקט חדש לחיסון
            veccination = Vaccination(
                memberID=new_veccination['vaccination'].get('memberID'),
                vaccination_code=new_veccination['vaccination']['vaccination_code'],
                vaccination_date=new_veccination['vaccination']['vaccination_date'],
                manufacturer=new_veccination['vaccination']['manufacturer'],
            )
            # הוספת החיסון למסד הנתונים
            print(veccination)
            session.add(veccination)
            session.commit()

            return jsonify({'message': 'החיסון נוסף בהצלחה'}),200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400  
    finally:
        session.close()    
  
#קריאת כל החיסונים לחבר מסוים  
@app.route('/read_veccination_member', methods=['POST'])
def read_veccination_member():
    session = connect_to_database()
    try:
        memberID = request.json.get('memberID')
        print(memberID)
        
        vaccinations = session.query(Vaccination).filter_by(memberID=memberID).all()
        vaccination_objects = [vaccination.to_dict() for vaccination in vaccinations]
        
        print(vaccination_objects)
        
        return jsonify({'vaccinations': vaccination_objects}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()

#עדכון חיסון
@app.route('/update_veccination', methods=['POST'])
def update_veccination():
    session = connect_to_database()
    try:
        new_veccination = request.json
        print(new_veccination)
        
        vaccinationID = new_veccination['vaccination'].get('vaccinationID')
        print("$$$$",vaccinationID)
        #חיפוש החיסון שיש לעדכן
        veccination_to_update = session.query(Vaccination).filter_by(vaccinationID=vaccinationID).first()
        print(veccination_to_update)
        if veccination_to_update:
            # עדכון פרטי החיסון
            veccination_to_update.vaccination_code = new_veccination['vaccination']['vaccination_code']
            veccination_to_update.vaccination_date = new_veccination['vaccination']['vaccination_date']
            veccination_to_update.manufacturer = new_veccination['vaccination']['manufacturer']
            
            session.commit()
            return jsonify({'message': 'החיסון עודכן בהצלחה'}),200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400  
    finally:
        session.close() 
      
     
# מחיקת חיסון  
@app.route('/delete_veccination', methods=['POST'])
def delete_veccination():
    session = connect_to_database()
    try:
        vaccinationID = request.json.get('vaccinationID')
        print(vaccinationID)
        # חיפוש החיסון שיש למחוק על פי מזהה החיסון
        veccination_to_delete = session.query(Vaccination).filter_by(vaccinationID=vaccinationID).first()
        
        if veccination_to_delete:
            session.delete(veccination_to_delete)
            session.commit()
            
            return jsonify({'message': 'החיסון נמחק בהצלחה'}), 200
        else:
            return jsonify({'error': 'לא נמצא חיסון למחיקה'}), 404
        
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()


# פונקציה לקבלת רשימת חברי הקופת חולים שלא מחוסנים כלל
@app.route('/unvaccinated_members', methods=['GET'])
def unvaccinated_members():
    session = connect_to_database()
    try:
        # ביצוע שאילתה למציאת חברים שאינם מחוסנים כלל
        unvaccinated_members = session.query(Member).outerjoin(Vaccination, Member.memberID == Vaccination.memberID).filter(Vaccination.vaccinationID == None).all()
        unvaccinated_member_objects = [member.to_dict() for member in unvaccinated_members]
        return jsonify({'unvaccinated_members': unvaccinated_member_objects}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400
    finally:
        session.close()


if __name__ == '__main__':
  app.run(debug=True)

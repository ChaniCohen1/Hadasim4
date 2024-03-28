from sqlalchemy import Column, String,Integer,Date;
from sqlalchemy.ext.declarative import declarative_base;
from sqlalchemy.orm import relationship


Base = declarative_base()

class Member(Base):
    __tablename__ = 'membersTbl'
    memberID = Column(String(20), primary_key=True)
    first_name = Column(String(20))
    last_name = Column(String(20))
    city = Column(String(20))
    street = Column(String(20))
    house_number = Column(Integer)
    birth_date = Column(Date)
    phone = Column(String(20))
    cellular = Column(String(20))
    illness_date = Column(Date)
    recovery_date = Column(Date)
    #member_image = Column(LargeBinary)
    
    def __init__(self, memberID, first_name, last_name, city, street, house_number, birth_date, phone, cellular, illness_date, recovery_date):
        self.memberID = memberID
        self.first_name = first_name
        self.last_name = last_name
        self.city = city
        self.street = street
        self.house_number = house_number
        self.birth_date = birth_date
        self.phone = phone
        self.cellular = cellular
        self.illness_date = illness_date
        self.recovery_date = recovery_date
        #self.member_image = member_image
        
    def to_dict(self):
        return {
            'memberID': self.memberID,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'city': self.city,
            'street': self.street,
            'house_number': self.house_number,
            'birth_date': self.birth_date.strftime('%d.%m.%Y'),  # המרה למחרוזת כדי להיות תקינה ב-JSON
            'phone': self.phone,
            'cellular': self.cellular,
            'illness_date': self.illness_date.strftime('%d.%m.%Y') if self.illness_date else None,
            'recovery_date': self.recovery_date.strftime('%d.%m.%Y') if self.recovery_date else None,
            #'member_image': self.member_image,
        }
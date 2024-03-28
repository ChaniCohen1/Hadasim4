from sqlalchemy import Column, Integer, Date, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Vaccination(Base):
    __tablename__ = 'vaccinationTbl'
    
    vaccinationID = Column(Integer, primary_key=True, autoincrement=True)
    memberID = Column(Integer,nullable=False)
    vaccination_code = Column(Integer,nullable=False)
    vaccination_date = Column(Date, nullable=False)
    manufacturer = Column(String(20), nullable=False)

    
    def __init__(self, memberID, vaccination_code, vaccination_date, manufacturer):
        # self.vaccinationID = vaccinationID
        self.memberID = memberID
        self.vaccination_code = vaccination_code
        self.vaccination_date = vaccination_date
        self.manufacturer = manufacturer
        
    def to_dict(self):
        return {
            'vaccination_id': self.vaccinationID,
            'memberID': self.memberID,
            'vaccination_code': self.vaccination_code,
            'vaccination_date': self.vaccination_date.strftime('%d.%m.%Y'),
            'manufacturer': self.manufacturer
        }
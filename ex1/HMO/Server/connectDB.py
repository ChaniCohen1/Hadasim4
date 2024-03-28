from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import urllib

def connect_to_database():
    # הגדרת מחרוזת החיבור למסד הנתונים
    quoted = urllib.parse.quote_plus("DRIVER={SQL Server Native Client 11.0};SERVER=CHANI\\SQLEXPRESS;DATABASE=HMO;Trusted_Connection=yes;")
    
    # יצירת מנוע לחיבור למסד הנתונים
    engine = create_engine(f"mssql+pyodbc:///?odbc_connect={quoted}")
    
    # יצירת אובייקט סשן
    Session = sessionmaker(bind=engine)
    session = Session()
    
    return session



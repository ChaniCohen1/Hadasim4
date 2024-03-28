create database HMO--יצירת מסד
go--תבצע את הפעולה
use HMO--שימוש במסד הנוכחי
go
--טבלת חברי קופת חולים
create table membersTbl
(
	memberID int primary key,--מפתח ראשי
	first_name varchar(20) not null,--לא ריק
	last_name varchar(20) not null, 
	city varchar(20) not null,
	street varchar(50) not null,
	house_number int not null,
	birth_date date not null,
	phone varchar(10),
	cellular varchar(10),
	illness_date date,
	recovery_date date,
	--member_image varchar(200),
)
go
--טבלת חיסון
create table vaccinationTbl
(
	vaccinationID int identity (1,1) primary key,--מספור אוטומטי ומפתח ראשי
	memberID INT FOREIGN KEY REFERENCES membersTbl(memberID) ON DELETE CASCADE,
	vaccination_code int,
	vaccination_date date not null,-- לא ריק
	manufacturer varchar(20) not null,
)


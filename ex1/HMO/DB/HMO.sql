create database HMO--����� ���
go--���� �� ������
use HMO--����� ���� ������
go
--���� ���� ���� �����
create table membersTbl
(
	memberID int primary key,--���� ����
	first_name varchar(20) not null,--�� ���
	last_name varchar(20) not null, 
	city varchar(20) not null,
	street varchar(50),
	house_number int,
	birth_date date not null,
	phone varchar(10),
	cellular varchar(10),
	illness_date date,
	recovery_date date,
	member_image varchar(200),
)
go
--���� �����
create table vaccinationTbl
(
	vaccinationID int identity (1,1) primary key,--����� ������� ����� ����
	name_vaccination varchar(20) not null,-- �� ���
	manufacturer varchar(20) not null,
)
go
--���� ��� ��������
create table vaccinationMemberTbl
(
	id int identity (1,1) primary key,
	vaccination_date date not null,
	memberID int foreign key references membersTbl(memberID), --���� ��
	vaccinationID int foreign key references vaccinationTbl(vaccinationID),--���� ��
	--reactionType varchar(10) check (reactionType in('alive','dying','dead')) ,
	
)



--����� ������
insert into [dbo].[membersTbl] values(325442796,'���','����','������� �����','��� ����� �����',3,'08-03-2003','089742735','0556772072','12-20-2020','12-25-2021')
insert into [dbo].[membersTbl] values(325205201,'�����','���','������� �����','��� �����',9,'07-19-2002','089742235','0556740217','12-20-2020','12-25-2021')
insert into [dbo].[membersTbl] values(332233223,'�����','����','��� ���','��� ����� �����',3,'04-03-2003','089742735','0556796608','12-20-2020','12-25-2021')

select * from [dbo].[membersTbl]

insert into [dbo].[vaccinationTbl] values('A','�����')
insert into [dbo].[vaccinationTbl] values('B','������')
insert into [dbo].[vaccinationTbl] values('C','�����')

select * from[dbo].[vaccinationTbl]

insert into [dbo].[vaccinationMemberTbl] values('3-25-2021',325442796,1 )
insert into [dbo].[vaccinationMemberTbl] values('3-28-2021',325442796,2 )



select * from[dbo].[vaccinationMemberTbl]
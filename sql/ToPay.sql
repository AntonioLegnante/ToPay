Drop Table IF EXISTS ToPay;
Create Table ToPay(
    id_Prova integer Primary Key,
    pay Text Not NUll,
    quantita Integer default 0,
    done integer default 0 

);

.header on
.mode column


INSERT INTO ToPay(pay) VALUES ('libro di tpst');
INSERT INTO ToPay(pay) VALUES ('Matite');
INSERT INTO ToPay(pay) VALUES ('Penne');
INSERT INTO ToPay(pay) VALUES ('portapastelli');



Select * FROM ToPay; 

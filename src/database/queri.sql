-- ¡CREAR LA TABLA ROLES!
CREATE TABLE ROLES (
    RID SERIAL PRIMARY KEY,
    ROLENAME VARCHAR(20) NOT NULL UNIQUE CHECK (ROLENAME IN ('ADMIN', 'REPRESENTATIVE', 'CLIENT', 'ASISTANT'))
)

-- ¡CREAR LA TABLA USUARIOS!
CREATE TABLE USERS (
    UID SERIAL PRIMARY KEY,
    USER_NAME VARCHAR(35) NOT NULL,
    LAST_NAME VARCHAR(35) NOT NULL,
    ID_NUMBER VARCHAR (12) NOT NULL UNIQUE,
    CELLPHONTE VARCHAR (10) NOT NULL,
    CELLPHONTE_CONTACT VARCHAR (10),
    EMAIL VARCHAR(100) NOT NULL UNIQUE,
    PASSWORD VARCHAR(60) NOT NULL,
    ROLE_ID INT NOT NULL DEFAULT 3,
    FOREIGN KEY (ROLE_ID) REFERENCES ROLES(RID)
)

-- ¡CREAR LA TABLA TOURS!
CREATE TABLE TOURS (
    TID SERIAL PRIMARY KEY,
    IMAGE_TOUR VARCHAR(250),
    NAME_TOUR VARCHAR(70) NOT NULL,
    PRICE DECIMAL(10,2) NOT NULL,
    INCLUDES JSON NOT NULL,
    ROUTES TEXT,
    DISCOUNT INT
)

-- ¡CREAR LA TABLA PAGOS!
CREATE TABLE INSCRIPTIONS (
    IID SERIAL PRIMARY KEY,
    NUMBER_ADULTS INT NOT NULL,
    NUMBER_CHILDREN INT,
    CLIENT_ID INT NOT NULL,
    FOREIGN KEY (CLIENT_ID) REFERENCES USERS(UID),
    TOURS_ID INT NOT NULL,
    FOREIGN KEY (TOURS_ID) REFERENCES TOURS(TID),
    REPRESENTATIVE_ID INT NOT NULL,
    FOREIGN KEY (REPRESENTATIVE_ID) REFERENCES USERS(UID),
    TOTAL_AMOUNT DECIMAL(10,2) NOT NULL,
    REPRESENTTIVE_COMMISSION DECIMAL(10,2) NOT NULL,
    INSCRIPTION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
)

-- ¡CREAR LA TABLA PAGOS!
CREATE TABLE PAYMENTS(
    PID SERIAL PRIMARY KEY,
    INSCRIPTION_ID INT NOT NULL,
    FOREIGN KEY (INSCRIPTION_ID) REFERENCES INSCRIPTIONS(IID),
    AMOUNT_PAID DECIMAL(10,2) NOT NULL,
    PAYMENT_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
## DB

Necesitaras la siguiente base de datos en MySQL para que funcione la conexion con los endpoints y el funcionamiento de la aplicacion:

```typescript
DROP DATABASE IF EXISTS Encrip;

CREATE DATABASE IF NOT EXISTS Encrip;
USE Encrip;

CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(250),
    Email VARCHAR(250),
    Password VARCHAR(2500)
);

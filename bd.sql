CREATE TABLE Productos(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50),
	descripcion VARCHAR(255),
	precio NUMERIC(11,2) NOT NULL DEFAULT 9999999 CHECK(precio >= 0),
	stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >=0)												
);

INSERT INTO productos VALUES (default, 'Refrigerador LG 480 lts.', 'Refrigerador de frío directo', 250000, 20);
INSERT INTO productos VALUES (default, 'Televisor 50 pulgadas Samsung', 'Televisor 4k UHD', 200000, 15);


select * from productos where id = '2';


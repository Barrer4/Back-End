SELECT
p.modelo AS 'Producto',
p.precio AS 'Precio',
CASE 
	WHEN p.precio > 1 AND p.precio < 4.99 THEN 'Cheap'
    WHEN p.precio > 5 AND p.precio < 9.99 THEN 'Normal'
    ELSE 'Expensive' 
END AS 'Percepción del precio'
FROM
producto p



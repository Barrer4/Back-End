SELECT 
	p.id AS 'ID',
    p.marca AS 'Marca',
    p.modelo AS 'Producto',
    p.precio AS 'Precio',
   IF(p.precio > (SELECT AVG(precio) FROM producto), 'Expensive',  IF(p.precio < (SELECT AVG(precio) FROM producto), 'Cheap', 'Normal')) AS 'Tipo'
FROM
    producto p
ORDER BY p.id



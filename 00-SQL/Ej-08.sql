SELECT 
    p.modelo AS 'Producto', p.precio
FROM
    producto p
WHERE
    p.precio < (SELECT 
            AVG(precio)
        FROM
            producto p2
        WHERE
            p.marca = p2.marca)
ORDER BY p.precio ASC
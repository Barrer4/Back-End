SELECT 
    p.modelo AS 'Producto', pr.nombre AS 'Descuento'
FROM
    producto p
        JOIN
    producto_promocion pp ON pp.id_producto = p.id
        JOIN
    promocion pr ON pp.id_promocion = pr.id
WHERE
    pr.nombre = 'Christmas'

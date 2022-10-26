SELECT 
    p.id AS 'Producto ID',
    p.modelo AS 'Producto'
FROM
    producto p
WHERE
    p.id NOT IN (SELECT 
            id_producto
        FROM
            linea_pedido)

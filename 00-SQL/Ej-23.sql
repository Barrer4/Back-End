SELECT 
    pe.id AS 'Pedido ID',
    SUM(p.precio * lp.unidades) AS 'Total'
FROM
    producto p
        JOIN
    linea_pedido lp ON lp.id_producto = p.id
        JOIN
    pedido pe ON pe.id = lp.id_pedido
    GROUP BY pe.id
    HAVING pe.id = 1


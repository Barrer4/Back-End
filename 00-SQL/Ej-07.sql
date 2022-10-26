SELECT 
    c.id,
    CONCAT(c.nombre, ' ', c.apellidos) AS 'Cliente',
    SUM(pr.precio * lp.unidades) AS 'Total'
FROM
    cliente c
        JOIN
    pedido pe ON pe.id_cliente = c.id
        JOIN
    linea_pedido lp ON lp.id_pedido = pe.id
        JOIN
    producto pr ON pr.id = lp.id_producto
GROUP BY c.id
SELECT DISTINCT
    p.modelo, p.id
FROM
    producto p
        JOIN
    linea_pedido lp ON lp.id_producto = p.id
        JOIN
    pedido pe ON pe.id = lp.id_pedido
WHERE
    lp.id_pedido = 3

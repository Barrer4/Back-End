SELECT 
    pe.id AS 'Pedido ID',
    CONCAT(p.marca," - ", p.modelo) AS 'Producto',
    p.precio AS 'Precio'
FROM
    producto p
        JOIN
    linea_pedido lp ON lp.id_producto = p.id
        JOIN
    pedido pe ON pe.id = lp.id_pedido
    HAVING pe.id = 2
    ORDER BY p.precio DESC
    LIMIT 1
    


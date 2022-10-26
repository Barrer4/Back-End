SELECT 
    p.modelo AS 'Producto',
    SUM(lp.unidades) AS 'Unidades'
FROM
    producto p 
        JOIN
    linea_pedido lp ON lp.id_producto = p.id
        JOIN
    pedido pd ON lp.id_pedido = pd.id
        JOIN
    cliente c ON pd.id_cliente = c.id
WHERE
    c.provincia = 'Madrid'
GROUP BY p.id
ORDER BY SUM(lp.unidades) DESC
LIMIT 1
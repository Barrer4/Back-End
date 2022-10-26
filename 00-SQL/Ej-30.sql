SELECT 
    YEAR(pe.fecha) AS 'Año',
    p.id AS 'Producto ID',
    p.modelo AS 'Producto',
    SUM(lp.unidades) 'Cantidad'
FROM
    producto p
        JOIN
    linea_pedido lp ON lp.id_producto = p.id
        JOIN
    pedido pe ON lp.id_pedido = pe.id
WHERE
    YEAR(pe.fecha) = 2022
GROUP BY p.id
ORDER BY SUM(lp.unidades) DESC
LIMIT 10
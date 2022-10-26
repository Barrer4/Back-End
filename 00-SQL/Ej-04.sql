SELECT 
    YEAR(pe.fecha) AS 'Año',
    SUM(lp.unidades * pr.precio) AS 'Ingreso Total'
FROM
    producto pr
        JOIN
    linea_pedido lp ON pr.id = lp.id_producto
        JOIN
    pedido pe ON pe.id = lp.id_pedido
GROUP BY YEAR(pe.fecha)
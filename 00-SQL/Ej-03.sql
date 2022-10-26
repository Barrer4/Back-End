SELECT 
    SUM(lp.unidades * pr.precio) AS 'Ingreso Total'
FROM
    producto pr
        JOIN
    linea_pedido lp ON pr.id = lp.id_producto
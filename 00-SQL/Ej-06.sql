SELECT 
    YEAR(pe.fecha) AS 'Año',
    QUARTER(pe.fecha) AS 'Trimestre',
    c.provincia AS 'Provincia',
    ROUND(AVG(pr.precio * lp.unidades), 2) AS 'Media'
FROM
    producto pr
        JOIN
    linea_pedido lp ON lp.id_producto = pr.id
        JOIN
    pedido pe ON pe.id = lp.id_pedido
        JOIN
    cliente c ON pe.id_cliente = c.id
WHERE
    provincia = 'Madrid'
        AND YEAR(pe.fecha) = 2022
        AND QUARTER(pe.fecha) = 1
GROUP BY 'Trimestre'

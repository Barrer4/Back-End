SELECT
	CONCAT(c.nombre, " ", c.apellidos) AS 'Cliente',
    c.provincia AS 'Provincia',
    SUM(lp.unidades * pr.precio) AS 'Total'
FROM
	cliente c
    JOIN pedido pe 
    ON pe.id_cliente = c.id
		JOIN linea_pedido lp
		ON lp.id_pedido = pe.id
			JOIN producto pr
			ON lp.id_producto = pr.id
WHERE provincia = 'Madrid'
GROUP BY c.id
ORDER BY 'Total' DESC
LIMIT 1


    
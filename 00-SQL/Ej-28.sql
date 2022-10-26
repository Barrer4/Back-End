SELECT
	c.id AS 'Cliente ID',
    CONCAT(c.nombre, ' ', c.apellidos) AS 'Cliente',
    COUNT(pe.id) AS 'Número de Pedidos'
FROM
    cliente c
        JOIN
    pedido pe ON c.id = pe.id_cliente
GROUP BY CONCAT(c.nombre, ' ', c.apellidos)
HAVING COUNT(pe.id) > 1
ORDER BY COUNT(pe.id) ASC
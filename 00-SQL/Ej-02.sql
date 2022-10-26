SELECT 
    CONCAT(c.nombre, ' ', c.apellidos) AS 'Cliente',
    COUNT(pe.id) AS 'Nº Pedidos'
FROM
    cliente c,
    pedido pe
WHERE
    c.id = pe.id_cliente
GROUP BY c.id
HAVING COUNT(pe.id) = 1


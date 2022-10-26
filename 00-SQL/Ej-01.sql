SELECT
	year(fecha),
    lp.id_producto
FROM
	pedido pe
JOIN linea_pedido lp ON pe.id = lp.id_pedido
WHERE lp.id_producto = 1
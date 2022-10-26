SELECT 
	pr.id,
    CONCAT(pr.marca, ' - ', pr.modelo) AS 'Producto',
    promo.nombre AS 'Descuento',
    CONCAT(ROUND((promo.descuento) * 100, 0), '%') AS '%'
FROM
    producto_promocion pp
        JOIN
    producto pr ON pr.id = pp.id_producto
        JOIN
    promocion promo ON promo.id = pp.id_promocion
ORDER BY pr.id
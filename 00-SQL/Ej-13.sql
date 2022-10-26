SELECT 
	pr.id,
    CONCAT(pr.marca, ' - ', pr.modelo) AS 'Producto',
    pr.precio AS 'Precio sin descuento',
    CONCAT(ROUND((promo.descuento) * 100, 0), '%') AS 'Descuento %',
    ROUND(pr.precio * (1 - promo.descuento), 2) AS 'Precio con descuento'
FROM
    producto_promocion pp
        JOIN
    producto pr ON pr.id = pp.id_producto
        JOIN
    promocion promo ON promo.id = pp.id_promocion
ORDER BY pr.id
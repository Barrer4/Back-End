SELECT
p.modelo AS 'Producto',
p.precio AS 'Precio'
FROM producto p
WHERE p.precio >= (
					SELECT
						MAX(p2.precio)
					FROM producto p2
                    WHERE p.marca = p2.marca)

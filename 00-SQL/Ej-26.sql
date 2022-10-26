SELECT 
    pr.id,
    CONCAT(pr.marca, ' - ', pr.modelo) AS 'Producto',
    pr.precio
FROM
    producto pr
ORDER BY pr.precio ASC
LIMIT 5
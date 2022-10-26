SELECT 
    p.modelo AS 'Modelo',
    p.precio AS 'Precio Modelo',
    pr.marca AS 'Marca',
    ROUND(AVG(pr.precio), 2) AS 'Precio Medio Marca'
FROM
    producto p
        INNER JOIN
    producto pr ON p.precio < pr.precio
        AND p.marca = pr.marca
GROUP BY p.modelo
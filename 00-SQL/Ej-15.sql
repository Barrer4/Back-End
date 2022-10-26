SELECT 
    SUBSTRING(marca, 1, 3) AS 'Brand 3 First Letters'
FROM
    producto
GROUP BY marca
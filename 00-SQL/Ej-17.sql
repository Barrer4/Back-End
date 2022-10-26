SELECT 
    pe.id AS 'Pedido ID',
    DATE_FORMAT(pe.fecha, '%d/%m/%y') AS 'Fecha del pedido'
FROM
    pedido pe
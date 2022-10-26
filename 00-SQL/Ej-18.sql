SELECT 
pd.id,
ELT(DATE_FORMAT(pd.fecha,'%m'),'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre') AS 'Mes',
YEAR(pd.fecha) AS 'Año'
FROM pedido pd
ORDER BY pd.fecha
    
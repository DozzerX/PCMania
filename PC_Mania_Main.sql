
DROP DATABASE IF EXISTS pcmania;
CREATE DATABASE pcmania; 
USE pcmania;

DROP TABLE IF EXISTS carousel;
DROP TABLE IF EXISTS facturas;
DROP TABLE IF EXISTS direcciones;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos_promocionados;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;


CREATE TABLE usuarios (`usuario_id` int auto_increment not null, `nombre` varchar(20) not null, `apellidos` varchar(64) not null, `email` varchar(64) unique not null,
`password` char(64), primary key(`usuario_id`));


CREATE TABLE direcciones (`direccion_id` int auto_increment not null, `nombre` varchar(20) not null, `apellidos` varchar(64) not null, `email` varchar(64) default null,
`fecha_nacimiento` date not null,`dni` varchar(9) not null, `telefono` char(10) not null, `direccion` varchar(125) not null, `cp` char(5) not null, 
`poblacion` varchar(50) not null, `provincia` varchar(50) not null,`fk_usuario_id` int not null, primary key(`direccion_id`), foreign key(`fk_usuario_id`) references usuarios(`usuario_id`));


CREATE TABLE pedidos (`pedido_id` int auto_increment not null,`fecha`  datetime not null, `total_dinero` decimal (8,2) not null, `productos_comprados` varchar(1200) not null,
`gastos_envio` decimal(5,2) not null, `metodo_pago` varchar(20) not null,primary key (`pedido_id`), `fk_usuario_id` int not null,
foreign key(`fk_usuario_id`) references usuarios(`usuario_id`));


CREATE TABLE facturas (`factura_id` int auto_increment not null, `fecha` datetime not null, `nombre` varchar(20) not null,
`apellidos` varchar(64) not null, `direccion` varchar(125) not null, `poblacion` varchar(50) not null, `nif` varchar(9) not null, `cp` char(5) not null,
`telefono` char(10) not null, `articulos` int(3) not null, `metodo_pago` varchar(30) not null, `gastos_envio` decimal(5,2) not null,
`subtotal` decimal(8,2) not null, `iva` decimal (3,2) not null,`total` decimal(8,2) not null,`fk_pedido_id` int not null ,primary key(`factura_id`),
foreign key(`fk_pedido_id`) references pedidos(`pedido_id`)); 


CREATE TABLE productos (`producto_id` int auto_increment not null, `precio` decimal (7,2) not null, `precio_con_iva` decimal (7,2) not null, `disponibles` int not null,
`categoria` varchar(35) not null, `sub_categoria` varchar(35) not null,`nombre_producto` varchar(300) not null, `nombre_img` varchar(650) not null,
 `specs` varchar(3000), primary key(`producto_id`));


CREATE TABLE productos_promocionados (`fk_producto_id` int not null, `tipo_promocion` varchar(25) not null,
foreign key(`fk_producto_id`) references productos(`producto_id`));


CREATE TABLE carousel (`carousel_id` int auto_increment not null, `nombre_img` varchar(80) not null, `tag_busqueda` varchar(50) not null, primary key(`carousel_id`));

/* pass = 123 */
INSERT INTO usuarios VALUES(1, 'Plamen', 'Stoyanov Stoyanov', 'dozzerkek@hotmail.com', '$2y$10$6SpkSVNFqr7Rhehzk0Y/ceEselZxD9CwDS62KLVcMne4pynxZZCli');

INSERT INTO direcciones VALUES(1,'Plamen','Stoyanov Stoyanov', 'dozzerkek@hotmail.com','1990-01-01','58298597Z','602033122','Calle Con Nombre Bastante Largo 1',
'03301','Elche', 'Alicante',1);
INSERT INTO direcciones VALUES(2,'Juan','De la Rosa', 'igformacion@gmail.com','2000-01-01','58298597Z','602033122','Calle Con Nombre Bastante Largo 2, Planta 2, Puerta 1',
'03301','Alicante', 'Alicante',1);

INSERT INTO pedidos VALUES(1, '2019-06-17 02:58:38', '646.78', '{\"6\":\"1\",\"55\":\"1\"}', '7.98', 'credit card', 1);
INSERT INTO pedidos VALUES(2, '2019-06-17 03:18:45', '4188.43', '{\"1\":\"3\",\"42\":\"2\",\"61\":\"4\"}', '11.97', 'credit card', 1);

INSERT INTO facturas VALUES(1, '2019-06-17 02:58:38', 'Plamen', 'Stoyanov Stoyanov', 'Calle Con Nombre Bastante Largo 1',
'Elche', '58298597Z', '03301', '602033122', '2', 'credit card', '7.98', '535.92', '0.21', '646.78', 1);
INSERT INTO facturas VALUES(2, '2019-06-17 03:18:45', 'Juan', 'De la Rosa', 'Calle Con Nombre Bastante Largo 2, Planta 2, Puerta 1',
'Alicante', '58298597Z', '03301', '602033122', '9', 'credit card', '11.97', '3463.60', '0.21', '4188.43', 2);





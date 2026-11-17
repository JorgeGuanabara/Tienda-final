CREATE DATABASE IF NOT EXISTS db_tienda_jorge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_tienda_jorge;

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  rol VARCHAR(50) NOT NULL DEFAULT 'Cliente'
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  categoria_id INT NULL,
  CONSTRAINT fk_productos_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Datos iniciales de prueba
INSERT INTO categorias (nombre, descripcion) VALUES
('Electrónica', 'Dispositivos, gadgets y accesorios'),
('Ropa', 'Prendas deportivas y casuales'),
('Hogar', 'Artículos para el hogar y oficina');

INSERT INTO usuarios (nombre, email, rol) VALUES
('Jorge Negrete', 'jorge@ejemplo.com', 'Admin'),
('Ana López', 'ana@ejemplo.com', 'Cliente'),
('Carlos Ruiz', 'carlos@ejemplo.com', 'Cliente');

INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES
('Teclado Mecánico RGB', 1250.00, 15, 1),
('Mouse Inalámbrico Pro', 650.00, 30, 1),
('Playera Deportiva Dry-Fit', 380.00, 50, 2),
('Lámpara LED Escritorio', 490.00, 20, 3);

INSERT INTO pedidos (usuario_id, total, estado) VALUES
(2, 1900.00, 'Entregado'),
(3, 380.00, 'En proceso'),
(2, 490.00, 'Pendiente');

# 🧢 # MazterCaps
[Inglés](README.md) | [Español]

¡Bienvenido al repositorio de **MazterCaps**! Este proyecto es una página de destino responsiva y de alto rendimiento diseñada para una marca de sombreros premium. Combina una estética limpia con tecnología interactiva moderna para brindar una experiencia de compra fluida.

--

## 🚀 Resumen del proyecto

Como desarrollador web, mi objetivo en este proyecto fue crear una **interfaz de alta conversión** que se sintiera profesional y accesible. El sitio no es solo una página estática; es una aplicación dinámica que gestiona datos de productos, modelos 3D interactivos y un diseño fluido optimizado para móviles.

### Aspectos destacados:
* **Carga dinámica de productos:** Utiliza un sistema JSON centralizado para actualizar precios, stock y colores sin modificar el HTML.

* **Interacción 3D:** Integración de `<model-viewer>` de Google para una vista de producto de 360°. * **Enfoque en la conversión:** Integración directa con WhatsApp para un servicio al cliente instantáneo.

--

## 🛠 Lista de niveles de tecnología

Así clasifiqué las herramientas y técnicas utilizadas para crear MazterCaps:

| Nivel | Tecnología / Estrategia | ¿Por qué está aquí? |

| :--- | :--- | :--- |

| **S (Nivel Dios)** | **JavaScript puro** | Gestiona toda la lógica (modales, menús desplegables, inyección de datos) sin bibliotecas pesadas. |

| **A (Élite)** | **CSS Grid y Flexbox** | Crea un diseño responsivo sólido que se ve genial en cualquier tamaño de pantalla. |

| **A (Élite)** | **Visor de modelos 3D** | Proporciona una "sensación premium" al permitir a los usuarios ver el producto desde todos los ángulos. |

| **B (Profesional)** | **Variables CSS** | Modificar o cambiar la imagen del sitio web es increíblemente rápido (cambiar un color cambia todo el sitio). |

| **B (Pro)** | **Integración JSON** | Simplifica la gestión del inventario para el usuario final. |

--

## 📱 Características y funcionalidades

### 1. Navegación y menús inteligentes 🍔
El encabezado incluye un **menú desplegable minimalista**. En lugar de saturar la pantalla, el menú "Productos" solo aparece cuando es necesario, manteniendo el enfoque en los elementos visuales. Es totalmente accesible y se cierra automáticamente al hacer clic fuera de él.

### 2. Galería interactiva 📸
La galería no es solo un carrusel. Al seleccionar una burbuja de color, la lógica es la siguiente:
* Cambia la imagen principal con una **transición de desvanecimiento** suave.

* Vuelve a renderizar la cuadrícula de miniaturas para ese color específico.

* Actualiza el precio y las medidas en tiempo real.

### 3. Diseño adaptable 📲
El sitio web está diseñado pensando en los dispositivos móviles. En ordenadores de escritorio, se muestra una sofisticada cuadrícula de pantalla dividida. En dispositivos móviles:
* El visor 3D se expande para ocupar toda la pantalla.

* Las tarjetas comparativas se apilan verticalmente para facilitar la lectura.

* Los botones son más grandes y fáciles de usar con el pulgar.

### 4. La sección de renderizado 3D 🧊
Utilizamos un modelo interactivo `.glb`. Esto permite a los usuarios ampliar y rotar la tapa, simulando una experiencia física en tienda. He añadido etiquetas flotantes que resaltan beneficios específicos como "Protección solar" o "Tejido transpirable".

---

## 💻 Guía de codificación y modificación

Si deseas personalizar (o modificar) este proyecto, así es como funciona el motor:

### **Lógica de scripting**
El archivo `script.js` actúa como el cerebro. Utiliza una función llamada `cargarProducto()`. Esta función toma datos de tu JSON y completa automáticamente el nombre, el precio y las especificaciones técnicas.

* **Control de stock:** Si el JSON indica `stock_total: 0`, el script desactiva automáticamente el botón de compra y cambia el estado a "Agotado".

### **Estilo y marca**
Utilicé **variables CSS** al principio del archivo `style.css`.

``css
:root {

--camel: #C19A6B; /* Color principal de la marca */

--white: #ffffff;

--transition: 0.4s;
¿Quieres un aspecto de marca diferente? Simplemente cambia el código hexadecimal `--camel` y todo el sitio (botones, insignias, bordes, iconos) se actualizará al instante.

### **El Modal de Contacto**
El formulario de contacto se reemplaza por un **Modal de WhatsApp** de alta conversión. Incluye la ubicación de la tienda física en Bogotá y un enlace API directo para iniciar un chat, lo que facilita la interacción entre el usuario y la venta.

--

## 🏁 Mejoras Futuras
* Agregar un interruptor para el modo oscuro.

* Implementar una barra de búsqueda para modelos de gorras específicos.

* Integrar un almacenamiento local automatizado para el carrito de compras.

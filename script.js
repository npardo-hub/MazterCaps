document.addEventListener('DOMContentLoaded', () => {
    const btnModelos = document.getElementById('btnModelos');
    const modelMenu = document.getElementById('modelMenu');
    const fotoPrincipal = document.getElementById('foto-principal');
    const miniaturasContainer = document.getElementById('miniaturas-container');
    const precioTxt = document.getElementById('precio-producto');
    const nombreTxt = document.getElementById('product-name');
    const contenedoresMedidas = document.querySelectorAll('.cajon-info span');
    const modal = document.getElementById("modalContacto");
    
    // --- LÓGICA DE INTERFAZ ---
    btnModelos.onclick = (e) => { 
        e.stopPropagation(); 
        modelMenu.classList.toggle('active'); 
    };

    document.onclick = () => modelMenu.classList.remove('active');
    
    document.querySelector(".btn-contacto").onclick = () => modal.style.display = "block";
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

    // --- CARGA DE DATOS ---
    fetch('Productos.json')
        .then(res => res.json())
        .then(data => {
            configurarMenu(data);
            if(data.length > 0) cargarProducto(data[0]);
        })
        .catch(err => console.error("Error cargando el JSON:", err));

    function configurarMenu(productos) {
        modelMenu.innerHTML = '';
        productos.forEach(prod => {
            const li = document.createElement('li');
            li.textContent = `${prod.nombre} - ${prod.categoria}`; 
            li.onclick = () => {
                cargarProducto(prod);
                modelMenu.classList.remove('active');
            };
            modelMenu.appendChild(li);
        });
    }

    function cargarProducto(item) {
        // 1. Gestión de Stock
        const viejoStock = document.querySelector('.stock-status');
        if(viejoStock) viejoStock.remove();
        
        const stockInfo = document.createElement('div');
        const btnCompra = document.querySelector('.btn-whatsapp');
        
        if (item.stock_total > 0) {
            stockInfo.className = 'stock-status status-disponible';
            stockInfo.textContent = '● Disponible';
            btnCompra.classList.remove('disabled');
            btnCompra.textContent = 'Escribir al WhatsApp';
        } else {
            stockInfo.className = 'stock-status status-agotado';
            stockInfo.textContent = '○ Agotado temporalmente';
            btnCompra.classList.add('disabled');
            btnCompra.textContent = 'Consultar reposición';
        }
        nombreTxt.before(stockInfo);

        // 2. Información básica
        nombreTxt.textContent = item.nombre;
        precioTxt.textContent = `$ ${item.precio_mayoreo.toLocaleString('es-CO')} COP`;

        // 3. Medidas
        if (item.medidas && contenedoresMedidas.length >= 3) {
            contenedoresMedidas[0].textContent = item.medidas.circunferencia;
            contenedoresMedidas[1].textContent = item.medidas.altura;
            contenedoresMedidas[2].textContent = item.medidas.visera;
        }

        resaltarInfografia(item.tipo_paneles);

        // 4. Generación de burbujas de color
        const selector = document.getElementById('selector-colores');
        selector.innerHTML = '';

        item.colores.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = 'burbuja-color';
            div.title = c.color_nombre;
            // Verificación si el hex es un String o un Array (Bicolor)
            if (Array.isArray(c.hex)) {
                div.style.background = `linear-gradient(135deg, ${c.hex[0]} 50%, ${c.hex[1]} 50%)`;
            } else {
                div.style.backgroundColor = c.hex;
            }

            div.onclick = () => {
                document.querySelectorAll('.burbuja-color').forEach(b => b.classList.remove('active'));
                div.classList.add('active');
                actualizarVista(c);
            };
            
            selector.appendChild(div);
            // Cargar el primer color por defecto
            if(i === 0) div.click();
        });
    }

    function resaltarInfografia(tipo) {
        const cards = document.querySelectorAll('.comp-card');
        if (cards.length >= 2) {
            cards.forEach(card => card.classList.remove('highlight'));
            if (tipo === 5) cards[0].classList.add('highlight');
            if (tipo === 6) cards[1].classList.add('highlight');
        }
    }

    function actualizarVista(colorData) {
        if (!colorData.fotos || colorData.fotos.length === 0) return;

        fotoPrincipal.classList.add('fade-out');
        
        setTimeout(() => {
            fotoPrincipal.src = colorData.fotos[0];
            fotoPrincipal.classList.remove('fade-out');
            
            miniaturasContainer.innerHTML = '';
            colorData.fotos.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.className = 'miniatura';
                img.onclick = () => {
                    fotoPrincipal.classList.add('fade-out');
                    setTimeout(() => { 
                        fotoPrincipal.src = imgUrl; 
                        fotoPrincipal.classList.remove('fade-out'); 
                    }, 200);
                };
                miniaturasContainer.appendChild(img);
            });
        }, 200);
    }
});

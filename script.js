document.addEventListener('DOMContentLoaded', () => {
    const btnModelos = document.getElementById('btnModelos');
    const modelMenu = document.getElementById('modelMenu');
    const fotoPrincipal = document.getElementById('foto-principal');
    const miniaturasContainer = document.getElementById('miniaturas-container');
    const precioTxt = document.getElementById('precio-producto');
    const nombreTxt = document.getElementById('product-name');
    const contenedoresMedidas = document.querySelectorAll('.cajon-info span');
    const modal = document.getElementById("modalContacto");
    
    btnModelos.onclick = (e) => { 
        e.stopPropagation(); 
        modelMenu.classList.toggle('active'); 
    };
    document.onclick = () => modelMenu.classList.remove('active');
    document.querySelector(".btn-contacto").onclick = () => modal.style.display = "block";
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };
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
        const viejoStock = document.querySelector('.stock-status');
        if(viejoStock) viejoStock.remove();
        const stockInfo = document.createElement('div');
        const btnCompra = document.querySelector('.btn-whatsapp');
        colorData.forEach(color => {
        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja-color';   
        const colores = color.codigo_hex; // Esto ahora es un Array
        if (colores.length === 2) {
            burbuja.style.background = `linear-gradient(135deg, ${colores[0]} 50%, ${colores[1]} 50%)`;
        } else {
            burbuja.style.backgroundColor = colores[0];
        }
        burbuja.onclick = () => actualizarVista(color);
        });
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
        nombreTxt.textContent = item.nombre;
        precioTxt.textContent = `$ ${item.precio_mayoreo.toLocaleString('es-CO')} COP`;
        if (item.medidas) {
            contenedoresMedidas[0].textContent = item.medidas.circunferencia;
            contenedoresMedidas[1].textContent = item.medidas.altura;
            contenedoresMedidas[2].textContent = item.medidas.visera;
        }
        resaltarInfografia(item.tipo_paneles);
        const selector = document.getElementById('selector-colores');
        selector.innerHTML = '';
        item.colores.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = 'burbuja-color';
            div.style.backgroundColor = c.hex;
            div.onclick = () => {
                document.querySelectorAll('.burbuja-color').forEach(b => b.classList.remove('active'));
                div.classList.add('active');
                actualizarVista(c);
            };
            selector.appendChild(div);
            if(i === 0) div.click();
        });
     function actualizarHotspots(item) {
        const ventanas = document.querySelectorAll('.ventana-flotante');
        if(item.tipo_paneles === 5) {
        ventanas[0].textContent = "Secado Ultra Rápido";}
        }
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

document.addEventListener('DOMContentLoaded', () => {
    const btnModelos = document.getElementById('btnModelos');
    const modelMenu = document.getElementById('modelMenu');
    const fotoPrincipal = document.getElementById('foto-principal');
    const miniaturasContainer = document.getElementById('miniaturas-container');
    const precioTxt = document.getElementById('precio-producto');
    const nombreTxt = document.getElementById('product-name');
    const contenedoresMedidas = document.querySelectorAll('.cajon-info span');
    const selectorColores = document.getElementById('selector-colores');
    const modal = document.getElementById("modalContacto");
    
    // --- LÓGICA DE MENÚ Y MODAL ---
    if(btnModelos) {
        btnModelos.onclick = (e) => { 
            e.stopPropagation(); 
            modelMenu.classList.toggle('active'); 
        };
    }

    document.onclick = () => modelMenu.classList.remove('active');

    const btnContacto = document.querySelector(".btn-contacto");
    if(btnContacto) btnContacto.onclick = () => modal.style.display = "block";

    const btnClose = document.querySelector(".close-modal");
    if(btnClose) btnClose.onclick = () => modal.style.display = "none";

    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

    // --- CARGA DE DATOS ---
    fetch('Productos (1).json')
        .then(res => res.json())
        .then(data => {
            configurarMenu(data);
            if(data.length > 0) cargarProducto(data[0]);
        })
        .catch(err => console.error("Error al cargar JSON:", err));

    function configurarMenu(productos) {
        if(!modelMenu) return;
        modelMenu.innerHTML = '';
        productos.forEach(prod => {
            const li = document.createElement('li');
            li.textContent = prod.nombre;
            li.onclick = () => cargarProducto(prod);
            modelMenu.appendChild(li);
        });
    }

    function cargarProducto(producto) {
        if(nombreTxt) nombreTxt.textContent = producto.nombre;
        if(precioTxt) precioTxt.textContent = `$${producto.precio_mayoreo.toLocaleString()}`;
        
        // Actualizar Medidas
        if(contenedoresMedidas.length >= 3) {
            contenedoresMedidas[0].textContent = producto.medidas.circunferencia;
            contenedoresMedidas[1].textContent = producto.medidas.altura;
            contenedoresMedidas[2].textContent = producto.medidas.visera;
        }

        // Generar Burbujas de Color
        if(selectorColores) {
            selectorColores.innerHTML = '';
            producto.colores.forEach((color, index) => {
                const div = document.createElement('div');
                div.className = 'color-item';
                
                // LÓGICA DE DETECCIÓN DE BICOLOR (GRADIENTE)
                if (Array.isArray(color.hex)) {
                    // Si el JSON trae ["#color1", "#color2"]
                    div.style.background = `linear-gradient(135deg, ${color.hex[0]} 50%, ${color.hex[1]} 50%)`;
                } else {
                    // Si es un color sólido
                    div.style.backgroundColor = color.hex;
                }

                div.title = color.color_nombre;
                div.onclick = () => {
                    document.querySelectorAll('.color-item').forEach(b => b.classList.remove('selected'));
                    div.classList.add('selected');
                    actualizarVista(color);
                };
                selectorColores.appendChild(div);
                
                // Cargar el primer color por defecto
                if(index === 0) div.click();
            });
        }

        resaltarInfografia(producto.tipo_paneles);
    }

    function actualizarVista(colorData) {
        if(!fotoPrincipal) return;

        fotoPrincipal.classList.add('fade-out');
        
        setTimeout(() => {
            fotoPrincipal.src = colorData.fotos[0];
            fotoPrincipal.classList.remove('fade-out');
            
            // Refrescar miniaturas
            if(miniaturasContainer) {
                miniaturasContainer.innerHTML = '';
                colorData.fotos.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.className = 'miniatura';
                    img.onclick = () => {
                        fotoPrincipal.src = imgUrl;
                    };
                    miniaturasContainer.appendChild(img);
                });
            }
        }, 200);
    }

    function resaltarInfografia(tipo) {
        const cards = document.querySelectorAll('.comp-card');
        cards.forEach(card => card.classList.remove('highlight'));
        
        if (tipo === 5 && cards[0]) cards[0].classList.add('highlight');
        if (tipo === 6 && cards[1]) cards[1].classList.add('highlight');
    }
});

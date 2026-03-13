document.addEventListener('DOMContentLoaded', () => {
    const btnModelos = document.getElementById('btnModelos');
    const modelMenu = document.getElementById('modelMenu');
    const fotoPrincipal = document.getElementById('foto-principal');
    const miniaturasContainer = document.getElementById('miniaturas-container');
    const precioTxt = document.getElementById('precio-producto');
    const nombreTxt = document.getElementById('product-name');
    const contenedoresMedidas = document.querySelectorAll('.cajon-info span');

    btnModelos.onclick = (e) => { e.stopPropagation(); modelMenu.classList.toggle('active'); };
    document.onclick = () => modelMenu.classList.remove('active');
    const modal = document.getElementById("modalContacto");
    document.querySelector(".btn-contacto").onclick = () => modal.style.display = "block";
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };
    fetch('Productos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(prod => {
                const li = document.createElement('li');
                li.textContent = prod.nombre;
                li.onclick = () => cargarProducto(prod);
                modelMenu.appendChild(li);
            });
            cargarProducto(data[0]);
        });
    function cargarProducto(item) {
        nombreTxt.textContent = item.nombre;
        precioTxt.textContent = `$ ${item.precio_mayoreo.toLocaleString('es-CO')} COP`;
        if (item.medidas) {
            contenedoresMedidas[0].textContent = item.medidas.circunferencia;
            contenedoresMedidas[1].textContent = item.medidas.altura;
            contenedoresMedidas[2].textContent = item.medidas.visera;
        }
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
    }
    function cargarMenuModelos(productos) {
    const menu = document.getElementById('modelMenu');
    menu.innerHTML = '';

    productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.categoria}`;
        li.dataset.id = producto.id;
        li.addEventListener('click', () => {
            seleccionarProducto(producto.id);
            menu.classList.remove('active'); 
        });
        menu.appendChild(li);
    });
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

const socket = io();
const form = document.getElementById('formProduct');
const list = document.getElementById('listProduct');


socket.emit('products');
socket.on('listProds',(prods)=> {
    console.log(prods);
    list.innerHTML = "";
    prods.forEach(prod => {
        list.innerHTML += `<tr><td>${prod.title}</td><td>${prod.description}</td><td>${prod.category}</td><td>${prod.price}</td><td>${prod.stock}</td><td>${prod.code}</td><td>${prod.status}</td><td>${prod.id}</td></tr>`;
    });
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const prod = Object.fromEntries(datForm);
    socket.emit('newProduct', prod);
})

socket.on('createdProduct', (mensaje) => {
    Swal.fire(mensaje);
    socket.emit('products');
    form.reset();
});




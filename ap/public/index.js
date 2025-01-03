const productTableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
const productForm = document.getElementById('productForm');
const editModal = document.getElementById('editModal');
const closeModal = document.getElementsByClassName('close')[0];
const editProductForm = document.getElementById('editProductForm');
let currentProductId = null;

// Mostrar todos los productos
async function getProducts() {
    const response = await fetch('/products', { method: 'GET' });
    const products = await response.json();

    productTableBody.innerHTML = '';
    
    if (products.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="4">No hay productos disponibles</td>
        `;
        productTableBody.appendChild(tr);
    } else {
        products.forEach(product => {
            const tr = document.createElement('tr'); 
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.descr}</td>
                <td>$${product.price}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})" class="icon-button"><i class="fa-solid fa-trash"></i></button>
                    <button onclick="showEditModal(${product.id}, '${product.name}', '${product.descr}', ${product.price})" class="icon-button"><i class="fa-solid fa-pen"></i></button>
                </td>
            `;
            productTableBody.appendChild(tr);
        });
    }
}

// Añadir un producto

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const descr = document.getElementById('productDescr').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    
    if (!name || !descr || isNaN(price)) {
        alert('Please fill all the fields');
    } else {
        addProduct(name, descr, price);
        productForm.reset();
    }
});

async function addProduct(name, descr, price) {
    try {
        const response = await fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, descr, price })
        });

        if (response.ok) {
            getProducts();
        } else {
            const errorText = await response.text();
            alert('Error adding the product: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding the product: ' + error.message);
    }
}

// Eliminar un producto

function deleteProduct(id) {
    fetch(`/products/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            getProducts();
        } else {
            alert('Error deleting the product');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting the product: ' + error.message);
    });
}

// Editar un producto

function showEditModal(id, name, descr, price) {
    currentProductId = id;
    document.getElementById('editProductName').value = name;
    document.getElementById('editProductDescr').value = descr;
    document.getElementById('editProductPrice').value = price;
    editModal.style.display = 'block';
}

closeModal.onclick = function() {
    editModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
}

editProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('editProductName').value;
    const descr = document.getElementById('editProductDescr').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);

    if (!name || !descr || isNaN(price)) {
        alert('Please fill all the fields correctly.');
    } else {
        editProduct(currentProductId, name, descr, price);
    }
});


async function editProduct(id, name, descr, price) {
    try {
        const response = await fetch(`/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, descr, price })
        });

        if (response.ok) {
            getProducts();
            editModal.style.display = 'none';
        } else {
            const errorText = await response.text();
            alert('Error updating the product: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating the product: ' + error.message);
    }
}

getProducts();

function prueba() {
    console.log('prueba');
}
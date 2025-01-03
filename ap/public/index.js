const productTable = document.getElementById('productTable');
const productTableBody = productTable.getElementsByTagName('tbody')[0];
const productForm = document.getElementById('productForm');

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
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    <button onclick="editProduct(${product.id})">Editar</button>
                </td>
            `;
            productTableBody.appendChild(tr);
        });
    }
}

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

function editProduct(id) {
    const name = prompt('Enter the new name');
    const descr = prompt('Enter the new description');
    const price = parseFloat(prompt('Enter the new price'));

    if (!name || !descr || isNaN(price)) {
        alert('Please fill all the fields');
    } else {
        fetch(`/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, descr, price })
        })
        .then(response => {
            if (response.ok) {
                getProducts();
            } else {
                alert('Error updating the product');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Error updating the product: ' + error.message);
        });
    }

}

getProducts();
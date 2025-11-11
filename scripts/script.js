// script.js - Lógica para el cálculo del total de compra en supermercado

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const productCountInput = document.getElementById('productCount');
    const generateInputsButton = document.getElementById('generateInputs');
    const productInputsContainer = document.getElementById('productInputs');
    const calculateTotalButton = document.getElementById('calculateTotal');
    const resetFormButton = document.getElementById('resetForm');
    const resultContainer = document.getElementById('result');

    // Variable para almacenar el número de productos
    let productCount = 0;

    // Evento para el botón "Generar Campos"
    generateInputsButton.addEventListener('click', function() {
        // Obtener el valor del input de cantidad de productos
        productCount = parseInt(productCountInput.value);

        // Validar que el valor sea un número válido y mayor que 0
        if (isNaN(productCount) || productCount <= 0) {
            alert('Por favor, ingrese un número válido mayor que 0.');
            return;
        }

        // Generar los campos de entrada para los precios
        generatePriceInputs(productCount);
        
        // Mostrar el contenedor de inputs de productos
        productInputsContainer.classList.add('show');
        
        // Habilitar el botón de calcular total
        calculateTotalButton.disabled = false;
        
        // Ocultar el resultado si estaba visible
        resultContainer.classList.remove('show');
    });

    // Evento para el botón "Calcular Total"
    calculateTotalButton.addEventListener('click', function() {
        // Calcular el total de la compra
        const total = calculateTotal();
        
        // Mostrar el resultado
        displayResult(total);
    });

    // Evento para el botón "Reiniciar"
    resetFormButton.addEventListener('click', function() {
        // Restablecer el formulario
        resetForm();
    });

    // Función para generar los campos de entrada de precios
    function generatePriceInputs(count) {
        // Limpiar el contenedor de inputs
        productInputsContainer.innerHTML = '';
        
        // Crear un campo de entrada para cada producto
        for (let i = 1; i <= count; i++) {
            // Crear el elemento div para contener el label y el input
            const inputDiv = document.createElement('div');
            inputDiv.className = 'price-input';
            
            // Crear el label
            const label = document.createElement('label');
            label.textContent = `Precio del producto ${i}:`;
            label.htmlFor = `price${i}`;
            
            // Crear el input
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `price${i}`;
            input.min = '0';
            input.step = '0.01';
            input.placeholder = '0.00';
            input.required = true;
            
            // Añadir el label y el input al div
            inputDiv.appendChild(label);
            inputDiv.appendChild(input);
            
            // Añadir el div al contenedor
            productInputsContainer.appendChild(inputDiv);
        }
    }

    // Función para calcular el total de la compra
    function calculateTotal() {
        let total = 0;
        
        // Recorrer todos los inputs de precio y sumar sus valores
        for (let i = 1; i <= productCount; i++) {
            const priceInput = document.getElementById(`price${i}`);
            const price = parseFloat(priceInput.value) || 0; // Si no es un número válido, usar 0
            total += price;
        }
        
        // Redondear a 2 decimales para evitar problemas de precisión con números flotantes
        return Math.round(total * 100) / 100;
    }

    // Función para mostrar el resultado
    function displayResult(total) {
        // Formatear el total como moneda
        const formattedTotal = total.toFixed(2);
        
        // Crear el contenido del resultado
        resultContainer.innerHTML = `
            <h2>Resumen de Compra</h2>
            <p>El total a pagar es: $${formattedTotal}</p>
        `;
        
        // Mostrar el contenedor de resultados
        resultContainer.classList.add('show');
    }

    // Función para restablecer el formulario
    function resetForm() {
        // Restablecer el input de cantidad de productos
        productCountInput.value = '';
        
        // Ocultar y limpiar el contenedor de inputs de productos
        productInputsContainer.classList.remove('show');
        productInputsContainer.innerHTML = '';
        
        // Deshabilitar el botón de calcular total
        calculateTotalButton.disabled = true;
        
        // Ocultar el resultado
        resultContainer.classList.remove('show');
        
        // Restablecer la variable productCount
        productCount = 0;
        
        // Enfocar el input de cantidad de productos
        productCountInput.focus();
    }
});

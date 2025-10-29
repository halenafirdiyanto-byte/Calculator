document.addEventListener('DOMContentLoaded', function () {
    let historiDiv = document.querySelector('.histori');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let histori = "";

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleButtonClick(button.innerText);
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clearAll();
        } else if (value === 'DEL') {
            deleteLastChar();
        } else if (value === '=') {
            evaluateExpression();
        } else {
            appendToScreen(value);
        }
    }

    function clearAll() {
        screen.textContent = "";
        histori = "";
        updateHistori();
    }

    function deleteLastChar() {
        let currentText = screen.textContent;
        screen.textContent = currentText.slice(0, -1);
    }

    function appendToScreen(value) {
        screen.textContent += value;
    }

    function evaluateExpression() {
        try {
            let expression = screen.textContent;

            // ✅ Ubah semua simbol % menjadi '/100'
            // Misal: "50%" → "50/100"
            // atau "200+10%" → "200+(10/100)"
            expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

            let result = eval(expression);
            result = parseFloat(result.toFixed(5));

            histori = screen.textContent + '=' + result;
            screen.textContent = result;
            updateHistori();
        } catch (error) {
            screen.textContent = 'error';
        }
    }

    function updateHistori() {
        historiDiv.textContent = histori;
    }
});

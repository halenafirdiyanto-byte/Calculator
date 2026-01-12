document.addEventListener('DOMContentLoaded', function () {

    let historiDiv = document.querySelector('.histori');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn, .btnn');
    let btnClock = document.querySelector('.btn_outside');
    let historiList = [];
    let historiVisible = false;

    const displayMap = { "*": "x", "/": "÷" };

    // BUTTON ANGKA & OPERATOR
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            let value = button.dataset.value || button.innerText.trim();
            handleButtonClick(value);
        });   
    });

    // BUTTON HISTORI
    if (btnClock) {
        btnClock.addEventListener('click', function () {
            toggleHistory();
        });
    } else {
        console.error('Button histori (.btn_outside) tidak ditemukan');
    }

    function handleButtonClick(value) {
        if (value === 'C') {
            screen.textContent = "";
        }
        else if (value === 'DEL') {
            deleteLastChar();
        }
        else if (value === '=') {
            evaluateExpression();
        }
        else if (value === 'theme') {
            toggleTheme();
        }
        else {
            appendToScreen(value);
        }
    }

    function deleteLastChar() {
        screen.textContent = screen.textContent.slice(0, -1);
    }

    function appendToScreen(value) {
        let displayValue = displayMap[value] || value;
        screen.textContent += displayValue;
    }


    // HITUNG
    function evaluateExpression() {
        try {
            let expression = screen.textContent;
            expression = expression.replace(/x/g, "*").replace(/÷/g, "/");
            expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

            let result = eval(expression);
            result = parseFloat(result.toFixed(5));

            historiList.push(screen.textContent + " = " + result);
            screen.textContent = result;

            updateHistoryUI();
        } catch {
            screen.textContent = "error";
        }
    }

    // UPDATE HISTORI
    function updateHistoryUI() {
    historiDiv.innerHTML = historiList
        .map(item => {
            let value = item.split('=')[1].trim(); // ambil hasil
            return `<div class="item" data-value="${value}">${item}</div>`;
        })
        .join("");

    document.querySelectorAll('.histori .item').forEach(el => {
        el.addEventListener('click', function () {
            screen.textContent = this.dataset.value;
        });
    });
}



    // TOGGLE HISTORI
    function toggleHistory() {
    historiVisible = !historiVisible;

    if (historiVisible) {
        historiDiv.classList.add('show');
        updateHistoryUI();
    } else {
        historiDiv.classList.remove('show');
    }
}


    // THEME MODE
    function toggleTheme() {
        document.body.classList.toggle('light-mode');

        let icon = document.querySelector('.theme-btn i');
        icon.className = document.body.classList.contains('light-mode')
            ? "bi bi-moon-fill"
            : "bi bi-sun-fill";
    }

});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const maxLessons = document.getElementById('maxLessons').value;
        const language = document.getElementById('language').value;

        const tableHTML = generateTable(days, maxLessons, language);

        tableContainer.innerHTML = tableHTML;

        saveToLocalStorage({ days, maxLessons, language });
    });

    const savedParams = loadFromLocalStorage();
    if (savedParams) {
        document.getElementById('days').value = savedParams.days;
        document.getElementById('maxLessons').value = savedParams.maxLessons;
        document.getElementById('language').value = savedParams.language;
    }
});

function generateTable(days, maxLessons, language) {
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Day/Lesson';
    headerRow.appendChild(headerCell);

    for (let lesson = 1; lesson <= maxLessons; lesson++) {
        const lessonHeaderCell = document.createElement('th');
        lessonHeaderCell.textContent = `Lesson ${lesson}`;
        headerRow.appendChild(lessonHeaderCell);
    }

    table.appendChild(headerRow);

    table.classList.add(language);

    for (let day = 1; day <= days; day++) {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');

        dayCell.textContent = language === 'russian' ? `День ${day}` : `Day ${day}`;
        row.appendChild(dayCell);

        for (let lesson = 1; lesson <= maxLessons; lesson++) {
            const cell = document.createElement('td');
            const content = document.createElement('div');

            content.textContent = language === 'russian' ? `Содержание для Дня ${day}, Занятия ${lesson}` : `Content for Day ${day}, Lesson ${lesson}`;

            content.setAttribute('contenteditable', 'true');

            content.addEventListener('blur', function () {
                console.log(`Changed content: ${content.textContent}`);
            });

            cell.appendChild(content);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table.outerHTML;
}


function saveToLocalStorage(params) {
    localStorage.setItem('tableParams', JSON.stringify(params));
}

function loadFromLocalStorage() {
    const savedParams = localStorage.getItem('tableParams');
    return savedParams ? JSON.parse(savedParams) : null;
}

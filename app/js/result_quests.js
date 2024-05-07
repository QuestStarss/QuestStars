// Получаем ссылку на секцию, в которую будем выводить квесты

const clearBox = (elementId) => {
    console.log(elementId)
    document.getElementById(elementId).innerHTML = '';
}

let resultSection = document.querySelector('.result_quests');

// Делаем запрос к API и добавляем блоки
fetch('server/apiListener.php/api/quest/read')
    .then(response => response.json())
    .then(data => {
        data.forEach(quest => {
            // Создаем блок квеста для каждого объекта quest
            const questElement = document.createElement('div');
            questElement.classList.add('quest');

            // Устанавливаем фоновое изображение
            fetch(quest.imageLink)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    questElement.style.backgroundImage = `url(${imageUrl})`;
                })
                .catch(error => {
                    console.error('Ошибка при загрузке изображения:', error);
                });

            const avgRating = parseFloat(quest.avgRating).toFixed(1);
            // Заполняем содержимое блока данными квеста из текущего объекта quest
            questElement.innerHTML = `
                <h3>Название квеста: ${quest.title}</h3>
                <p>Описание квеста: ${quest.description}</p>
                <p>Максимальное кол-во игроков: ${quest.maxPlayers}</p>
                <p>Рейтинг: ${avgRating}</p>
                <p>Кол-во отзывов: ${quest.numOfGrades}</p>
            `;

            // Добавляем блок квеста в секцию
            resultSection.appendChild(questElement);
        });
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });


let search_quests = document.getElementById('search_quest');
search_quests.addEventListener('submit', (event)=> {
    resultSection.innerHTML = '';
    event.preventDefault();
    let janr = document.getElementById('janr').value;
    let players = parseInt(document.getElementById('howMuch').value); // преобразовано в число
    let rate = parseInt(document.getElementById('rate').value); // преобразовано в число
    fetch('app/js/result_quests.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let filteredQuests = data.filter(quest => {
                console.log(quest.janr)
                return quest.janr === janr && parseInt(quest.maxPlayers) >= players && parseInt(quest.avgRating) === rate;
            });
            console.log(filteredQuests)

            filteredQuests.forEach(quest => {

                // fetch(quest.imageLink)
                //     .then(response => response.blob())
                //     .then(blob => {
                //         const imageUrl = URL.createObjectURL(blob);
                //         questElement.style.backgroundImage = `url(${imageUrl})`;
                //     })
                //     .catch(error => {
                //         console.error('Ошибка при загрузке изображения:', error);
                //     });
                const questElement = document.createElement('div');
                questElement.classList.add('quest');

                questElement.innerHTML = `
                    <h3>Название квеста: ${quest.title}</h3>
                    <p>Описание квеста: ${quest.description}</p>
                    <p>Максимальное кол-во игроков: ${quest.maxPlayers}</p>
                    <p>Рейтинг: ${quest.avgRating}</p>
                    <p>Кол-во отзывов: ${quest.numOfGrades}</p>
                `;

                resultSection.appendChild(questElement);

            })
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });

})

let show_all_quest = document.getElementById('show_all_quest');

console.log(show_all_quest)

show_all_quest.addEventListener('click', (event) => {
    resultSection.innerHTML = '';
    console.log('Все элементы')
    event.preventDefault()
    fetch('server/apiListener.php/api/quest/read')
    .then(response => response.json())
    .then(data => {
        data.forEach(quest => {
            // Создаем блок квеста для каждого объекта quest
            const questElement = document.createElement('div');
            questElement.classList.add('quest');

            // Устанавливаем фоновое изображение
            fetch(quest.imageLink)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    questElement.style.backgroundImage = `url(${imageUrl})`;
                })
                .catch(error => {
                    console.error('Ошибка при загрузке изображения:', error);
                });

            const avgRating = parseFloat(quest.avgRating).toFixed(1);
            // Заполняем содержимое блока данными квеста из текущего объекта quest
            questElement.innerHTML = `
                <h3>Название квеста: ${quest.title}</h3>
                <p>Описание квеста: ${quest.description}</p>
                <p>Максимальное кол-во игроков: ${quest.maxPlayers}</p>
                <p>Рейтинг: ${avgRating}</p>
                <p>Кол-во отзывов: ${quest.numOfGrades}</p>
            `;

            // Добавляем блок квеста в секцию
            resultSection.appendChild(questElement);
        });
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });
})
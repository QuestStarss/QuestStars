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
    let Minrate = parseInt(document.getElementById('rate').value); // преобразовано в число
    fetch('server/apiListener.php/api/quest/read')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let filteredQuests = data.filter(quest => {
                console.log(quest.genre)
                return quest.genre === janr && parseInt(quest.maxPlayers) >= players && parseFloat(quest.avgRating).toFixed(1) >= Minrate;
            });
            console.log(filteredQuests)

            filteredQuests.forEach(quest => {

                fetch(quest.imageLink)
                    .then(response => response.blob())
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        questElement.style.backgroundImage = `url(${imageUrl})`;
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке изображения:', error);
                    });
                const questElement = document.createElement('div');
                questElement.classList.add('quest');

                const avgRating = parseFloat(quest.avgRating).toFixed(1);

                questElement.innerHTML = `
                    <h3>Название квеста: ${quest.title}</h3>
                    <p>Описание квеста: ${quest.description}</p>
                    <p>Максимальное кол-во игроков: ${quest.maxPlayers}</p>
                    <p>Рейтинг: ${avgRating}</p>
                    <p>Кол-во отзывов: ${quest.numOfGrades}</p>
                `;

                const bookButton = document.createElement('button');
                bookButton.classList.add('order_btn')
                bookButton.textContent = 'Забронировать Квест';
                bookButton.addEventListener('click', () => {
                    bookQuest(quest.id, players); // Вызываем функцию для бронирования квеста с передачей идентификатора квеста
                });

                questElement.appendChild(bookButton);

                resultSection.appendChild(questElement);

            })
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });

})

function bookQuest(str, players) {
    let auth = sessionStorage.getItem('user_auth');
    if(auth === 'true')
    {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // добавляем 1, так как месяцы в JavaScript начинаются с 0
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}.${month}.${day}`;
        let numberofplayers = players;
        let totalcost = (Math.random() * (10000 - 5000) + 5000).toFixed(0);
        let user_id = sessionStorage.getItem('id')
        let quest_id = str;
        const userData = new FormData();
        userData.append('date', formattedDate);
        userData.append('numberOfPlayers', numberofplayers);
        userData.append('totalCost', totalcost);
        userData.append('user_id', user_id);
        userData.append('quest_id',quest_id)

        const requestOptions = {
            method: 'POST',
            body: userData
        };

        fetch('server/apiListener.php/api/order/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
            })
            .catch(error => {
                console.log(error.error)
            })
    }
    else {
        alert('Авторизуйся пж')
    }

}

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
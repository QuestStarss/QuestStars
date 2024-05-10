
let user_auth = sessionStorage.getItem('user_auth')

let quests = document.getElementById('quests')

if(user_auth === 'true') {
    let name = sessionStorage.getItem('name')
    let id = sessionStorage.getItem('id')
    let login = sessionStorage.getItem('login')
    let email  = sessionStorage.getItem('email')

    const userData = new FormData()

    userData.append('id', id)

    const requestOptions = {
        method: 'POST',
        body: userData
    };

    fetch('server/apiListener.php/api/order/read',requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(quest => {
                let id = quest.id
                let title = quest.title
                let description = quest.description
                let price = quest.totalCost
                let date = quest.date

                const obj = {
                    id,
                    title,
                    description,
                    price,
                    date,
                }

                const questElement = document.createElement('div');
                questElement.classList.add('quest');

                questElement.innerHTML = `
                <h3>id: ${obj.id}</h3>
                <p>Название: ${obj.title}</p>
                <p>Описание: ${obj.description}</p>
                <p>Цена: ${obj.price}</p>
                <p>Дата бронирования: ${obj.date}</p>
            `;

                quests.appendChild(questElement)

                console.log(obj)
            })
        })

    let obj = {
        'name': name,
        'id': id,
        'login': login,
        'email': email
    }

    let lcElement = document.getElementById('lc');

// Перебор объекта и добавление значений ключей в HTML
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newElement = document.createElement('div');
            newElement.textContent = key + ': ' + obj[key];
            lcElement.appendChild(newElement);
        }
    }
}

else {
    window.location.assign('./index.html')
}

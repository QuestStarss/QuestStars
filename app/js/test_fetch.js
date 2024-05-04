
const userData = {
    name: 'Имя пользователя',
    email: 'example@example.com',
    password: 'пароль123',
    login: 'логин123'
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
};
fetch("api/user/create", requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
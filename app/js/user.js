document.getElementById('registration').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    let name = document.getElementById('name').value;
    console.log(name)
    let login = document.getElementById('login').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('password', password);
    userData.append('login', login);

    const requestOptions = {
        method: 'POST',
        body: userData
    };

    fetch("server/apiListener.php/api/user/create", requestOptions) // Исправленный путь для отправки запроса
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Вы зарегистрировались!')
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert('Ошибка регистрации!')
        });
});

document.getElementById('authorization').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    let email_authorization = document.getElementById('email_authorization').value;
    let password_authorization = document.getElementById('password_authorization').value;


    const userData = new FormData();
    userData.append('password', password_authorization);
    userData.append('email', email_authorization);

    const requestOptions = {
        method: 'POST',
        body: userData
    };

    fetch("server/apiListener.php/api/user/auth", requestOptions) // Исправленный путь для отправки запроса
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let id = data.id;
            let name = data.Name;
            console.log(name)
            let login = data.Login
            let email = data.Email;
            if(data.message === 'error') {
                alert('Неправильный логин или пароль')
            }
            else {
                sessionStorage.setItem('id', id);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('login', login);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('user_auth', 'true');
                window.location.assign('./personal_account.html')
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert('Ошибка авторизации!')
        });
});



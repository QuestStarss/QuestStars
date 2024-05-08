
let user_auth = sessionStorage.getItem('user_auth')

if(user_auth === 'true') {
    let name = sessionStorage.getItem('name')
    let id = sessionStorage.getItem('id')
    let login = sessionStorage.getItem('login')
    let email  = sessionStorage.getItem('email')

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

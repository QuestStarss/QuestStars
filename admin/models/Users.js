const formData = new FormData();
formData.append("id",0);

const requsetOption = {
    method: 'POST',
    body: formData
}

fetch('../../server/apiListener.php/api/user/read', requsetOption)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            let element = document.createElement('div');
            element.classList.add('user-record');
            element.innerHTML = `
                <p>${user.Name}</p>
                <p>${user.Login}</p>
                <p>${user.Email}</p>
                <button>Открыть заявки пользователя</button>
                <p></p>
                <button>Открыть комментарии пользователя</button>
            `;
            document.querySelector('.user-info').appendChild(element);
        });
    })
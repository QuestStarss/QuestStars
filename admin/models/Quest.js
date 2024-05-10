const formData = new FormData();
formData.append("id", 0);

const requsetOption = {
    method: 'POST',
    body: formData
}

fetch('../../server/apiListener.php/api/quest/read', requsetOption)
    .then(res => res.json())
    .then(data => {
        data.forEach(quest => {
            let element = document.createElement('div');
            let imgUrl = new URL(quest.imageLink,'http://localhost/queststars/');
            element.style.backgroundImage = `url(${imgUrl})`;
            element.classList.add('quest-record');
            element.innerHTML = `
                <p>${quest.title}</p>
                <p>${quest.description}</p>
                <p>${quest.avgRating}</p>
            `;
            document.querySelector('.quest-info').appendChild(element);
        });
    })


document.querySelector("#createQuest").addEventListener('submit', (e) => {
    e.preventDefault();
    let requestOption = {
        method: 'POST',
        body: new FormData(createQuest)
    }

    fetch('../../server/apiListener.php/api/quest/create', requestOption)
        .then(res => res.json())
        .then(alert('Квест добавлен'))
        .catch(err => alert(err));

})
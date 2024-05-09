const reviewsPerPage = 6; // Количество отзывов на странице
let currentPage = 1; // Текущая страница
let totalPages; // Общее количество страниц
let reviewsData; // Данные отзывов

const userData = new FormData()

userData.append('id', '0')

const requestOptions = {
    method: 'POST',
    body: userData
};

window.onload = function() {
    fetch("server/apiListener.php/api/comment/read", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            reviewsData = data; // Сохраняем данные отзывов
            totalPages = Math.ceil(reviewsData.length / reviewsPerPage); // Рассчитываем общее количество страниц
            displayReviews(reviewsData);
            displayPagination();
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });

    document.getElementById("prevPage").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            displayReviews(reviewsData);
        }
    });

    document.getElementById("nextPage").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayReviews(reviewsData);
        }
    });
};

function displayReviews(reviews) {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const reviewsDiv = document.getElementById("reviews");
    reviewsDiv.innerHTML = ""; // Очистим отзывы перед добавлением новых
    reviews.slice(startIndex, endIndex).forEach(review => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p>Автор: ${review.name}</p>
            <p>"${review.comment}"</p>
            <p>Ссылка на квест: ${review.srcQuest}</p>
            <p>Отзыв : ${review.mark}/5</p>
        `;
        reviewsDiv.appendChild(reviewElement);
    });
}

function displayPagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; // Очистим пагинацию перед добавлением новых кнопок
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", function() {
            currentPage = i;
            displayReviews(reviewsData);
        });
        paginationDiv.appendChild(pageButton);
    }
}

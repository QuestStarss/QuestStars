document.addEventListener('DOMContentLoaded', function(event) {
    let modal = document.getElementById('modal_btn');
    let modal_form = document.getElementById('modal_form');
    let modalContainer = document.getElementById('modalContainer');

    modal.addEventListener('click', () => {
        console.log('click');
        modal_form.classList.remove('modal_disable');
        modalContainer.classList.add('form_active');
    });

    modal_form.addEventListener('click', (event) => {
        console.log('кликнул по заднему фону');
        if(event.target !== modal_form) {

        }
        else {
            modalContainer.classList.remove('form_active');
            modal_form.classList.add('modal_disable');
        }
    });

    let regBtn = document.getElementById('registration_mode');
    let authBtn = document.getElementById('authorization_mode');
    let regForm = document.getElementById('registration');
    let authForm = document.getElementById('authorization')

    regBtn.addEventListener('click', () => {
        console.log('reg')
        regBtn.classList.add('active')
        authBtn.classList.remove('active')
        authForm.classList.add('disable')
        regForm.classList.remove('disable')

    })

    authBtn.addEventListener('click', () => {
        console.log('auth')
        authBtn.classList.add('active')
        regBtn.classList.remove('active')
        authForm.classList.remove('disable')
        regForm.classList.add('disable')
    })

    let searchContainer = document.getElementById('searchContainer');
    let result_search = document.getElementById('result_search')

    searchContainer.addEventListener('click', (event) => {
        if(event.target !== searchContainer) {
            searchContainer.classList.remove('expanded')
            result_search.classList.remove('result_search')
        }
        else {
            searchContainer.classList.add('expanded')
            result_search.classList.add('result_search')
        }
    })

});




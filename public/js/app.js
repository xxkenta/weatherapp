const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data)=>{
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.place_name
                messageTwo.textContent = data.forecast
            }
        })
    })
})


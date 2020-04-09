
const weatherform= document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')

const message2 = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent='Loading....'
    message2.textContent=''
//removing the local host version
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                message1.textContent=data.error
            }
            else{
                message1.textContent=data.location
                message2.textContent=data.forecast
               
            }
        })
    })  
})
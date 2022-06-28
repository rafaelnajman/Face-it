`
const about = document.querySelector('#about')
const button = document.querySelector('.toggle button')
const button2 = document.querySelector('.toggle2 button')
const preparation = document.querySelector('.preparation')
const information = document.querySelector('.information')
let show = true
let show_2 = true

about.addEventListener("click", function(){
    about.style.fontWeight = "bold"
    console.log('foi')

})

button.addEventListener("click", function(){
    preparation.classList.toggle("on")
    button.innerHTML= show?"Mostrar" : "Fechar"
    console.log("oi")
    show = !show
})

    

button2.addEventListener("click", function(){
    information.classList.toggle("on")
    button2.innerHTML= show_2?"Mostrar" : "Fechar"
    console.log("oi")
    show_2 = !show_2
})

function upload() {
    
}
`
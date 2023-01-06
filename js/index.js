
import fns from "../js/utils.js"

let cards = document.querySelector(".cards")
let search = document.querySelector(".search")
let info = document.querySelector(".info")
let btna = document.querySelector(".btna")
let korzinka = document.querySelector(".korzinka")
let box3 = document.querySelector(".box3")
let home = document.querySelector(".home")
let like = document.querySelector(".South_America")
const {$, $$} = fns
let countries = []
async function fetchData(){
    await fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data => {countries = data ; renderCards(data);console.log(data);})
}

fetchData()
function renderCards(data){
    let num = 0
    cards.innerHTML = ""
    data.forEach(item => {
        let card =  $$("div", "card ", `
        
<button id="${item.area}" class="like-button like">
<div class="like-wrapper">
  <div class="ripple"></div>
  <svg class="heart" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
  </svg>
  <div class="particles" style="--total-particles: 6">
    <div class="particle" style="--i: 1; --color: #7642F0"></div>
    <div class="particle" style="--i: 2; --color: #AFD27F"></div>
    <div class="particle" style="--i: 3; --color: #DE8F4F"></div>
    <div class="particle" style="--i: 4; --color: #D0516B"></div>
    <div class="particle" style="--i: 5; --color: #5686F2"></div>
    <div class="particle" style="--i: 6; --color: #D53EF3"></div>
  </div>
</div>
</button>
        <div class = "product">
        <img  height="200" class="flag__img w-100" src="${item.flags.svg}" alt="flags">
        <h4>${item.name.official}</h4>
        <div class= "impoct">
        <button id="${item.area}"  class="more btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">More</button>
        <button id="${item.area}" class="add">Add</button>
        </div>
        </div>
        ` )
          
      
      cards.appendChild(card)
      card.addEventListener("click",(e)=>{
         if (e.target.className.includes("more")) {
              
                
                if (e.target.id == item.area) {
                    info.innerHTML = `
                    <img  height="200" class="flag__img w-100" src="${item.flags.svg}" alt="flags">
                    <ul>
                    <li class = "products__item">
                    <mark class = "mark">Country:</mark><ins><i> ${item.name.official}</i></ins> 
                   </li>
                   <li class = "products__item">
                   <mark class = "mark">Capital:</mark> <ins><i>${item.capital}</i></ins> 
                   </li>
                   <li class = "products__item">
                   <mark class = "mark">Continets:</mark><ins><i>${item.continents}</i></ins> 
                   </li>
                   <li class = "products__item">
                   <mark class = "mark">Area:</mark><ins><i> ${item.area}</i></ins> 
                   </li>
                   <li class = "products__item">
                   <mark class = "mark">Population:</mark><ins><i> ${item.population}</i></ins> 
                   </li>
                   
                    </ul>
                    `
                    console.log("dsdsd");
                }
    
         }else if (e.target.className.includes("add")){
                 if (e.target.id == item.area) {
                    let produc = data.find(item => item.area == e.target.id)

            
            
                    let arr = JSON.parse(localStorage.getItem("products")) || []
                    if (!arr.find(el => el.id == e.target.id)) {
                        arr.push(produc)
                    }
            
                    localStorage.setItem("products", JSON.stringify(arr))

                 }
         }
         
      })
    })


}

function renderMore(data) {
    console.log(data)


    data.forEach(item => {
        let card2 =  $$("div", "card d-inline-block", `
        <img  height="200" class="flag__img w-100" src="${item.flags.svg}" alt="flags">
        <h4>${item.name.official}</h4>
        ` )
        info.appendChild(card2)
    })
}

search.addEventListener("input", function(e){
    let searchData = countries.filter(el => el.name.official.toLowerCase().includes($(".search").value.toLowerCase()) || (el.capital && el.capital[0].toLowerCase().includes($(".search").value.toLowerCase())))

    renderCards(searchData)
})







korzinka.addEventListener("click",(e)=>{
    function renderBuy() {
    let mahsulot = JSON.parse(localStorage.getItem("products"))
        cards.innerHTML = ""
        mahsulot.forEach((item) => {

            let li = document.createElement("li")
            li.innerHTML = ` 
            <div class = "product">
            <img  height="200" class="flag__img w-100" src="${item.flags.svg}" alt="flags">
            <h4>${item.name.official}</h4>
            <button id="${item.area}" class="delete">Delete</button>
      
            </div>
      `      
            li.addEventListener("click",(e)=>{
                 if(e.target.className.includes("delete")){
            for(let i = 0; i < mahsulot.length;i++){
                if(e.target.id == mahsulot[i].area){
                  mahsulot.splice(i,1) 
                  
                  console.log(mahsulot);
                  
                }
            }

    }

            })

            cards.appendChild(li)

        })
    }
    

    renderBuy()
})


home.addEventListener("click",(e)=>{
    fetchData()
})



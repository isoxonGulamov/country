import { menuProducts } from "./data.js";
import { product } from "./menu.js";

let header__box = document.querySelector(".header__box")


let render = () => {
  header__box.innerHTML = `
 <menu  class="menu">
 ${menuProducts.map((item) => product(item)).join("")}
 </menu>
`
}

render()



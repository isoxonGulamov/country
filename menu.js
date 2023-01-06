export let product = ({color,img,name}) =>{
  return `
  <button class="menu__item active ${name}" style="--bgColorItem: ${color};" >
  ${img}
</button>
  `
  }
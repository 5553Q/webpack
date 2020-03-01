import css from "./css/index.css";
import less from "./css/index.less";
import "babel-polyfill";
document.querySelector("body").innerHTML =
  '<img class="img"/><img class="img2"/><div class="Less"></div>';
function idMaker() {
  let index = 0;
  return {
    next: () => {
      return { value: index++, done: false };
    }
  };
}
const it = idMaker();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);

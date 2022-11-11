var num = document.getElementById("num");
num.innerHTML = "pizza";

var list = Array.from(document.querySelectorAll(".dropdown-item"));
console.log(list);
var globalItem;
(function () {
  for (var i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function (e) {
      console.log(e.target.innerHTML);
      var meal = e.target.innerHTML;
      num.innerHTML=meal;
      getRecipes(meal);
    });
  }
})();

var apiRes = [];
function getRecipes(food) {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${food}`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200) {
      console.log(xml.response);
      apiRes = JSON.parse(xml.response);
      apiRes = apiRes.recipes;
      console.log(apiRes);
      display();
    }
  });
}
console.log(apiRes);
getRecipes("pizza");
function display() {
  var box = ``;
  for (var i = 0; i < apiRes.length; i++) {
    box += `<div class=" col-sm-6 col-md-3" data-bs-toggle="modal" data-bs-target="#exampleModal" 
     onclick="getSpesificRecipe(${apiRes[i].recipe_id})"
     >
          <img src="${apiRes[i].image_url}" class="w-100"/>
          <p>${apiRes[i].title}</p>
        </div>
        `;
  }

  document.getElementById("row").innerHTML = box;
}
var x={};
var ingrad=[];
function getSpesificRecipe(id) {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200) {
      console.log(xml.response);
      x = JSON.parse(xml.response);
      x=x.recipe;
      ingrad=x.ingredients;
      dis();
    }
  });
}
function dis() {
  var box = ``;
    box += ` <img src="${x.image_url}" alt="">`
    for (var i=0 ;i <ingrad.length; i++)
    { box+=`
      <p>${ingrad[i]}

      </p>`
    }

  
  document.getElementById("modal-body").innerHTML = box;
}
var up =document.getElementById("up");
var nav =document.querySelector("nav");
window.addEventListener("scroll",function(){
  nav.classList.remove("bg-light");
  nav.classList.add("fixed-top","bg-black");
  num.style.color="white"
  
  up.style.opacity= "1";
  up.style.zIndex = "9";
  if(window.scrollY==0 ){
    up.style.opacity= "0";
    up.style.zIndex = "-1";
    nav.classList.remove("bg-black");
    nav.classList.add("bg-light");
    num.style.color="black";
  }

})


up.addEventListener("click", function(){
  window.scrollTo(0,0);
})
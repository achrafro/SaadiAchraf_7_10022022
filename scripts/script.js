async function getrecipes() {
 
     
    const response = await fetch('/assets/data/data.json');

    const data = await response.json();
    
   let recette = [data];
 
   function afficher() {
    let galerie = document.getElementById("galeries");

for (let i=0;i<recette[0].recipes.length;i++) {
   let nv_article = document.createElement("article");
   nv_article.className="box";
   let image_vide = document.createElement("div");
   image_vide.className="image_vide";
   nv_article.appendChild(image_vide);

   let nom_recette = document.createElement("p");
   nom_recette.textContent = recette[0].recipes[i].name;
   nom_recette.className="recette_name";
   let zone_time = document.createElement("div");
   zone_time.className="zone_time"
   let time_recette = document.createElement("p");
   time_recette.textContent = recette[0].recipes[i].time+" Min";
   time_recette.classList="time_recette";
   let time_icon = document.createElement("i");
   time_icon.classList="far fa-clock";
   let description_recette = document.createElement("p");
   description_recette.className ="description"
   description_recette.textContent = recette[0].recipes[i].description;
   let ingredient_zone = document.createElement("div");
   ingredient_zone.className= "ingredient_zone";


   for (let c=0; c<recette[0].recipes[i].ingredients.length;c++) {

 var ingredients = [recette[0].recipes[i].ingredients];
 var ingredient_recette = document.createElement("p");
 ingredient_recette.className= "ingredients"
  ingredient_recette.textContent = recette[0].recipes[i].ingredients[c].ingredient ;

 ingredient_recette.style.fontWeight ="bold";
 ingredient_recette.style.fontSize ="15px";

if (recette[0].recipes[i].ingredients[c].quantity != undefined) {
    ingredient_recette.textContent+= " : "+ recette[0].recipes[i].ingredients[c].quantity+" ";
    if (recette[0].recipes[i].ingredients[c].unit != undefined) {
        ingredient_recette.textContent+=" "+recette[0].recipes[i].ingredients[c].unit+" ";  
    }
}
ingredient_zone.appendChild(ingredient_recette);

  nv_article.appendChild(ingredient_zone);



   }


 
 

  nv_article.appendChild(nom_recette);
  zone_time.appendChild(time_icon);
  zone_time.appendChild(time_recette);
  nv_article.appendChild(zone_time);
 
   nv_article.appendChild(description_recette);



   galerie.appendChild(nv_article);    
  }
}
//  
//  filtrer les ingredients pour le metttre en dropdown
let grp_ingredient = document.getElementById("grp_ingredient");
let talbe_de_ingredients = [];

data.recipes.forEach(element => {
     talbe_de_ingredients.push(element.ingredients[0].ingredient);
     
});
 
talbe_de_ingredients = _.uniq(talbe_de_ingredients )

 let a = 0;

talbe_de_ingredients.forEach(element => {
    let ingredient_en_drop = document.createElement("a");
    ingredient_en_drop.className="dropdown-item";
    ingredient_en_drop.textContent=talbe_de_ingredients[a];
    ingredient_en_drop.id="ingredient_item";
    grp_ingredient.appendChild(ingredient_en_drop);  
    a++; 
});


// filtrer les appareils //
let grp_appareils = document.getElementById("grp_appareils");
let list_des_appareils = [];

data.recipes.forEach ( element => { 
 list_des_appareils.push(element.appliance);

})

list_des_appareils = _.uniq(list_des_appareils)
let b = 0;
list_des_appareils.forEach(element => {

    let appareils_en_dropdown = document.createElement("a");
    appareils_en_dropdown.className="dropdown-item";
    appareils_en_dropdown.textContent=list_des_appareils[b];
    appareils_en_dropdown.id="appareil_item";
    grp_appareils.appendChild(appareils_en_dropdown);  
    b++;

})

//  Filtrer les usetensiles  : 
let grp_ustensile = document.getElementById("grp_ustensile");
let list_des_ustensiles = [];
data.recipes.forEach ( element => {
 list_des_ustensiles.push(element.ustensils[0]);
})
list_des_ustensiles = _.uniq(list_des_ustensiles)

let c = 0;
list_des_ustensiles.forEach(element => {

    let ustensiles_en_dropdown = document.createElement("a");
    ustensiles_en_dropdown.className="dropdown-item";
    ustensiles_en_dropdown.textContent=list_des_ustensiles[c];
    ustensiles_en_dropdown.id="ustensil_item";
    grp_ustensile.appendChild(ustensiles_en_dropdown);  
    c++;

})

// ajouter event onclick sur les ingridients :
 let ingredient_item = document.querySelectorAll("#ingredient_item");
 let critere = document.getElementById("critere");
  ingredient_item.forEach(element => {
element.addEventListener("click",e => {
 let ingredient_selectionne = e.target.innerText;
 let ingredient_selectionne_button = document.createElement("button");
 ingredient_selectionne_button.textContent=ingredient_selectionne;
 ingredient_selectionne_button.className="btn btn-primary btn-lg btn_top ingridient"
   critere.appendChild(ingredient_selectionne_button);
   let close_btn = document.createElement("span");
   close_btn.textContent=' X '
   ingredient_selectionne_button.appendChild(close_btn);
   close_btn.addEventListener("click",c => {
critere.removeChild(ingredient_selectionne_button)
afficher_selon_critere();
   })
   afficher_selon_critere();

})

 })
 
 // ajouter event onclick sur les appareil :
 let appareil_item = document.querySelectorAll("#appareil_item");
  appareil_item.forEach(element => {
element.addEventListener("click",e => {
 let appareil_selectionne = e.target.innerText;
 let appareil_selectionne_button = document.createElement("button");
 appareil_selectionne_button.textContent=appareil_selectionne;
 appareil_selectionne_button.className="btn btn-success btn-lg btn_top appareil"
   critere.appendChild(appareil_selectionne_button)
   let close_btn = document.createElement("span");
   close_btn.textContent=' X '
   appareil_selectionne_button.appendChild(close_btn);
   close_btn.addEventListener("click",c => {
critere.removeChild(appareil_selectionne_button)
afficher_selon_critere();
})
afficher_selon_critere();


})

 })

 // ajouter event onclick sur les ustensiles :
 let ustensil_item = document.querySelectorAll("#ustensil_item");
 ustensil_item.forEach(element => {
element.addEventListener("click",e => {
 let ustensile_selectionne = e.target.innerText;
 let ustensile_selectionne_button = document.createElement("button");
 ustensile_selectionne_button.textContent=ustensile_selectionne;
 ustensile_selectionne_button.className="btn btn-warning btn-lg btn_top ustensile"
   critere.appendChild(ustensile_selectionne_button)
   let close_btn = document.createElement("span");
   close_btn.textContent=' X '
   ustensile_selectionne_button.appendChild(close_btn);
   close_btn.addEventListener("click",c => {
critere.removeChild(ustensile_selectionne_button)
afficher_selon_critere();
})

afficher_selon_critere();


})

 })


//  Testeinnnng 
let btn_ingridient = document.getElementById("btn_ingredient");
let chercher = document.getElementById("chercher");
 btn_ingridient.addEventListener("click",e => { 
   
 })

 function afficher_selon_critere(){

  let critere_selectionne = document.querySelectorAll("#critere");
  let liste_de_critere = []
  var list_des_ingrediens_selectionne = []
  var list_des_appareils_selectionne = []
  var list_des_ustensiles_selectionne = []
  var tout_critere = [];


   
  for (let a = 1; a <=critere_selectionne[0].childNodes.length-1;a++) {
   liste_de_critere.push(critere_selectionne[0].childNodes[a].textContent.substr(0,critere_selectionne[0].childNodes[a].textContent.length-3))
  }
   
if (critere_selectionne[0].childNodes.length == 1 ) {

  let boxes = document.querySelectorAll(".box");
  boxes.forEach(element => {
  galeries.removeChild(element);
  }) 

afficher();

}


else  {
  // selectionner la liste des ingredients choisis : //
let ingred = document.querySelectorAll(".ingridient");
for (let ing of ingred) {
  list_des_ingrediens_selectionne.push(ing.textContent.substr(0,ing.textContent.length-3))
}


    // selectionner la liste des appareils choisis : //
let appare = document.querySelectorAll(".appareil");
for (let appr of appare) {
  list_des_appareils_selectionne.push(appr.textContent.substr(0,appr.textContent.length-3))

}
   
    // selectionner la liste des ustensiles choisis : //
let ustens = document.querySelectorAll(".ustensile");
for (let ust of ustens) {
  list_des_ustensiles_selectionne.push(ust.textContent.substr(0,ust.textContent.length-3))
}
 
let boxes = document.querySelectorAll(".box");

boxes.forEach(element => {

galeries.removeChild(element);


   
}) 



 //  affichage des appareils selectionnés

data.recipes.forEach(element => {
 
for (let k=0 ; k <=list_des_ingrediens_selectionne.length;k++ ) {
  for (let l =0 ; l<=element.ingredients.length-1;l++ ) {
if (element.ingredients[l].ingredient == list_des_ingrediens_selectionne[k]) {
 
 function creer_box() {
let nv_article = document.createElement("article");
nv_article.className="box";
let image_vide = document.createElement("div");
image_vide.className="image_vide";
nv_article.appendChild(image_vide);

let nom_recette = document.createElement("p");
nom_recette.textContent = element.name;
nom_recette.className="recette_name";
let zone_time = document.createElement("div");
zone_time.className="zone_time"
let time_recette = document.createElement("p");
time_recette.textContent = element.time+" Min";
time_recette.classList="time_recette";
let time_icon = document.createElement("i");
time_icon.classList="far fa-clock";
let description_recette = document.createElement("p");
description_recette.className ="description"
description_recette.textContent = element.description;
let ingredient_zone = document.createElement("div");
ingredient_zone.className= "ingredient_zone";

//

element.ingredients.forEach( ingr => { 

   var ingredient_recette = document.createElement("p");
  ingredient_recette.className= "ingredients"
  ingredient_recette.textContent =ingr.ingredient ;
   ingredient_zone.appendChild(ingredient_recette);
   ingredient_recette.style.fontWeight ="bold";
  ingredient_recette.style.fontSize ="15px";
 
   if (ingr.quantity != undefined) {
     ingredient_recette.textContent+= " : "+ ingr.quantity+" ";
     if (ingr.unit != undefined) {
         ingredient_recette.textContent+=" "+ingr.unit+" ";  
     }
 }
 
   nv_article.appendChild(ingredient_zone);
   })



nv_article.appendChild(nom_recette);
zone_time.appendChild(time_icon);
zone_time.appendChild(time_recette);
nv_article.appendChild(zone_time);

 nv_article.appendChild(description_recette);

 galeries.appendChild(nv_article);  

  
}
creer_box();

 } 
}
}
}) 

//  affichage des appareils selectionnés

data.recipes.forEach(element => {
     
      if (element.appliance == list_des_appareils_selectionne[0]) {
    function creer_box() {
let nv_article = document.createElement("article");
nv_article.className="box";
let image_vide = document.createElement("div");
image_vide.className="image_vide";
nv_article.appendChild(image_vide);

let nom_recette = document.createElement("p");
nom_recette.textContent = element.name;
nom_recette.className="recette_name";
let zone_time = document.createElement("div");
zone_time.className="zone_time"
let time_recette = document.createElement("p");
time_recette.textContent = element.time+" Min";
time_recette.classList="time_recette";
let time_icon = document.createElement("i");
time_icon.classList="far fa-clock";
let description_recette = document.createElement("p");
description_recette.className ="description"
description_recette.textContent = element.description;
let ingredient_zone = document.createElement("div");
ingredient_zone.className= "ingredient_zone";

//

element.ingredients.forEach( ingr => { 

   var ingredient_recette = document.createElement("p");
  ingredient_recette.className= "ingredients"
  ingredient_recette.textContent =ingr.ingredient ;
   ingredient_zone.appendChild(ingredient_recette);
   ingredient_recette.style.fontWeight ="bold";
  ingredient_recette.style.fontSize ="15px";
 
   if (ingr.quantity != undefined) {
     ingredient_recette.textContent+= " : "+ ingr.quantity+" ";
     if (ingr.unit != undefined) {
         ingredient_recette.textContent+=" "+ingr.unit+" ";  
     }
 }
 
   nv_article.appendChild(ingredient_zone);
   })



nv_article.appendChild(nom_recette);
zone_time.appendChild(time_icon);
zone_time.appendChild(time_recette);
nv_article.appendChild(zone_time);

 nv_article.appendChild(description_recette);

 galeries.appendChild(nv_article);  

  
}
creer_box();
     

  }
 
 
})
//  affichage selon ustensiles : 





data.recipes.forEach(element => {

 

for (let l=0 ; l<=element.ustensils.length-1;l++) {

for (let m=0 ; m<=list_des_ustensiles_selectionne.length;m++) {

 if (element.ustensils[l] == list_des_ustensiles_selectionne[m]) {
  function creer_box() {
    let nv_article = document.createElement("article");
    nv_article.className="box";
    let image_vide = document.createElement("div");
    image_vide.className="image_vide";
    nv_article.appendChild(image_vide);
    
    let nom_recette = document.createElement("p");
    nom_recette.textContent = element.name;
    nom_recette.className="recette_name";
    let zone_time = document.createElement("div");
    zone_time.className="zone_time"
    let time_recette = document.createElement("p");
    time_recette.textContent = element.time+" Min";
    time_recette.classList="time_recette";
    let time_icon = document.createElement("i");
    time_icon.classList="far fa-clock";
    let description_recette = document.createElement("p");
    description_recette.className ="description"
    description_recette.textContent = element.description;
    let ingredient_zone = document.createElement("div");
    ingredient_zone.className= "ingredient_zone";
    
    //
    
    element.ingredients.forEach( ingr => { 
    
       var ingredient_recette = document.createElement("p");
      ingredient_recette.className= "ingredients"
      ingredient_recette.textContent =ingr.ingredient ;
       ingredient_zone.appendChild(ingredient_recette);
       ingredient_recette.style.fontWeight ="bold";
      ingredient_recette.style.fontSize ="15px";
     
       if (ingr.quantity != undefined) {
         ingredient_recette.textContent+= " : "+ ingr.quantity+" ";
         if (ingr.unit != undefined) {
             ingredient_recette.textContent+=" "+ingr.unit+" ";  
         }
     }
     
       nv_article.appendChild(ingredient_zone);
       })
    
    
    
    nv_article.appendChild(nom_recette);
    zone_time.appendChild(time_icon);
    zone_time.appendChild(time_recette);
    nv_article.appendChild(zone_time);
    
     nv_article.appendChild(description_recette);
    
     galeries.appendChild(nv_article);  
    
      
    }
    creer_box();

}
}

}
 }) 


 


 
} 
// fin de else  

// rechrerche a partir de bar de recherche : 
input_recherche.addEventListener("keyup",c => {

  if(input_recherche.value.length >= 3) {
 console.log("okk < then 3");
 msg_not_found.textContent="Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";



let text_en_input = c.target.value.toLowerCase();
    let boxess = document.querySelectorAll(".box");
    let result = 1;
   Array.from(boxess).forEach(box =>{
    //  console.log(box.childNodes[1].textContent.toLocaleLowerCase());

 //  rechrerche sur le nom de recette
 

 if (box.childNodes[2].textContent.toLocaleLowerCase().indexOf(text_en_input) != -1){
  msg_not_found.textContent=""

 box.style.display= "grid"
  }
//  rechrerche en  description
  else if (box.childNodes[4].textContent.toLocaleLowerCase().indexOf(text_en_input) != -1){

  box.style.display= "grid";
  
 }
//  rechrerche en  ingredients
else if (box.childNodes[1].textContent.toLocaleLowerCase().indexOf(text_en_input) != -1){

  box.style.display= "grid";
  
 }

 else {
  box.style.display= "none"
  
 
 }


   })
    




}


else{
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(element => {
  galeries.removeChild(element);
  }) 
  msg_not_found.textContent=""

  afficher();
  
   }

}) 

//  onclick change a input 
let btn_ing = document.getElementById("btn_ingredient");
let inpt_ing = document.querySelector(".tag-search-input");
let inpt_search = document.createElement("input");
let id_ingredient = document.getElementById("id_ingredient");


window.addEventListener('click', function(e){   
  if (document.getElementById('btn_ingredient').contains(e.target)){
 
  } else{
    console.log("no");
      

 

  }
});




}


afficher_selon_critere();


}
 


getrecipes();







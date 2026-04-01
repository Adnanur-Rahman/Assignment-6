const categoriesLevel=()=>{
fetch("https://openapi.programming-hero.com/api/categories")
.then(res=>res.json())
.then(data=>{
  
    displayCatagoriesLevel(data.categories);

})

}
const displayCatagoriesLevel=(categories)=>{
       const catBtn=document.getElementById("catagories-div");
      
        // catBtn.innerHTML="";
    categories.forEach(category=>{
     const btn=document.createElement("div");
     btn.className ="text-center md:text-left";
     btn.innerHTML =`
             <button onclick="activeBtn('btn-cat-${category.id}'); specificCard('${category.id}')" id="btn-cat-${category.id}" class="btn btn-soft btn-success text-black btn-cat hover:text-white">${category.category_name}</button>
     `;
catBtn.appendChild(btn);


    })

}
const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plants-card").classList.add("hidden");
  }else{
        document.getElementById("plants-card").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const specificCard=(id)=>{
     manageSpinner(true);
    console.log(id);
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then(res=>res.json())
.then(data=>{

  dispalyTressCard(data.plants);
})

}
const activeBtn=(id)=>{
      removeActive();
      console.log(id);

      const clickBtn = document.getElementById(id);
      console.log(clickBtn);
      clickBtn.classList.add("active");


}
const treesCard=()=>{
     manageSpinner(true);
      fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=>res.json())
    .then(data=>{
        dispalyTressCard(data.plants);
    })
}
const dispalyTressCard=(plants)=>{
const plantsCard=document.getElementById("plants-card");
plantsCard.innerHTML="";
console.log(plantsCard);

plants.forEach(plant=>{
   const card=document.createElement("div");
   card.innerHTML=`
   
         <div class="card">
            <div ><img class="w-full h-48 object-cover rounded-lg" src="${plant.image}"alt=""></div>
            <div>
              <h1 onclick="treesDetails('${plant.id}')" class="cursor-pointer  font-bold text-xl hover:font-extrabold md:text-2xl">${plant.name}</h1>
              <p class="line-clamp-2">${plant.description}</p>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-green-600 font-bold text-xl md:text-[10]">${plant.category}</span>
              <span class="font-bold text-xl md:text-[10]"> ৳${plant.price}</span>
            </div>
            <button onclick="addToCard('${plant.name}', ${plant.price},${plant.id})" class="bg-green-600 cursor-pointer text-white rounded-full py-2">Add to Cart</button>

          </div>
   `;
   plantsCard.appendChild(card);
   
})
manageSpinner(false);
}
const treesDetails=(id)=>{
fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
.then(res=>res.json())
    .then(data=>{
        displayModal(data.plants);
    })
}
const displayModal=(plant)=>{
   const modalContainer=document.getElementById("modalContainer");
   console.log("modalContainer");
   modalContainer.innerHTML=` <div class="card">
    <h1 class="font-extrabold my-2  text-xl md:text-2xl">${plant.name}</h1>
            <div ><img class="rounded-xl" src="${plant.image}"alt=""></div>
            <div>
             <p class="my-2"> <span class="font-bold">Category: </span>${plant.category}</p>
                     <p class="my-2"><span class="font-bold">Price: </span>৳${plant.price}</p>
              <p class="my-2"><span class="font-bold">Description: </span>${plant.description}</p>
    
              </div>
          
    
           <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>`;
          document.getElementById("my_modal_5").showModal();

}
let amount=0;

const addToCard = (name, price,id) => {
  document.getElementById("vanish-total").classList.remove("hidden");
  const cart = document.getElementById("cart-section");
const convertedPrice=parseInt(`${price}`);
amount=amount+convertedPrice;
  cart.innerHTML += `
    <div id="cart-${id}" class="flex justify-between mt-2 ">
      <div>
        <h1 class="font-bold">${name}</h1>
        <p>৳${price} × 1</p>
      </div>
      <div>
        <i onclick="removeCart(${id},${price})" class="fa-solid fa-xmark text-red-400 cursor-pointer "></i>
      </div>
    
    </div>

  `;
  document.getElementById("taka").innerText=`৳${amount}`;

};
  const removeCart=(id,price)=>{

    const convertedPrice2=parseInt(`${price}`);
amount=amount - convertedPrice2;
     const cartBox = document.getElementById(`cart-${id}`);
    // cartBox.innerHTML="";
    cartBox.remove();
   document.getElementById("taka").innerText=`৳${amount}`;
   //for deleting total
     const cart = document.getElementById("cart-section");

  if (cart.children.length === 0) {
    document.getElementById("vanish-total").classList.add("hidden");
  }
  }
  const removeActive=()=>{
const categoriesButton=document.querySelectorAll(".btn-cat");//(css formate)
categoriesButton.forEach( btn => btn.classList.remove("active"));
 }; 


categoriesLevel();
treesCard();
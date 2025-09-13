const catagori = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCat(data));
};

const displayCat = (data) => {
  const fruitArray = data.categories.map((item) => item.category_name);
  const catagoriesDiv = document.getElementById("catagories-div");
  fruitArray.forEach((name) => {
    const button = document.createElement("button");
    button.textContent = name;

    button.className =
      "rounded-lg w-full text-black hover:bg-green-400 hover:text-white my-1 p-2";
    button.addEventListener("click", () => {
      catagoriesDiv.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("bg-green-400", "text-white");
        btn.classList.add("text-black");
      });
      button.classList.add("bg-green-400", "text-white");
      button.classList.remove("text-black");
      card(name);
    });
    catagoriesDiv.appendChild(button);
  });
};

catagori();

const card = (categoryName = null) => {
  const plantsCard = document.getElementById("plants-card");
  plantsCard.innerHTML = `<div class="flex justify-center items-center col-span-full">
                            <span class="loading loading-dots loading-xl"></span>
                          </div>`;
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCard(data, categoryName));
};

const displayCard = (data, categoryName) => {
  const plantsCard = document.getElementById("plants-card");
  plantsCard.innerHTML = "";
  let planArray = data.plants;
  if (categoryName) {
    planArray = planArray.filter((plant) => plant.category === categoryName);
  }
  let prices = 0;

  planArray.forEach((plant) => {
    const { id, image, name, description, category, price } = plant;

    const card = document.createElement("div");
    card.innerHTML = `
      <div  class="rounded-xl ${category} p-3 shadow-md bg-white cursor-pointer hover:shadow-lg flex flex-col  h-full"
        onclick="document.getElementById('modal-${id}').showModal()">
        <img class="h-72 w-full object-cover rounded-lg" src="${image}" alt="" />
        <h1 class="font-bold">${name}</h1>
        <p  class="line-clamp-3 mt-1">${description}</p>
        <div class="flex justify-between">
          <span class="text-[#15803D]">${category}</span>
          <span class="font-bold">৳${price}</span>
        </div>
        <div class="text-center">
          <button
            class="rounded-full addCart bg-[#15803D] mt-2 w-full h-full p-2 text-[#FFFFFF] cursor-pointer"
            data-name="${name}"
            data-price="${price}">
            Add to Cart
          </button>

        </div>
      </div>
        </div>
      </div>
        <dialog id="modal-${id}" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="text-lg font-bold">${name}</h3>
          <img class="w-full h-60 object-cover rounded-lg mt-2" src="${image}" alt="${name}" />
          <p class="py-4">${description}</p>
          <p class="font-semibold">Category: ${category}</p>
          <p class="font-bold mt-2">Price: ৳${price}</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;
    plantsCard.appendChild(card);
  });
  document.querySelectorAll(".addCart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  document.querySelectorAll(".addCart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="flex justify-between items-center w-full mb-4">
          <div>
            <h1 class="font-semibold text-[14px]">${name}</h1>
            <p class="text-[#1F293750]">৳${price} x 1</p>
          </div>
          <div class="corss"><i class="fa-solid fa-x" style="color: #dd0e0e;"></i></div>
        </div>
      `;
      const cartsec = document.getElementById("cart-section");
      cartsec.appendChild(div);
      prices += price;
      const existingTotal = document.getElementById("total-price");
      if (existingTotal) existingTotal.remove();
      const div2 = document.createElement("div");
      div2.innerHTML = `
      <div id="total-price" class="flex justify-between w-full"
        <p>Total:</p>
        <p>৳${prices}</p>
        </div>
      `;
      cartsec.appendChild(div2);
      div.querySelector(".corss").addEventListener("click", () => {
        prices -= price;
        div.remove();
        const existingTotal = document.getElementById("total-price");
        if (existingTotal) existingTotal.remove();

        const div2 = document.createElement("div");
        div2.innerHTML = `
         <div id="total-price" class="flex justify-between w-full"
        <p>Total:</p>
        <p>৳${prices}</p>
        </div>
      `;
        cartsec.appendChild(div2);
      });
    });
  });
};

card();

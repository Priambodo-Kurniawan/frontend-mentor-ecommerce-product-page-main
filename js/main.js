let totalQty = 0;
let productQty = 0;
let cart = [];
let navbar = [
  {
    label: "Collections",
    link: "#",
  },
  {
    label: "Men",
    link: "#",
  },
  {
    label: "Women",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
  {
    label: "Contact",
    link: "#",
  },
];
let navElement = document.getElementById("nav-container");
let navElementMobile = document.getElementById("nav-container-mobile");
navbar.forEach((el, idx) => {
  navElement.innerHTML += `<li><a href="${el.link}">${el.label}</a></li>`;
  navElementMobile.innerHTML += `<li><a href="${el.link}">${el.label}</a></li>`;
});

function showSlide(idx) {
  UIkit.slideshow("#slideshow-lightbox").show(idx);
}

function updateQty(num) {
  if (productQty >= 0) {
    if (productQty === 0 && num < 0) {
      return;
    }

    if (num === 0) {
      productQty = 0;
    } else {
      productQty += num;
    }
    let qtyElement = document.getElementById("product-qty");
    qtyElement.textContent = productQty;
  }
}

function updateCart(cart) {
  let emptyElement = document.getElementById("cart-empty-state");
  let notEmptyElement = document.getElementById("cart-not-empty-state");
  let totalCartElement = document.getElementById("total-cart-item");

  if (cart.length === 0) {
    emptyElement.style.display = "flex";
    notEmptyElement.style.display = "none";
    totalCartElement.style.display = "none";
    return;
  } else {
    emptyElement.style.display = "none";
    notEmptyElement.style.display = "block";
  }

  let cartContainerElement = document.getElementById("cart-container");
  cartContainerElement.innerHTML = "";
  totalQty = 0;
  cart.forEach((el) => {
    let liElement = document.createElement("li");
    let template = `<div class="uk-grid uk-grid-small">
      <div class="uk-width-auto">
        <img
          src="${el.image}"
          alt="product 1"
          width="50"
          class="cart-product-image"
        />
      </div>
      <div class="uk-width-expand">
        <div>
          <span class="cart-product-title">${el.productName}</span>
        </div>
        <span class="cart-price-qty">$${el.price}.00 x ${el.qty}</span>
        <span class="cart-price-total">$${el.price * el.qty}.00</span>
      </div>
      <div class="uk-width-auto">
        <img onclick="deleteItem(${
          el.id
        })" class="cart-delete" src="./images/icon-delete.svg" alt="delete" />
      </div>
    </div>`;
    liElement.innerHTML = template;
    cartContainerElement.appendChild(liElement);

    totalQty += el.qty;
  });

  swalSuccess("Success add to cart");

  totalCartElement.innerHTML = totalQty;
  if (totalQty > 0) {
    totalCartElement.style.display = "inline";
  } else {
    totalCartElement.style.display = "none";
  }
}
updateCart(cart);

function addToCart(id) {
  let qty = productQty;
  let idProduct = id;

  let updated = false;
  let newCart = cart.map((el) => {
    if (el.id === idProduct) {
      el.qty += qty;
      updated = true;
    }
    return el;
  });

  if (!updated) {
    let newProduct = {
      id: 1,
      productName: "Fall Limited Edition Sneakers",
      image: "./images/image-product-1-thumbnail.jpg",
      price: 125,
      qty: qty,
    };

    newCart.push(newProduct);
  }

  cart = newCart;
  updateCart(cart);
  productQty = 0;
  updateQty(productQty);
}

function deleteItem(id) {
  let newCart = [];

  cart.forEach((el) => {
    if (el.id !== id) {
      newCart.push(el);
    }
  });

  swalSuccess("Success update cart");

  cart = newCart;
  updateCart(cart);
}

function checkout() {
  cart = [];
  updateCart(cart);
  UIkit.dropdown("#dropdown-cart").hide();
  swalSuccess("Thank you for your order!");
}

function swalSuccess(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
}

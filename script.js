const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 80,
        cat: "Dress",
    },
    {
        id: 1,
        name: "Discover Diamonds",
        img: "https://rukminim1.flixcart.com/image/832/832/kbv4fww0/watch/0/f/p/am02a37-wanton-original-imaft458mfau29ba.jpeg?q=70",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://rukminim1.flixcart.com/image/580/696/k0lbdzk0/watch/j/n/g/csd-326-blk-blk-casado-original-imafkcvuvzdtagpj.jpeg?q=50",
        price: 120,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 6,
        name: "Skone ",
        img: "https://m.media-amazon.com/images/I/61z9BcEDjNL._AC_UL480_FMwebp_QL65_.jpg://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 25,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 53,
        cat: "Luxury",
    },
    {
        id: 7,
        name: "Matrix ",
        img: "https://m.media-amazon.com/images/I/71nQll4syeL._AC_UL480_FMwebp_QL65_.jpg",
        price: 74,
        cat: "Casual",
    },
    {
        id: 8,
        name: "LOUIS DEVIN ",
        img: "https://m.media-amazon.com/images/I/81kLhCWFSjL._AC_UL480_FMwebp_QL65_.jpg",
        price: 102,
        cat: "Casual",
    },
    {
        id: 9,
        name: "Daniel Wellington ",
        img: "https://m.media-amazon.com/images/I/61TS+IQEObL._AC_UL480_FMwebp_QL65_.jpg",
        price: 80,
        cat: "Casual",
    },
    {
        id: 10,
        name: "SKMEI ",
        img: "https://m.media-amazon.com/images/I/6149-JlZjoL._AC_UL480_FMwebp_QL65_.jpg",
        price: 150,
        cat: "Casual",
    },
    {
        id: 11,
        name: "Armani Exchange",
        img: "https://m.media-amazon.com/images/I/51lYxwTMq4L._AC_UL480_FMwebp_QL65_.jpg",
        price: 175,
        cat: "Luxury",
    },
];
let cartItems = [];
const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");
const cartBnt = document.querySelector('.cart-icon')
const itemContainer = document.querySelector('.product-container');
const cart = document.querySelector('.cart');
const cartCount = document.querySelector('#cart-count');
const menu = document.querySelector('#menu-icon');
const Menusection = document.querySelector('.leftMenu');
let isMenu = false;
menu.addEventListener('click',()=>{
    if(isMenu){
        menu.src = "menu.png"
        isMenu = false
        Menusection.style.display = 'none';
    
    }else{
        menu.src = "close.png";
        isMenu = true;
        Menusection.style.display = 'flex';
    }
})
const set = new Set();
set.add('All')
data.forEach((item) => set.add(item.cat));
let totalAmount = 0;
const displayProducts = (filterProduct) => {
    productsContainer.innerHTML = filterProduct.map((product) => {
        return `<div class="product">
        <img src=${product.img} , alt="">
        <span class="name">${product.name}</span>
        <span class="price">$${product.price}</span>
        <button class="addCart">Add to cart</button>
    </div>`
    }).join("");
    addToCart();
}

searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(
            data.filter((item) => item.name.toLowerCase().includes(value))
        )
    } else {
        displayProducts(data);
    }
})

const setCategories = () => {
    set.forEach((item) => {
        const cat = document.createElement('span');
        cat.classList.add('cat');
        cat.innerText = item;
        categoriesContainer.appendChild(cat);

    })
}
categoriesContainer.addEventListener('click', (e) => {
    console.log(e.target.innerText);
    const selected = e.target.innerText;

    if (selected === 'All') {
        displayProducts(data);
    } else {
        const filtered = data.filter((item)=>item.cat === selected);
        displayProducts(filtered);
    }
})

const setprices = () => {
    const priceList = data.map((item) => item.price);

    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;

    priceRange.value = maxPrice;
    priceValue.innerText = `$${maxPrice}`;

    priceRange.addEventListener('input', (e) => {
        const price = e.target.value;

        priceValue.innerText = `$${price}`;

        displayProducts(data.filter((item) => item.price <= price));

    })
}


displayProducts(data);
setCategories();
setprices();

const showCart = (items) => {
    //console.log(cartItems[1].Name)

    if (cartItems.length == 0) {
        itemContainer.innerText = "Empty";
        Count();
    } else {
        itemContainer.innerText = "";
        itemContainer.innerHTML = items.map((item) => {
            return `<div class="product-info">
             <img src=${item.Url} alt="">
             <div class="info">
                 <h6>${item.Name}</h6>
                 <span>${item.price}</span>
             </div>
             <div class="quantity">
                 <h5 class="decrement">-</h5>
                 <span>${item.item}</span>
                 <h5 class = "increment">+</h5>
             </div>
             <div class="remove">
             <img class = "remove-item"src="./icons8-remove-48.png" alt="">
         </div>
         </div>`
        }).join(' ')
        quantity();
        setTotal();
        remove();
        Count();
    }
}


let iscart = false;
cartBnt.addEventListener('click', () => {

    if (iscart) {
        cart.style.display = 'none';
        productsContainer.classList.remove('two');
        productsContainer.classList.add('four');
        iscart = false;
    } else {
        productsContainer.classList.remove('four');
        productsContainer.classList.add('two');
        cart.style.display = 'flex';
        iscart = true;
        //showCart(cartItems);
    }
})

function addToCart(){
    const addCart = document.querySelectorAll('.addCart')
    addCart.forEach((btn) => btn.addEventListener('click', (e) => {
        let img = e.target.parentElement.children[0].src;
        let name = e.target.parentElement.children[1].innerText;
        let price = e.target.parentElement.children[2].innerText;
        const product = {
            Url: img,
            Name: name,
            price: price,
            item: 1
        }
        let falg = true;
        cartItems.forEach((item) => {
            if (item.Name == product.Name) {
                falg = false;
            }
        })
        if (falg) {
            cartItems.push(product);
        }
        alert("Added to Cart");
        showCart(cartItems);
    }))
}

showCart(cartItems);

function quantity() {
    const increment = document.querySelectorAll('.increment');
    const decrement = document.querySelectorAll('.decrement');
    increment.forEach((item) => item.addEventListener('click', (e) => {
        const name = e.target.parentElement.parentElement.children[1].children[0].innerText;
        const quant = e.target.parentElement.children[1].innerText;

        const filtered = cartItems.filter((item) => {
            if (name === item.Name) {
                return item;
            }
        })
        filtered[0].item++;

        showCart(cartItems);
        setTotal();
    }))

    decrement.forEach((item) => item.addEventListener('click', (e) => {
        const name = e.target.parentElement.parentElement.children[1].children[0].innerText;
        const quant = e.target.parentElement.children[1].innerText;

        const filtered = cartItems.filter((item) => {
            if (name === item.Name) {
                return item;
            }
        })

        if (filtered[0].item > 1) {
            filtered[0].item--;
            showCart(cartItems);
            setTotal();
        }
    }))

}

function setTotal() {
    const total = document.querySelector('.total');
    totalAmount = 0;
    cartItems.forEach((item) => {
        let price = item.price.slice(1);
        totalAmount += parseInt(price) * item.item;
    })
    total.innerText = '$' + totalAmount;
    console.log(totalAmount);
}

const checkoutBtn = document.querySelector('.checkoutBtn');
checkoutBtn.addEventListener('click', () => {
    alert("Order Placed");
    cartItems = [];
    totalAmount = 0;
    showCart();
    setTotal();
})

function remove() {
    const removeItem = document.querySelectorAll('.remove-item');
    removeItem.forEach((item) => {
        item.addEventListener('click', (e) => {
            // console.log(e.target.parentElement.parentElement.children[1].children[0].innerText);
            const itemName = e.target.parentElement.parentElement.children[1].children[0].innerText;

            cartItems = cartItems.filter((item)=>{
                if(item.Name !== itemName){
                    return item;
                }
            })
            showCart(cartItems);
            setTotal();
        })
    })
}

function Count (){
    cartCount.innerText = cartItems.length;
}
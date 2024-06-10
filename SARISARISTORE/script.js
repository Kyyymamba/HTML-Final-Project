var items = {
  "Jeans": [
    { name: "Bench Jeans", image: "bench_jeans.jpg", price: 1129.99, stock: 5 },
    { name: "Jag Jeans", image: "jag_jeans.jpg", price: 1349.99 , stock: 5},
    { name: "Levis Jeans", image: "levis_jeans.jpg", price: 1339.99 , stock: 5},
    { name: "Penshoppe Jeans", image: "penshoppe_jeans.jpg", price: 1439.99, stock: 5}
  ],
  "T-shirt": [
    { name: "Bench T-shirt", image: "bench_T.jpg", price: 149.99, stock: 5 },
    { name: "Jag T-shirt", image: "jag_T.jpg", price: 179.99, stock: 5 },
    { name: "Levis T-shirt", image: "levis_T.jpg", price: 199.99, stock: 5},
    { name: "Penshoppe T-shirt", image: "penshoppe_T.jpg", price: 159.99, stock: 5 }
  ],
  "Perfume": [
    { name: "Bench Scents", image: "bench_perfume.jpg", price: 199.99, stock: 5 },
    { name: "Jaguar Perfume", image: "jaguar_perfume.jpg", price: 549.99, stock: 5 },
    { name: "Levi Perfume", image: "levi_perfume.jpg", price: 859.99, stock: 5 },
    { name: "Penshoppe Elements", image: "penshoppe_perfume.jpg", price: 449.99, stock: 5 }
  ],
  "Sando": [
    { name: "Bench Tank Top", image: "bench_sando.jpg", price: 139.99, stock: 5 },
    { name: "Levis Tank Top", image: "levis_sando.png", price: 319.99, stock: 5 },
    { name: "Penshoppe Tank Top", image: "penshoppe_sando.jpg", price: 149.99, stock: 5 },
    { name: "Jag Tank Top", image: "jag_sando.png", price: 299.99, stock: 5 }
  ],
  "Toys": [
    { name: "Teddy Bear", image: "teddybear.jpg", price: 849.99, stock: 5 },
    { name: "Barbie", image: "barbie_toy.jpg", price: 629.99, stock: 5},
    { name: "Hotwheels", image: "hotwheels.jpg", price: 234.99, stock: 5 },
    { name: "Lego", image: "lego.png", price: 529.99, stock: 5 }
  ]
};

var cartItems = [];

if (!localStorage.getItem('items')) {
  localStorage.setItem('items', JSON.stringify(items));
} else {
  items = JSON.parse(localStorage.getItem('items'));
}

function populateList(itemType) {
  var itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  var mainPageItems = JSON.parse(localStorage.getItem('items')) || items;

  mainPageItems[itemType].forEach(function(item) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    var span = document.createElement("span");
    span.textContent = item.name;
    span.classList.add("item-name");

    var priceSpan = document.createElement("span");
    priceSpan.textContent = "Price: " + item.price.toFixed(2);
    priceSpan.classList.add("price");

    var stockSpan = document.createElement("span");
    stockSpan.textContent = "Stock: " + item.stock;
    stockSpan.classList.add("stock");
    stockSpan.setAttribute("data-name", item.name);

    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.style.width = "40px";
    quantityInput.style.marginLeft = "10px";
    quantityInput.setAttribute("data-name", item.name);

    var addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.dataset.name = item.name;
    addToCartBtn.dataset.price = item.price;
    addToCartBtn.dataset.stock = item.stock;

    addToCartBtn.addEventListener("click", function() {
      addToCart(item.name, item.price);
    });

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(priceSpan);
    li.appendChild(stockSpan);
    li.appendChild(quantityInput);
    li.appendChild(addToCartBtn);

    itemList.appendChild(li);
  });
}

document.getElementById("jeans").addEventListener("click", function() {
  populateList("Jeans");
});

document.getElementById("tshirt").addEventListener("click", function() {
  populateList("T-shirt");
});

document.getElementById("perfume").addEventListener("click", function() {
  populateList("Perfume");
});

document.getElementById("sando").addEventListener("click", function() {
  populateList("Sando");
});

document.getElementById("toys").addEventListener("click", function() {
  populateList("Toys");
});

document.getElementById("viewCartBtn").addEventListener("click", function() {
  displayCart();
  var modal = document.getElementById("cartModal");
  modal.style.display = "block";
});

var closeBtn = document.getElementById("closeModalBtn");
closeBtn.addEventListener("click", function() {
  var modal = document.getElementById("cartModal");
  modal.style.display = "none";
});

window.addEventListener("click", function(event) {
  var modal = document.getElementById("cartModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function addToCart(itemName, itemPrice) {
		  var selectedItem = null;
		  var itemType = null;
		  for (var type in items) {
			selectedItem = items[type].find(item => item.name === itemName);
			if (selectedItem) {
			  itemType = type;
			  break;
			}
		  }

		  if (!selectedItem) {
			console.error("Item does not exist.");
			return;
		  }

		  var quantityInput = document.querySelector("input[data-name='" + itemName + "']");
		  var itemQuantity = parseInt(quantityInput.value);

		  var mainPageItems = JSON.parse(localStorage.getItem('items')) || items;

		  if (itemQuantity > mainPageItems[itemType].find(item => item.name === itemName).stock) {
			alert("Sorry, there is not enough stock available for this item.");
			return;
		  } else {
			alert("Added to cart");
		  }

		  var selectedItemStock = mainPageItems[itemType].find(item => item.name === itemName).stock;

		

		  mainPageItems[itemType].find(item => item.name === itemName).stock -= itemQuantity;

		 

		  var existingItem = cartItems.find(item => item.name === itemName);

		  if (existingItem) {
			existingItem.quantity += itemQuantity;
		  } else {
			cartItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
		  }

		  localStorage.setItem('items', JSON.stringify(mainPageItems)); 
		  displayCart();

	
		  var stockSpan = document.querySelector("span[data-name='" + itemName + "']");
		  if (stockSpan) {
			stockSpan.textContent = "Stock: " + mainPageItems[itemType].find(item => item.name === itemName).stock;
		  }
}








function updateStock(itemName, quantity) {
  var mainPageItems = JSON.parse(localStorage.getItem('items')) || items;

  for (var itemType in mainPageItems) {
    var item = mainPageItems[itemType].find(item => item.name === itemName);
    if (item) {
      item.stock += quantity;
      var stockSpan = document.querySelector("span[data-name='" + itemName + "']");
      if (stockSpan) {
        stockSpan.textContent = "Stock: " + item.stock;
      }
      break;
    }
  }

  localStorage.setItem('items', JSON.stringify(mainPageItems));
}

function displayCart() {
  var cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";

  var totalPrice = 0;

  cartItems.forEach(function(item, index) {
    var li = document.createElement("li");
    var itemTotalPrice = item.price * item.quantity;

    var itemNameSpan = document.createElement("span");
    itemNameSpan.textContent = item.name;

    var itemPriceSpan = document.createElement("span");
    itemPriceSpan.textContent = "Price: $" + item.price.toFixed(2);

    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.max = item.quantity; 
    quantityInput.value = item.quantity;
    quantityInput.addEventListener("change", function() {
      var previousQuantity = cartItems[index].quantity;
      cartItems[index].quantity = parseInt(this.value);
      updateStock(item.name, previousQuantity - this.value);
      displayCart(); 
    });

    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel Order";
    cancelBtn.classList.add("cancel-button");
    cancelBtn.addEventListener("click", function() {
      updateStock(item.name, item.quantity);
      cartItems.splice(index, 1);
      displayCart();
    });

    li.appendChild(itemNameSpan);
    li.appendChild(document.createElement("br")); 
    li.appendChild(itemPriceSpan);
    li.appendChild(document.createElement("br")); 
    li.appendChild(quantityInput);
    li.appendChild(cancelBtn);

    cartList.appendChild(li);
    totalPrice += itemTotalPrice;
  });

  var totalPriceElement = document.getElementById("totalPrice");

  if (totalPriceElement) {
    totalPriceElement.textContent = "Total: $" + totalPrice.toFixed(2);
  }
}
/////////////////////////////////////////

document.getElementById("checkoutBtn").addEventListener("click", function() {
  var receiptWindow = window.open('');
  receiptWindow.document.write(generateReceipt());

});

function generateReceipt() {
  var receiptHTML = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
			font-family: Arial, sans-serif;
			background-color: #f8f8f8;
		  }
		  .receipt-container {
			margin: 20px auto;
			max-width: 600px;
			background-color: #fff;
			padding: 20px;
			border-radius: 8px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		  }
		  .item {
			margin-bottom: 10px;
			padding: 5px;
			border-bottom: 1px solid #ddd;
		  }
		  .total {
			font-weight: bold;
			margin-top: 20px;
		  }
		  #paymentForm {
			margin-top: 20px;
		  }
		  label {
			margin-right: 10px;
		  }
		  input[type="number"],
		  button {
			padding: 8px 16px;
			font-size: 16px;
			border: none;
			border-radius: 4px;
			background-color: #007bff;
			color: #fff;
			cursor: pointer;
			transition: background-color 0.3s ease;
		  }
		  input[type="number"] {
			width: 100px;
		  }
		  input[type="number"]:focus,
		  button:focus {
			outline: none;
		  }
		  input[type="number"]::-webkit-inner-spin-button,
		  input[type="number"]::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		  }
		  input[type="number"]:hover,
		  button:hover {
			background-color: #0056b3;
		  }
		  input[type="radio"] {
			margin-right: 5px;
		  }
		  #changeAmount {
			font-weight: bold;
			color: green;
		  }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <h2>Receipt</h2>
          <ul>
  `;
  cartItems.forEach(function(item) {
    receiptHTML += `
            <li class="item">
              <span>${item.name}</span> - <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </li>
    `;
  });
  receiptHTML += `
          </ul>
          <div class="total">
            Total Amount: $${getTotalPrice().toFixed(2)}
          </div>
          <h2>PAYMENT</h2>
          <form id="paymentForm">
            <p>Total Amount: $${getTotalPrice().toFixed(2)}</p>
            <input type="radio" id="noneDiscount" name="discount" value="none" onchange="calculateDiscountedTotal()">
            <label for="noneDiscount">None</label><br>
            <input type="radio" id="seniorDiscount" name="discount" value="senior" onchange="calculateDiscountedTotal()">
            <label for="seniorDiscount">Senior (20% off)</label><br>
            <input type="radio" id="pwdDiscount" name="discount" value="pwd" onchange="calculateDiscountedTotal()">
            <label for="pwdDiscount">PWD (30% off)</label><br>
            <input type="radio" id="studentDiscount" name="discount" value="student" onchange="calculateDiscountedTotal()">
            <label for="studentDiscount">Student (10% off)</label><br><br>
            <p>Discounted Total Amount: $<span id="discountedTotalAmount">0.00</span></p>
            <label for="paymentAmount">Payment:</label>
            <input type="number" id="paymentAmount" min="0" step="0.01"><br><br>
            <button type="button" onclick="calculatePayment()">Pay</button>
            <p>Change: $<span id="changeAmount">0.00</span></p> <!-- New element for displaying change -->
          </form>
        </div>
        <script>
          function calculateDiscountedTotal() {
            var totalAmount = ${getTotalPrice().toFixed(2)};
            var discount = 0;
            var discountedTotalAmount = totalAmount;

            if (document.getElementById("seniorDiscount").checked) {
              discount = 0.2;
            } else if (document.getElementById("pwdDiscount").checked) {
              discount = 0.3;
            } else if (document.getElementById("studentDiscount").checked) {
              discount = 0.1;
            }

            discountedTotalAmount = totalAmount - (totalAmount * discount);
            document.getElementById("discountedTotalAmount").textContent = discountedTotalAmount.toFixed(2);
          }

          function calculatePayment() {
            var totalAmount = ${getTotalPrice().toFixed(2)};
            var paymentAmount = parseFloat(document.getElementById("paymentAmount").value);
            var discountedTotalAmount = parseFloat(document.getElementById("discountedTotalAmount").textContent);

            if (paymentAmount >= discountedTotalAmount) {
              var changeAmount = paymentAmount - discountedTotalAmount; 
              document.getElementById("changeAmount").textContent = changeAmount.toFixed(2); 
              alert("Payment successful! Change: $" + changeAmount.toFixed(2)); 
            } else {
              alert("Insufficient payment amount!");
            }
          }
        </script>
      </body>
    </html>
  `;

  return receiptHTML;
}










///////////////////////////////NEW TAB STOCK////////////////////////////////////
function newTabStock() {
  var stockWindow = window.open('');
  stockWindow.document.write(`
    <html>
      <head>
        <title>Add Stock</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4d1ff;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          select, input, button {
            margin: 10px;
            padding: 10px;
            font-size: 16px;
          }
          button {
            background-color: #ff4848;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            filter: brightness(0.9);
          }
        </style>
      </head>
      <body>
        <div id="debug"></div>
        <div class="container">
          <h2>Add Stock</h2>
          <select id="productDropdown"></select>
          <div id="currentStocks">Stock in Storage: </div>
          <div>
            <label for="stockInput">Number of stocks:</label>
            <input type="number" id="stockInput" min="1" value="1">
          </div>
          <button onclick="transferStock()" style="background-color: green;">Add Stock to Main Page</button>
		  <button onclick="window.close()">Close</button>
        </div>
        <script>
          var items = ${JSON.stringify(items)};
          var storageStocks = JSON.parse(localStorage.getItem('storageStocks')) || {};

          for (var itemType in items) {
            items[itemType].forEach(function(item) {
              if (!storageStocks[item.name]) {
                storageStocks[item.name] = 30; 
              }
            });
          }

          function populateDropdown() {
			  var dropdown = document.getElementById("productDropdown");
			  dropdown.innerHTML = "";

			  for (var itemType in items) {
				items[itemType].forEach(function(item) {
				  var option = document.createElement("option");
				  option.value = item.name;
				  option.textContent = item.name;
				  dropdown.appendChild(option);
				});
			  }
			  
		
			  updateStockDisplay(dropdown.value);

			
			  dropdown.addEventListener("change", function() {
				updateStockDisplay(this.value);
			  });
}


          function updateStockDisplay(selectedItemName) {
            var currentStocks = document.getElementById('currentStocks');
            var selectedStock = storageStocks[selectedItemName];
            
            if (selectedStock !== undefined && selectedStock !== null) {
              currentStocks.textContent = 'Stock in Storage: ' + selectedStock;
            } else {
              currentStocks.textContent = 'Stock in Storage: N/A';
            }
          }

          function transferStock() {
            var selectedItemName = document.getElementById('productDropdown').value;
            var stockInput = document.getElementById('stockInput');
            var additionalStock = parseInt(stockInput.value);

            if (isNaN(additionalStock) || additionalStock <= 0) {
              alert('Invalid input for additional stock.');
              return;
            }

            if (additionalStock > storageStocks[selectedItemName]) {
              alert('Not enough stock in storage.');
              return;
            }

            var mainPageItems = JSON.parse(localStorage.getItem('items')) || items;
            for (var itemType in mainPageItems) {
              var item = mainPageItems[itemType].find(item => item.name === selectedItemName);
              if (item) {
                item.stock += additionalStock;

                var cartItems = window.opener.cartItems;
                var existingCartItem = cartItems.find(cartItem => cartItem.name === selectedItemName);
                if (existingCartItem) {
                  existingCartItem.quantity += additionalStock;
                }

                localStorage.setItem('items', JSON.stringify(mainPageItems));
                window.opener.populateList(itemType);
                break;
              }
            }

            storageStocks[selectedItemName] -= additionalStock;
            localStorage.setItem('storageStocks', JSON.stringify(storageStocks));

            updateStockDisplay(selectedItemName);

            alert('Stock added successfully!');
          }
          populateDropdown(); 
          updateStockDisplay(document.getElementById('productDropdown').value); 
        </script>
      </body>
    </html>
  `);
}






function getTotalPrice() {
  var totalPrice = 0;
  cartItems.forEach(function(item) {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}

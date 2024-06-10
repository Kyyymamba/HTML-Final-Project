var stock = {
  "Adobo": 50,
  "Sinigang": 50,
  "Lechon Kawali": 50,
  "Pork Sisig": 50,
  "Kare-Kare": 50,
  "Ginisang Ampalaya": 50,
  "Pinakbet": 50,
  "Ginataang Langka": 50,
  "Halo-Halo": 50,
  "Buko Pandan": 50,
  "Leche Flan": 50,
  "Buko Juice": 50,
  "Mango Juice": 50,
  "Sago't Gulaman": 50,
  "Sinangag": 50,
  "Ensaladang Talong": 50,
  "Atchara": 50
};

function alertReceipt() {
  
    var menuItems = document.querySelectorAll('.menu-item');
    var receipt = 'Receipt:\n';
    var totalAmount = 0;
   

    menuItems.forEach(function(item) {
      var checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {

        var itemName = item.querySelector('img').alt;
        var quantity = parseInt(item.querySelector('input[type="number"]').value);
        var price = parseInt(checkbox.value);
        var availableStock = parseInt(stock[itemName]);
		if (stock[itemName] < quantity) {
			alert("not enough stock of " + itemName );
			return;
		} 
		else {
			
			var subtotal = quantity * price;
			totalAmount += subtotal;
			if(quantity > 0){
			  receipt += itemName + ' - ' + quantity + ' x     ' + price + ' =      ' + subtotal + '\n';
		}
		} 
     }
    });
	receipt += '\nTotal Amount: ' + totalAmount;

   
    window.alert(receipt);
	
  }


function resetOrder() {
    
    var checkboxes = document.querySelectorAll('.menu-item input[type="checkbox"]');
    var numberInputs = document.querySelectorAll('.menu-item input[type="number"]');

    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    numberInputs.forEach(function(input) {
      input.value = 0;
    });
  }
  

  
  
  
  
  
  
  
 function newWindowReceipt()	{
    var menuItems = document.querySelectorAll('.menu-item');
    var receipt = '\n\n';
    var totalAmount = 0;
   

    menuItems.forEach(function(item) {
      var checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {

        var itemName = item.querySelector('img').alt;
        var quantity = parseInt(item.querySelector('input[type="number"]').value);
        var price = parseInt(checkbox.value);
        var availableStock = parseInt(stock[itemName]);
		if (stock[itemName] < quantity) {
			alert("not enough stock of " + itemName );
			return;
		} 
		else {
			stock[itemName] = availableStock - quantity;
			var subtotal = quantity * price;
			totalAmount += subtotal;
			if(quantity > 0){
			 receipt += itemName + ' - ' + quantity + ' x     ' + price + ' =      ' + subtotal + '\n';
		}
		} 
     }
    });
	
    receipt += '\nTotal Amount: ' + totalAmount;
    var newWindow = window.open('', '_blank');
	
    newWindow.document.write('<html><head><title>Receipt</title></head><body><div style="position: relative; width: 500px; height: auto; border: 10px solid black; padding: 5px; margin: 0 auto; background-color: #1111; display: absolute; align-items: center;"><h1>Kyrhon Restaurant Official Receipt</h1> <pre style= "font-size: 20px; margin: 0; margin-left:10px; color: black; text-align: right;">' + receipt + '</pre> </div></body></html>');
	resetOrder();
	
  }


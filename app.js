$(document).ready(function () {

	loadImages();
	removeCartItems();
	
	function loadImages() {
		var jsonURL = "product-payload.json";
		
	  	$.getJSON(jsonURL, function (json) {
		    $.each(json.products, function (index, product) {
		    	var template = $(".template").clone();
				template.removeClass("template");
		    	template.attr("data-id", index+1);
		        template.find(".p-image").attr("src", "images/" + product.filename);
		        template.find(".p-title").html(product.name);
		        template.find(".p-price .p-number").html((+product.price/100).toFixed(2));
		      
		    	$('#product-list').append(template);
		    });
		})
		.done(function() {

			$(".p-btn-add").on("click", function(e) {
				e.preventDefault();
				
				// $(".cart-empty-msg").attr("id", "toggle-empty-msg");
				// // $('element').attr('id', 'value');
				toggleEmptyCartMsg();
				
				var templateCart = $(".template-cart").clone();
				templateCart.removeClass("template-cart");
				
				var id = $(this).parent(".p-info").attr("data-id");
				var image = $(this).siblings(".p-image").attr("src");
				var title = $(this).siblings(".p-title").text();
				var price = +($(this).siblings(".p-price").find(".p-number").text());
					
				templateCart.attr("data-id", id);
				templateCart.find(".cart-image").attr("src", image);
				templateCart.find(".cart-title").html(title);
				templateCart.find(".cart-price").html(price);
				
				//total price udate fn
				// setNewTotalPrice(price, "add");
				addTotalPrice(price);
				
				// var current = +($(".cart-item-qty").text());
				// var newCount = cartCount(current);
				// console.log("newCount", newCount);
				
				// var current = +($(".cart-item-qty").text());
				// $(".cart-item-qty").html((current + 1));
				
				addCartQuantity();
				
		      
		        console.log("cart template: ", templateCart);
		      
		        $('tbody').append(templateCart);
		        $('tbody').append("<tr class='spacer'></tr>");
		      //  $(".cart-footer .cart-footer-total").val("dfdfdffd");
				
			});
		});
	}
	
	
	//----- OPEN
	$("[data-popup-open]").on("click", function(e)  {
		var targeted_popup_class = jQuery(this).attr("data-popup-open");
		$("[data-popup='" + targeted_popup_class + "']").fadeIn(350);
		$(".container").addClass("blur");
		e.preventDefault();
	});
	//----- CLOSE
	$("[data-popup-close]").on("click", function(e)  {
		var targeted_popup_class = jQuery(this).attr("data-popup-close");
		$("[data-popup='" + targeted_popup_class + "']").fadeOut(350);
		$(".container").removeClass("blur");
		e.preventDefault();
	});
	
    function removeCartItems () {
    	$(".popup").on("click", "#remove-item", function() {
    		var itemPrice = +($(this).closest("tr").find(".cart-price").text());

    		minusTotalPrice(itemPrice);
    		minusCartQuantity();
   
    		console.log("get inside remove", cartCounter.get());
    		
    		$(this).closest("tr").next(".spacer").remove();
    		$(this).closest("tr").remove();
    		
    		// itemCount = $(".cart-product-wrap").length;
    
    		if (cartCounter.get() < 1) {
    			$("#cart-empty-msg").show();
    		}
    	});
    }	


    function addTotalPrice(price) {
    	var currentTotal = +($(".cart-footer-total").text());
    	var newTotal = +(currentTotal + price).toFixed(2);
    	return $(".cart-footer-total").html(newTotal);
    }
	
	function minusTotalPrice(price) {
	    var currentTotal = +($(".cart-footer-total").text());
	    var newTotal = +(currentTotal - +price).toFixed(2);
	    return $(".cart-footer-total").html(newTotal);
	}
	
	function toggleEmptyCartMsg () {
		
		$("#cart-empty-msg").hide();
	}


function addCartQuantity() {
	cartCounter.add();
	var newQuantity = cartCounter.get();
	return $(".cart-item-qty").html(newQuantity);
	
}

function minusCartQuantity() {
	cartCounter.minus();
	var newQuantity = cartCounter.get();
	return $(".cart-item-qty").html(newQuantity);	
}


  var Counter = function () {
	this.count = 0;
  }
  Counter.prototype.minus = function () {
   this.count--; // yes, you have to use `this` in javascript a lot!
  }
  Counter.prototype.add = function() {
    this.count++;
  }
  Counter.prototype.get = function() {
  return this.count;
  } 
  
  var cartCounter = new Counter();

});
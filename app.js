$(document).ready(function () {

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
				toggleEmptyCartMsg();
				
				var templateCart = $(".template-cart").clone();
				// templateCart.removeClass("template-cart");
				var id = $(this).parent(".p-info").attr("data-id");
				var image = $(this).siblings(".p-image").attr("src");
				var title = $(this).siblings(".p-title").text();
				var price = +($(this).siblings(".p-price").find(".p-number").text());
				
				templateCart.removeClass("template-cart");	
				templateCart.attr("data-id", id);
				templateCart.find(".cart-image").attr("src", image);
				templateCart.find(".cart-title").html(title);
				templateCart.find(".cart-price").html(price);
				
				addTotalPrice(price);
				addCartQuantity();
		      
		        $('tbody').append(templateCart);
		        $('tbody').append("<tr class='spacer'></tr>");
			});
		});
	}

	//cart opens
	function cartOpen() {
		$("[data-popup-open]").on("click", function(e)  {
			var targeted_popup_class = jQuery(this).attr("data-popup-open");
			$("[data-popup='" + targeted_popup_class + "']").fadeIn(350);
			$(".container").addClass("blur");
			e.preventDefault();
		});		
	}
	
	//cart closes
	function cartClose() {
		$("[data-popup-close]").on("click", function(e)  {
			var targeted_popup_class = jQuery(this).attr("data-popup-close");
			$("[data-popup='" + targeted_popup_class + "']").fadeOut(350);
			$(".container").removeClass("blur");
			e.preventDefault();
		});		
	}
	
    function removeCartItems () {
    	$(".popup").on("click", "#remove-item", function() {
    		var itemPrice = +($(this).closest("tr").find(".cart-price").text());
    		minusTotalPrice(itemPrice);
    		minusCartQuantity();
    		
    		$(this).closest("tr").next(".spacer").remove();
    		$(this).closest("tr").remove();
    
    		if (Counter.get() < 1) {
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
		Counter.add();
		var newQuantity = Counter.get();
		return $(".cart-item-qty").html(newQuantity);
	}

	function minusCartQuantity() {
		Counter.minus();
		var newQuantity = Counter.get();
		return $(".cart-item-qty").html(newQuantity);	
	}

	function toggleResponsiveness() {
		$(".icon").on("click", function() {
			var navbar = $("#myTopnav");
			navbar.toggleClass("responsive");
		});	
	}
	
	var Counter = (function () {
	  var count = 0;
	  return {
	    add: function() {
	      count++;
	    },
	    minus: function () {
	      count--;
	    },
	    get: function() {
	    	return count;
	    }
	  };
	})();	


	function init() {
		loadImages();
		removeCartItems();
		toggleResponsiveness();
		cartOpen();
		cartClose();
	}

init();

});
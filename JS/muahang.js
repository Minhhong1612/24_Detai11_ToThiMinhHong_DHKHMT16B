function renderData(){
	var cart = get_cart();
	if(cart.length == 0){
		window.location.href = "home.html";
	}

	var list_product = $(".product-info");
	var html = "";
	for(var i =0; i<cart.length; i++){
		product = get_product(cart[i]["id"]);
		html += '<div class="row" data-id='+cart[i]["id"]+'>'
				+'	<div class="col-xl-2 col-sm-3 col-3" style="text-align: center;">'
				+'		<img src="'+product["image"]+'">'
				+'		<a class="btn-xoa"><i class="far fa-trash-alt"></i> Xóa</a>'
				+'	</div>'
				+'	<div class="col-xl-10 col-sm-9 col-9">'
				+'		<h5>'+product["name"]+'</h5>'
				+'		<p class="price">'+currency_format(product["price"])+'<sup>đ</sup></p>'
				+'		<p>Màu: '+ selectColor(cart[i]["color"]) +'</p>'
				+'		<div class="section-quantity">'
				+'			<a class="btn-decrease">-</a>'
				+'			<span>'+cart[i]["count"]+'</span>'
				+'			<a class="btn-increase">+</a>'
				+'		</div>'
				+'	</div>'
				+'</div>';
	}
	$(".product-info").append(html);
	cal_total();

	var btn_xoa = $(".btn-xoa");
	var dec = $(".btn-decrease");
	var inc = $(".btn-increase");
	var sl_color = $(".sl-color");
	for(var i =0; i<dec.length; i++){
		btn_xoa[i].addEventListener("click", xoa);
		dec[i].addEventListener("click", function(){
			sec_quantity = $(this).parent();
			txtNumber = $(sec_quantity).find("span");
			if(txtNumber.text() <= 1){
				return;
			}
			$(txtNumber).text(Number($(txtNumber).text())-1);

			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().find("span").text();
			var color = $(this).parent().parent().find("p > select").val();
			console.log(id, count, color);
			update_cart(id, count, color);
			// console.log(JSON.parse(localStorage["cart"]));
			cal_total();
		});
		inc[i].addEventListener("click", function(){
			sec_quantity = $(this).parent();
			txtNumber = $(sec_quantity).find("span");
			$(txtNumber).text(Number($(txtNumber).text())+1);

			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().find("span").text();
			var color = $(this).parent().parent().find("p > select").val();
			console.log(id, count, color);
			update_cart(id, count, color);
			// console.log(JSON.parse(localStorage["cart"]));
			cal_total();
		});

		sl_color[i].addEventListener("change", function(){
			var id = $(this).parent().parent().parent().attr("data-id");
			var count = $(this).parent().parent().find("span").text();
			var color = $(this).val();;
			// console.log(id, count, color);
			update_cart(id, count, color);
		});
	}	
}

function selectColor(color){
	html =	'<select class="form-select form-select-sm sl-color" aria-label=".form-select-sm example">\n';
	arr_color = ["Xanh dương", "Xanh lá", "Đen", "Trắng", "Đỏ"];
	for(var i =0; i<arr_color.length; i++){
		if(arr_color[i] == color){
			html += '<option value="'+arr_color[i]+'" selected>'+arr_color[i]+'</option>\n';
		}else{
			html += '<option value="'+arr_color[i]+'">'+arr_color[i]+'</option>\n';
		}
	}
	html += '</select>';
	return html;
}

function xoa(){
	var pd = $(this).parent().parent();
	var id = $(pd).attr("data-id");
	remove_product(id);
	$(pd).remove();
	cal_total();
}



function removeAscent (str) {
	if (str === null || str === undefined) return str;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	return str;
}

function check_regex(elm, pattern, msg){
	var str = $(elm).val().trim();
	str = removeAscent(str);
	if(pattern.test(str) == false){
		$(elm).parent().find("div").text(msg);
		return false;
	}
	return true;
}

function check_fullname(){
	return check_regex($("[name=fullname]"), /^[a-zA-Z ]+$/, "Họ tên chỉ chứa các ký tự và khoảng trắng.");
}

function check_phone(){
	return check_regex($("[name=phone]"), /^0[1-9]\d{8}$/, "Số điện thoại không hợp lệ.");
}

function check_diachi(){
	return check_regex($("[name=address]"), /^[a-zA-Z0-9_/|\\\.@#!\?\$\^, ]+$/, "Địa chỉ không hợp lệ.");
}

$("[name=fullname]").blur(check_fullname);

$("[name=phone]").blur(check_phone);

$("[name=address]").blur(check_diachi);

$("[name=fullname], [name=phone], [name=address]").focus(function(){
	$(this).parent().find("div").text("");
});

$('.btn-dathang').click(function(){
	var gender = $("[name=gender]:checked").val();
	var fullname = $("[name=fullname]").val();
	var phone = $("[name=phone]").val();
	var address = $("[name=address]").val();
	var other = $("[name=other]").val();
	var method_delivery = $("[name=method-delivery]:checked").val();
	var method_pay = $("[name=method-pay]:checked").val();
	if(!check_fullname() || !check_phone() || !check_diachi()){
		return;
	}
	localStorage["gender"] = gender;
	localStorage["name"] = fullname;
	localStorage["phone"] = phone;
	localStorage["address"] = address;
	localStorage["method-delivery"] = method_delivery;
	localStorage["method-pay"] = method_pay;
	localStorage["other"] = other;
	window.location.href = "done.html";
});
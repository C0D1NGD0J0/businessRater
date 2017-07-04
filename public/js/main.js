$(document).ready(function() {
	$('#register').on('click', function(){
		let name = $.trim($('#companyName').val());
		let address = $.trim($('#address').val());
		let city = $.trim($('#city').val());
		let country = $.trim($('#country').val());
		let sector = $.trim($('#sector').val());
		let website = $.trim($('#website').val());

		let isValid = true;

		if(name == ''){
			isValid = false;
			$('#errMsg1').html('<div class="alert alert-danger alert-dismissable">Name field can\'t be empty.</div>');
		} else {
			$('#errMsg1').html('');
		}

		if(address == ''){
			isValid = false;
			$('#errMsg2').html('<div class="alert alert-danger alert-dismissable">Address field can\'t be empty.</div>');
		} else {
			$('#errMsg2').html('');
		}

		if(city == ''){
			isValid = false;
			$('#errMsg3').html('<div class="alert alert-danger alert-dismissable">City field can\'t be empty.</div>');
		} else {
			$('#errMsg3').html('');
		}

		if(country == ''){
			isValid = false;
			$('#errMsg4').html('<div class="alert alert-danger alert-dismissable">Country field can\'t be empty.</div>');
		} else {
			$('#errMsg4').html('');
		}

		if(sector == ''){
			isValid = false;
			$('#errMsg5').html('<div class="alert alert-danger alert-dismissable">Sector field can\'t be empty.</div>');
		} else {
			$('#errMsg5').html('');
		}

		if(website == ''){
			isValid = false;
			$('#errMsg6').html('<div class="alert alert-danger alert-dismissable">Website field can\'t be empty.</div>');
		} else {
			$('#errMsg6').html('');
		}

		if(isValid == true){
			let companyData = {name,address,city,country,sector,website};
			$.ajax({
				url: '/company/new',
				type: 'post',
				data: companyData,
				success: function(data){
					$('#companyName').val('');
					$('#address').val('');
					$('#city').val('');
					$('#country').val('');
					$('#sector').val('');
					$('#website').val('');
				}
			})
		} else{
			return false;
		}
	});
});
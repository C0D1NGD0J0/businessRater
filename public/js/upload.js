$(document).ready(function(){
	$('.uploadBtn').on('click', function(){
		$('#uploadInput').click();
		
		$('.progress-bar').text('0%');
		$('.progress-bar').width('0%');
	});

	$('#uploadInput').on('change', function(){
		let uploadItem = $('#uploadInput').val();
		
		if(uploadItem != ''){
			let form_data = new FormData();
			form_data.append('fileUploadInput', uploadItem[0].files);

			$.ajax({
				url: '/upload',
				type: 'POST',
				data: form_data,
				processData: false,
				contentType: false,
				success: function(data){
					$('#uploadInput').val('');
				},

				xhr: function(){
					let xhr = new XMLHttpRequest();
					xhr.upload.addEventListener('progress', function(e){
						if(e.lengthComputable){
							let uploadPercent = e.loaded / e.total;
							uploadPercent = (uploadPercent * 100);
							$('.progress-bar').text(`${uploadPercent}%`);
							$('.progress-bar').width(`${uploadPercent}%`);

							if(uploadPercent === 100){
								$('.progress-bar').text('Completed');
								$('#uploadStatus').text('File Uploaded');
							}
						}
					}, false);
					return xhr;
				}
			})
		}
	})
});
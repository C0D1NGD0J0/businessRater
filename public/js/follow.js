 $(function(){

 	$(document).on('click', '#followBtn', function(e){
 		e.preventDefault();
 		let userID = $('#user_id').val();

 		$.ajax({
 			type: 'POST',
 			url: `/follow/${userID}`,
 			success: (data) =>{
 				$('#followBtn').addClass('btn-danger').html('Follow-follow').attr('id', 'unfollowBtn');
 			},
 			error: function(data){
 				console.log(data);
 			}
 		});
 	});

	$(document).on('click', '#unfollowBtn', function(e){
 		e.preventDefault();
 		let userID = $('#user_id').val(); 	
 	 	
 	 	$.ajax({
 			type: 'POST',
 			url: `/unfollow/${userID}`,
 			success: (data) =>{
 				$('#unfollowBtn').removeClass('btn-danger').addClass('btn-default').html('Follow').attr('id', 'followBtn');
 			},
 			error: function(data){
 				console.log(data);
 			}
 		});
 	});

	// $('#unfollowBtn').on('mouseenter', function(e){
	// 	$(this).addClass('btn-danger').removeClass('btn-default').html('Unfollow');
	// });

	// $('#unfollowBtn').on('mouseleave', function(e){
	// 	$(this).removeClass('btn-danger').addClass('btn-default').html('Following');
	// });
 })
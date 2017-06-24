'use strict';

$(function(){

	let socket = io();

	$('#sendTweet').submit(function(){
		let content = $('#tweet').val();
		socket.emit('tweet', {content});
		$('#tweet').val('');
		return false;
	})
	
	socket.on('incomingTweets', function(data){
		let html = '';
		html += '<div class="media">';
		html += '<div class="media-left">';
		html += `<a href="/user/${data.user._id}"><img src="${data.user.photo}" class="media-object"></a>`;
		html += '</div><!--/m-left-->';
		html += '<div class="media-body">';
		html += `<h4 class="media-heading">${data.user.name}</h4>`;
		html += `<p>${data.data.content}</p>`;
		html += '</div>';
		html += '</div><!--/media-->';

		$('#tweets').prepend(html);
	})
});




				
					
						
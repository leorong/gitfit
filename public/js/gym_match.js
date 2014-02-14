$("[name='find_friend_toggle']").bootstrapSwitch();


$('#savebtn').click(function (e) {
	var user = {};
	user['name'] = $('#firstname').val() + " " + $('#lastname').val();
	user['user_name'] = $('#username').val();
	user['age'] = $('#age').val();
	user['gym'] = $('#gym').val();
	user['location'] = $('#city').val() + ", " + $('#state').val();
	user['about_me'] = $('#about_me').val();
	user['imageURL'] = $('#image_url').val();
	var activities = [];
	$('#checkbox :checked').each(function() {
		activities.push($(this).val());
	});
	user['activities'] = activities;
	data['users'].push(user);
});
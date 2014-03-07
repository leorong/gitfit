'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();
});

function initializePage() {
    $('.addBuddyBtn').click(function(e) {
        var btnID = $(this).closest('.addBuddyBtn').attr('id');
       
		console.log('buddy added');
        $('.buttonDiv #'+btnID).hide();
    });
    
    
    $('#signUpBtn').click(function (e) {
        e.preventDefault();
        console.log('clicked');
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var re_password = $('#re-password').val();
        
        if(password === re_password) {
            var json = {
                'username': username,
                'password': password,
                'email': email
            };
            console.log(json);
            $.post('/create', json, function () {
                window.location.href = '/profile_setup';
            });
        }
    });

    $('#saveProfileBtn').click(function (e) {
        e.preventDefault();
        ga('send', 'event', 'submit', 'click');
        var activities = [];

        if ($('#basketball').is(':checked')) {
            activities.push('basketball');
        }
        if ($('#weightlifting').is(':checked')) {
            activities.push('weightlifting');
        }
        if ($('#running').is(':checked')) {
            activities.push('running');
        }
        if ($('#swimming').is(':checked')) {
            activities.push('swimming');
        }
        if ($('#climbing').is(':checked')) {
            activities.push('climbing');
        }

        var imageURL = "";
        if($('#imageURL').val() != "") {
            imageURL = $('#imageURL').val();
        } else {
            imageURL = "/images/anonymous-user.jpg";
        }
        
        var json = {
            'firstName': $('#firstname').val(),
            'lastName': $('#lastname').val(),
            'age': $('#age').val(),
            'gym': $('#gym').val(),
            'city': $('#city').val(),
            'state': $('#state').val(),
            'about_me': $('#about_me').val(),
            'imageURL': imageURL,
            'looking': true,
            'activities': activities,
            'availability': {
                'monday': {
                    'morning': $('#monday-morning').is(':checked'),
                    'afternoon': $('#monday-afternoon').is(':checked'),
                    'evening': $('#monday-evening').is(':checked')
                },
                'tuesday': {
                    'morning': $('#tuesday-morning').is(':checked'),
                    'afternoon': $('#tuesday-afternoon').is(':checked'),
                    'evening': $('#tuesday-evening').is(':checked')
                },
                'wednesday': {
                    'morning': $('#wednesday-morning').is(':checked'),
                    'afternoon': $('#wednesday-afternoon').is(':checked'),
                    'evening': $('#wednesday-evening').is(':checked')
                },
                'thursday': {
                    'morning': $('#thursday-morning').is(':checked'),
                    'afternoon': $('#thursday-afternoon').is(':checked'),
                    'evening': $('#thursday-evening').is(':checked')
                },
                'friday': {
                    'morning': $('#friday-morning').is(':checked'),
                    'afternoon': $('#friday-afternoon').is(':checked'),
                    'evening': $('#friday-evening').is(':checked')
                },
                'saturday': {
                    'morning': $('#saturday-morning').is(':checked'),
                    'afternoon': $('#saturday-afternoon').is(':checked'),
                    'evening': $('#saturday-evening').is(':checked')
                },
                'sunday': {
                    'morning': $('#sunday-morning').is(':checked'),
                    'afternoon': $('#sunday-afternoon').is(':checked'),
                    'evening': $('#sunday-evening').is(':checked')
                }
            }
        };

        console.log("json");
        console.log(json);

        $.post('/addprofile', json, function () {
            window.location.href = '/';
        });
    });
    
    $('#addbasicinfo').click(function (e){
        e.preventDefault();
        var json = {
            'firstName': $('#firstname').val(),
            'lastName': $('#lastname').val(),
            'age': $('#age').val(),
            'city': $('#city').val(),
            'state': $('#state').val(),
            'about_me': $('#about_me').val(),
            'imageURL': $('#imageURL').val(),
            'looking': true
        }

        $.post('/addbasicinfo', json, function () {
            window.location.href = '/profile_setup_gymandactivities';
        });
    });

    $('#addgymandactivities').click(function (e){
        e.preventDefault();

        var activities = [];

        if ($('#basketball').is(':checked')) {
            activities.push('basketball');
        }
        if ($('#weightlifting').is(':checked')) {
            activities.push('weightlifting');
        }
        if ($('#running').is(':checked')) {
            activities.push('running');
        }
        if ($('#swimming').is(':checked')) {
            activities.push('swimming');
        }
        if ($('#climbing').is(':checked')) {
            activities.push('climbing');
        }

        var json = {
            'gym': $('#gym').val(),
            'activities': activities
        }

        $.post('/addgymandactivities', json, function () {
            window.location.href = '/profile_setup_availability';
        });
    });

    $('#addavailability').click(function (e){
        e.preventDefault();
        ga('send', 'event', 'submit', 'click');
        var json = {
            'availability': {
                'monday': {
                    'morning': $('#monday-morning').is(':checked'),
                    'afternoon': $('#monday-afternoon').is(':checked'),
                    'evening': $('#monday-evening').is(':checked')
                },
                'tuesday': {
                    'morning': $('#tuesday-morning').is(':checked'),
                    'afternoon': $('#tuesday-afternoon').is(':checked'),
                    'evening': $('#tuesday-evening').is(':checked')
                },
                'wednesday': {
                    'morning': $('#wednesday-morning').is(':checked'),
                    'afternoon': $('#wednesday-afternoon').is(':checked'),
                    'evening': $('#wednesday-evening').is(':checked')
                },
                'thursday': {
                    'morning': $('#thursday-morning').is(':checked'),
                    'afternoon': $('#thursday-afternoon').is(':checked'),
                    'evening': $('#thursday-evening').is(':checked')
                },
                'friday': {
                    'morning': $('#friday-morning').is(':checked'),
                    'afternoon': $('#friday-afternoon').is(':checked'),
                    'evening': $('#friday-evening').is(':checked')
                },
                'saturday': {
                    'morning': $('#saturday-morning').is(':checked'),
                    'afternoon': $('#saturday-afternoon').is(':checked'),
                    'evening': $('#saturday-evening').is(':checked')
                },
                'sunday': {
                    'morning': $('#sunday-morning').is(':checked'),
                    'afternoon': $('#sunday-afternoon').is(':checked'),
                    'evening': $('#sunday-evening').is(':checked')
                }
            }
        }

        $.post('/addavailability', json, function () {
            window.location.href = '/';
        });
    });

    $('#searchBuddiesBtn').click(function (e) {
        e.preventDefault();
        var activities = [];

        if ($('#basketball').is(':checked')) {
            activities.push('basketball');
        }
        if ($('#weightlifting').is(':checked')) {
            activities.push('weightlifting');
        }
        if ($('#running').is(':checked')) {
            activities.push('running');
        }
        if ($('#swimming').is(':checked')) {
            activities.push('swimming');
        }
        if ($('#climbing').is(':checked')) {
            activities.push('climbing');
        }

        var json = {
            'gym': $('#gym').val(),
            'activities': activities
        }

        $.get('/customsearch', json, newResults);

        function newResults(info) {
            res.render('findbuddy', info);
        }
    });

    $('#composeBtn').click(function (e) {
        var newNavBarHTML =
            '<ul class="nav nav-tabs nav-justified">'+
            '<li><a href="/message" type="btn btn-custom">All Messages</a></li>'+
            '<li class="active"><a href="#" id="composeBtn" type="btn btn-custom">Compose</a></li>'+
            '</ul>';
        
        var newBodyHTML = 
            '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                    '<h3 class="panel-title">Send Message</h3>'+
                '</div>'+
                '<div class="panel-body">'+
                    '<form id="new-message-form" role="form">'+
                        '<div class="form-group">'+
                            '<label for="to"><p>To:</p></label>'+
                            '<input type="text" class="form-control" id="to" placeholder="User\'s Name">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="messageSubject"><p>Subject:</p></label>'+
                            '<input type="text" class="form-control" id="messageSubject" placeholder="Subject">'+
                            '<label for="messageContent"><p>Message:</p></label>'+
                            '<textarea type="text" class="form-control" rows="3" id="messageContent"></textarea>'+
                        '</div>'+
                        '<button id="composeCancel" type="button" class="btn btn-default">Cancel</button>'+
                        '<button id="composeSend" type="button" class="btn btn-custom">Send</button> '+
                    '</form>'+
                '</div>'+
            '</div>';
            
		$('.messages').html(newBodyHTML);
		$('.message_navbar').html(newNavBarHTML);
	
	
		$("#composeSend").click(function(e) {
			var to = $('#new-message-form #to').val();
			var subject = $('#new-message-form #messageSubject').val();
			var message = $('#new-message-form #messageContent').val();

			var json = {
				'to': to,
				'subject': subject,
				'message': message
			};

			console.log(json);

			$.post('/message/new', json, function () {
				window.location.href = '/message';
			});
		});

		$("#composeCancel").click(function(e) {
			$.get('/message');
		});
		
	});


    $(".newMessageSubmitBtn").click(function (e) {
		console.log('send button clicked');
		
		var buddyID = $(this).closest(".newMessageSubmitBtn").attr('id');
        
		var to = $('.new-message-form #new-message-formid-'+buddyID+' #to').val();
        var subject = $('.new-message-form #new-message-formid-'+buddyID+' #messageSubject').val();
        var message = $('.new-message-form #new-message-formid-'+buddyID+' #messageContent').val();

        var json = {
            'to': to,
            'subject': subject,
            'message': message
        };

		console.log(json);

        $.post('/message/new', json, function () {
            window.location.href = '/message';
        });
    });

	$('#selectDefault').click(function(e) {
		var img = $("input:radio[name=defaultPicture]:checked").val();
		
		console.log(img);
		$('.profile_setup .form-group #imageURL').val('/images/'+img);
	});

    $('#start').timepicker('setTime', '8:00 AM');
    $('#end').timepicker('setTime', '10:45 AM');
    
    $("#addBtn").click(function (e) {
        e.preventDefault();
        var json = {
            "day": $('#day').val(),
            "activity": $('#activity').val(),
            "startTime": $('#start').val(),
            "endTime": $('#end').val()
        }

        console.log(json);

        $.post('/addschedule', json, function () {
            window.location.href = '/schedule';
        });
    });
}
    

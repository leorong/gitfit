'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();
});



function initializePage() {
    $('.addBuddyBtn').click(function(e) {
        var btnID = $(this).closest('.addBuddyBtn').attr('id');
       
		console.log('buddy added');
        $('.addBuddyBtn').hide();

    });

	$('.buddylistUnfriendBtn').click(function(e) {

		$.get('/buddylist', function() {
			window.location.href = '/buddylist';
		});
	});    

    /* Sign Up Page */
	$('.messageDeleteBtn').click(function(e) {
		$.get('/message', function() {
			window.location.href = '/message';
		});
	});


    $('#addavailability').click(function (e){
        e.preventDefault();
        //ga('send', 'event', 'submit', 'click');
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
    
    /* Profile Page */

    $('#changePicBtn').click(function (e) {
        e.preventDefault();
        var json = {
            'imageURL' : $('#changeImageURL').val()
        }
        $.post('/editImageURL', json, function () {
            window.location.href = '/';
        });
    });

    $('#editBasicInfoBtn').click(function (e) {
        e.preventDefault();
        var json = {
            'firstname' : $('#editFirstname').val(),
            'lastname' : $('#editLastname').val(),
            'age' : $('#editAge').val(),
            'city' : $('#editCity').val(),
            'state' : $('#editState').val(),
            'gym' : $('#editGym').val(),
            'about_me' : $('#editAbout_me').val()
        }
        $.post('/editBasicInfo', json, function () {
            window.location.href = '/';
        });
    });

    $('#editActivitiesBtn').click(function (e) {
        e.preventDefault();

        var activities = [];

        if ($('#editBasketball').is(':checked')) {
            activities.push('basketball');
        }
        if ($('#editWeightlifting').is(':checked')) {
            activities.push('weightlifting');
        }
        if ($('#editRunning').is(':checked')) {
            activities.push('running');
        }
        if ($('#editSwimming').is(':checked')) {
            activities.push('swimming');
        }
        if ($('#editClimbing').is(':checked')) {
            activities.push('climbing');
        }

        var json = {
            'activities': activities
        }

        $.post('/editActivities', json, function () {
            window.location.href = '/';
        });
    });

    $('#editAvailabilityBtn').click(function (e) {
        e.preventDefault();

        var json = {
            'availability': {
                'monday': {
                    'morning': $('#editmonday-morning').is(':checked'),
                    'afternoon': $('#editmonday-afternoon').is(':checked'),
                    'evening': $('#editmonday-evening').is(':checked')
                },
                'tuesday': {
                    'morning': $('#edittuesday-morning').is(':checked'),
                    'afternoon': $('#edittuesday-afternoon').is(':checked'),
                    'evening': $('#edittuesday-evening').is(':checked')
                },
                'wednesday': {
                    'morning': $('#editwednesday-morning').is(':checked'),
                    'afternoon': $('#editwednesday-afternoon').is(':checked'),
                    'evening': $('#editwednesday-evening').is(':checked')
                },
                'thursday': {
                    'morning': $('#editthursday-morning').is(':checked'),
                    'afternoon': $('#editthursday-afternoon').is(':checked'),
                    'evening': $('#editthursday-evening').is(':checked')
                },
                'friday': {
                    'morning': $('#editfriday-morning').is(':checked'),
                    'afternoon': $('#editfriday-afternoon').is(':checked'),
                    'evening': $('#editfriday-evening').is(':checked')
                },
                'saturday': {
                    'morning': $('#editsaturday-morning').is(':checked'),
                    'afternoon': $('#editsaturday-afternoon').is(':checked'),
                    'evening': $('#editsaturday-evening').is(':checked')
                },
                'sunday': {
                    'morning': $('#editsunday-morning').is(':checked'),
                    'afternoon': $('#editsunday-afternoon').is(':checked'),
                    'evening': $('#editsunday-evening').is(':checked')
                }
            }
        }

        $.post('/editAvailability', json, function () {
            window.location.href = '/';
        });
    });


    $('#lookingToggle').on('switchChange', function (e, data) {
        var $element = $(data.el),
            value = data.value;
        var json = {
            'looking' : value
        }

        $.post('/editLooking', json, function () {

        })
    });


/*
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
                        '<button id="composeSend" type="button" class="btn btn-custom">Send</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                        '<button id="composeCancel" type="button" class="btn btn-default">Cancel</button>'+
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
*/

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

        $.post('/message/new', json);
	});

	$('#selectDefault').click(function(e) {
		var img = $("input:radio[name=defaultPicture]:checked").val();

		console.log(img);
		$('.profile_setup .form-group #imageURL').val('/images/'+img);
	});


	$('#to').one(function(e) {
		options = { serviceURL:'service/autocomplete.ashx' };
		a = $('#to').autocomplete(options);
	});


    /* Schedule Page */
	
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

    $("[name='lookingToggle']").bootstrapSwitch();
}

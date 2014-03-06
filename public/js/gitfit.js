'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();
});

function initializePage() {
    $('.addButton').click(function (e) {
        var addButtonID = $(this).closest('.addButton').attr('id');

        var buddyID = addButtonID.substr('add'.length);
    
        var newHTML =
            '<div class="alert-primary block-message">'+
            '<p><font color="ff6600"><b>Would you like to:</b></font></p>'+
            '<div class="alert-actions">'+
            '<a class="btn btn-primary small" href="profile/'+buddyID+'">Visit Profile</a>  '+
            '<a class="btn btn-primary small" href="/message/reply/'+buddyID+'">Message</a></div>'+
            '</div>';

        var addButtonDiv = $('#add'+buddyID + ' .buttonDiv');
        

        addButtonDiv.html(newHTML);
        $.get('/findbuddy/add/'+buddyID);
    });

    $('.close').click(function (e) {
        $(this).closest('.alert').html("");
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

    $('#composeBtn').click(function (e) {
        var newNavBarHTML =
            '<ul class="nav nav-tabs nav-justified">'+
            '<li><a href="/message" type="btn btn-primary">All Messages</a></li>'+
            '<li class="active"><a href="#" id="composeBtn" type="btn btn-primary">Compose</a></li>'+
            '</ul>';
        
        var newBodyHTML = 
            '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                    '<h3 class="panel-title">Send Message</h3>'+
                '</div>'+
                '<div class="panel-body">'+
                    '<form id="new-message-form" role="form">'+
                        '<div class="form-group">'+
                            '<label for="to">To:</label>'+
                            '<input type="text" class="form-control" id="to" placeholder="User\'s Name">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="messageSubject">Subject:</label>'+
                            '<input type="text" class="form-control" id="messageSubject" placeholder="Subject">'+
                            '<label for="messageContent">Message:</label>'+
                            '<textarea type="text" class="form-control" rows="3" id="messageContent"></textarea>'+
                        '</div>'+
                        '<button id="newMessageSubmitBtn" type="button" class="btn btn-default">Send</button> '+
                        '<button id="newMessageCancelBtn" type="button" class="btn btn-default">Cancel</button>'+
                    '</form>'+
                '</div>'+
            '</div>';
            
            $('.messages').html(newBodyHTML);
            $('.message_navbar').html(newNavBarHTML);

        $('#newMessageSubmitBtn').click(function (e) {
            var to = $('#new-message-form #to').val();
            var subject = $('#new-message-form #messageSubject').val();
            var message = $('#new-message-form #messageContent').val();

            var json = {
                'to': to,
                'subject': subject,
                'message': message
            };

            $.post('/message/new', json, function () {
                window.location.href = '/message';
            });
        });

        $('#newMessageCancelBtn').click(function (e) {
            window.location.href = '/message/';
        });
    
    });

    $('#newMessageSubmitBtn').click(function (e) {
        var to = $('#new-message-form #to').val();
        var subject = $('#new-message-form #messageSubject').val();
        var message = $('#new-message-form #messageContent').val();

        var json = {
            'to': to,
            'subject': subject,
            'message': message
        };

        $.post('/message/new', json, function () {
            window.location.href = '/message';
        });
    });

    $('#newMessageCancelBtn').click(function (e) {
        window.location.href = '/message/';
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
    

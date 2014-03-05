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
            '<a class="btn btn-primary small" href="#">Message</a></div>'+
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
        var json = {
            'username': username,
            'password': password,
            'email': email
        };
        console.log(json);
        $.post('/create', json, function () {
            window.location.href = '/profile_setup';
        });
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

        var json = {
            'firstName': $('#firstname').val(),
            'lastName': $('#lastname').val(),
            'age': $('#age').val(),
            'gym': $('#gym').val(),
            'city': $('#city').val(),
            'state': $('#state').val(),
            'about_me': $('#about_me').val(),
            'imageURL': $('#imageURL').val(),
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

    $('#newMessageBtn').click(function (e) {
        window.location.href = '/message/new';
    });

    $('#newMessageSubmitBtn').click(function (e) {
        var to = $('#new-message-form #to').val();
        var message = $('#new-message-form #messageContent').val();

        var json = {
            'to': to,
            'message': message
        };

        $.post('/message/new', json, function () {
            window.location.href = '/message';
        });
    });

    $('#newMessageCancelBtn').click(function (e) {
        window.location.href = '/message/';
    });

    $('#newMessageCancelBtn').click(function(e) {
      window.location.href = '/message/';
    });
/*
    $('#start').timepicker('setTime', '8:00 AM');
    $('#end').timepicker('setTime', '10:45 AM');
*/
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
    

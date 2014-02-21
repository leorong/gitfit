'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();

    hideScheduleForms();
});

function initializePage() {
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
        console.log('clicked');

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
        console.log(json);
        $.post('/addprofile', json, function () {
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


    // $('#name').editable({
    //     type: 'text',
    //     pk: 1,
    //     name: 'name',
    //     url: '#',
    //     title: 'Edit Name'
    // });

    // $('#age').editable({
    //     type: 'text',
    //     pk: 1,
    //     name: 'age',
    //     url: '#',
    //     title: 'Edit Age'
    // });

    // $('#about_me').editable({
    //     type: 'textarea',
    //     pk: 1,
    //     name: 'comments',
    //     url: '#',
    //     title: 'Edit About Me'
    // });
}

function hideScheduleForms() {
    $("#show1").click(function (e) {
        e.preventDefault();
        if(!$("#form1").is(":visible")) {
            $("#show1").text("Hide Item");
            $("#form1").removeClass("hidden");
        } else {
            $("#show1").text("Add Item");
            $("#form1").addClass("hidden");
        }
    });
    $("#show2").click(function (e) {
        e.preventDefault();
        if(!$("#form2").is(":visible")) {
            $("#show2").text("Hide Item");
            $("#form2").removeClass("hidden");
        } else {
            $("#show2").text("Add Item");
            $("#form2").addClass("hidden");
        }
    });
    $("#show3").click(function (e) {
        e.preventDefault();
        if(!$("#form3").is(":visible")) {
            $("#show3").text("Hide Item");
            $("#form3").removeClass("hidden");
        } else {
            $("#show3").text("Add Item");
            $("#form3").addClass("hidden");
        }
    });
    $("#show4").click(function (e) {
        e.preventDefault();
        if(!$("#form4").is(":visible")) {
            $("#show4").text("Hide Item");
            $("#form4").removeClass("hidden");
        } else {
            $("#show4").text("Add Item");
            $("#form4").addClass("hidden");
        }
    });
    $("#show5").click(function (e) {
        e.preventDefault();
        if(!$("#form5").is(":visible")) {
            $("#show5").text("Hide Item");
            $("#form5").removeClass("hidden");
        } else {
            $("#show5").text("Add Item");
            $("#form5").addClass("hidden");
        }
    });
    $("#show6").click(function (e) {
        e.preventDefault();
        if(!$("#form6").is(":visible")) {
            $("#show6").text("Hide Item");
            $("#form6").removeClass("hidden");
        } else {
            $("#show6").text("Add Item");
            $("#form6").addClass("hidden");
        }
    });
    $("#show7").click(function (e) {
        e.preventDefault();
        if(!$("#form7").is(":visible")) {
            $("#show7").text("Hide Item");
            $("#form7").removeClass("hidden");
        } else {
            $("#show7").text("Add Item");
            $("#form7").addClass("hidden");
        }
    });
    $('#start1').timepicker();
    $('#end1').timepicker();
    $('#start2').timepicker();
    $('#end2').timepicker();
    $('#start3').timepicker();
    $('#end3').timepicker();
    $('#start4').timepicker();
    $('#end4').timepicker();
    $('#start5').timepicker();
    $('#end5').timepicker();
    $('#start6').timepicker();
    $('#end6').timepicker();
    $('#start7').timepicker();
    $('#end7').timepicker();








}
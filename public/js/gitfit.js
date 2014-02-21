'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
   initializePage();
})

function initializePage() {
   $('#signUpBtn').click(function(e) {
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
      $.post('/create', json, function() {
         window.location.href = '/profile_setup';
      });
   });

   $('#saveProfileBtn').click(function(e) {
      e.preventDefault();
      console.log('clicked');
      var json = {
         'firstName': $('#firstname').val(),
         'lastName': $('#lastname').val(),
         'age': $('#age').val(),
         'gym': $('#gym').val(),
         'city': $('#city').val(),
         'state': $('#state').val(),
         'about_me': $('#about_me').val(),
         'imageURL': $('#imageURL').val(),
         'looking': true
      };
      console.log(json);
      $.post('/addprofile', json, function() {
         window.location.href = '/';
      });
   });

  $('#newMessageBtn').click(function(e) {
    window.location.href = '/message/new';
    });

  $('#newMessageSubmitBtn').click(function(e) {
    var to = $('#new-message-form #to').val();
    var message = $('#new-message-form #messageContent').val();

    var json = {
        'to': to,
        'message': message
    };

    $.post('/message/new', json, function() {
        window.location.href = '/message';
    });
  });

  $('#newMessageCancelBtn').click(function(e) {
      window.location.href = '/message/';
  });

   //$("[name='find_friend_toggle']").bootstrapSwitch();

   $('#name').editable({
      type:  'text',
      pk:    1,
      name:  'name',
      url:   '#',  
      title: 'Edit Name'
   });

   $('#age').editable({
      type:  'text',
      pk:    1,
      name:  'age',
      url:   '#',  
      title: 'Edit Age'
   });

   $('#about_me').editable({
      type:  'textarea',
      pk:    1,
      name:  'comments',
      url:   '#',  
      title: 'Edit About Me'
   });
}



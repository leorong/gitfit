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
      $.post('/addprofile', json, function() {
         window.location.href = '/';
      });
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



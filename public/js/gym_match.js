
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
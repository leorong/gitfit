'use strict'

$(document).ready(function() {
    initializePage();
})

function initializePage() {
    var mongoose = require('mongoose');
    var Friend = mongoose.model('Friend');
    
    $('.random_matches').each(function() {

        var buddy = $('.random_matches').closest('.friendBtn').attr('id');
        
        
            var new_html =
                '<a href="/addfriend/"' + buddy + ' type="button" class="btn btn-primary" id="addfriendBtn-' + buddy +  '>Add Friend</a>';

    
}

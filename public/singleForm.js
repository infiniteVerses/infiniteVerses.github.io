var currentPage = 1;
var maxPage = 3;
$(window).on('load', function() {
    console.log("singleForm.js loaded")
    
$(window).on('keypress',function(e) {
    var keyCode = e.key;
    console.log({e}, {keyCode});
    if(keyCode == '13' || keyCode == 'Enter'){
        $('#btn-next').trigger('click');
        // e.preventDefault();
        // return false;
        
    } else if (keyCode == '39') {
        $('#btn-next').trigger('click');
        // event.preventDefault();
        // return false;
    }
    
});
// $('.entry').on('keypress', function(e) {
//     var keyCode = e.key;
//     console.log({e}, {keyCode});
//     if(keyCode == '13' || keyCode == 'Enter'){
//         $('#btn-next').trigger('click');
//         // e.preventDefault();
//         // return false;
        
//     } else if (keyCode == '39') {
//         // $('#btn-next').trigger('click');
//         // event.preventDefault();
//         // return false;
//     }
    
// })

$('#btn-next').on('click', function () {
    $('#btn-prev').prop('disabled', false);

    console.log("next button clicked", {currentPage})
    if (currentPage <= maxPage) {
        // hide page before updating
        var beforePage = "#p"+ currentPage+"-container";
        $(beforePage).addClass('inactivePrompt');
        $(beforePage).removeClass('currentPrompt');
        currentPage++;
    }
    var afterPage = "#p"+ currentPage+"-container";
    if (currentPage > maxPage) {
        afterPage = "#submit-container";
        $('#singleLine-googleForm').removeClass('inactivePrompt');
        $('#holo-form').addClass('inactivePrompt');
        $('#btn-next').prop('disabled', true);
        // $('#prompt-footer').addClass('inactivePrompt');
        // $('#final-header').removeClass('inactivePrompt');
        $('.progressText').text(' - ');
        
        $('#singleLine-googleForm').attr('action', action='https://docs.google.com/forms/d/e/1FAIpQLSc6d4InbmmFhiC52bCMe9atAisSO9wYx5nG1tDumeSvVuDMKw/formResponse');
    } else {
        $('.progressText').text(currentPage + ' / 3');

    }
    $(afterPage).addClass('currentPrompt');
    $(afterPage).removeClass('inactivePrompt');

    console.log({beforePage, afterPage, currentPage, maxPage})
 });

 $('#btn-prev').on('click', function () {
    // hide page before updating
    var beforePage = "#p"+ currentPage+"-container";
    if (currentPage > maxPage) {
        beforePage = "#submit-container";
        $('#singleLine-googleForm').addClass('inactivePrompt');
    }
    $(beforePage).addClass('inactivePrompt');
    $(beforePage).removeClass('currentPrompt');
    currentPage--;
    var afterPage = "#p"+ currentPage+"-container";
    if (currentPage > maxPage) {
        afterPage = "#submit-container";

        $('#btn-prev').prop('disabled', false);
        $('#btn-next').prop('disabled', true);
    } else if (currentPage <= 1) {
        $('#btn-prev').prop('disabled', true);
        $('#btn-next').prop('disabled', false);
    } else {
        $('#btn-prev').prop('disabled', false);
        $('#btn-next').prop('disabled', false);
    }
    $(afterPage).addClass('currentPrompt');
    $(afterPage).removeClass('inactivePrompt');
    $('.progressText').text(currentPage + ' / 3');
    $('#submit-container').addClass('inactivePrompt');
    $('#holo-form').removeClass('inactivePrompt');

    // $('#prompt-footer').removeClass('inactivePrompt');
    // $('#final-header').addClass('inactivePrompt');
    $('#btn-next').prop('disabled', false);
    console.log({beforePage, afterPage, currentPage, maxPage})
 });

 $('#submit-form').on('click', function () {
    $('#finalSubmit').trigger('click');
 })

 $('#p2-yes').on('click', function() {
    $('#p2-yes-f').prop('checked', true);
    $('#p2-no-f').prop('checked', false);
 });
$('#p2-no').on('click', function() {
    $('#p2-no-f').prop('checked', true);
    $('#p2-yes-f').prop('checked', false);
});
$('#q-entry1').on('keyup', function(e) {
    var newVal = $('#q-entry1').val();
    var entryField = '#entry1';
    console.log("q-entry1 keypress", {newVal}, {entryField})
    $(entryField).val(newVal);
})
$('#q-entry3').on('keyup', function(e) {
    var newVal = $('#q-entry3').val();
    var entryField = '#entry3';
    console.log("q-entry3 keypress", {newVal}, {entryField})
    $(entryField).val(newVal);
})


//  $('#btn-back').on('click', function () {
//     $('#btn-prev').trigger('click');
//     $('#prompt-footer').removeClass('inactivePrompt');

//  });

//  $('#btn-reset').on('click', function() {
//     for (i=currentPage; i > 1; i--) {
//         $('#btn-prev').trigger('click');
//     }
//     $('#prompt-footer').removeClass('inactivePrompt');

//  })

});
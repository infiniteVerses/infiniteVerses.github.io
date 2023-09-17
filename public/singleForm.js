var currentPage = 1;
var maxPage = 3;
var currentPromptField = ["#q-entry1", "#q-entry2", "#q-entry3"];
var promptMultiOptions = new Map();
promptMultiOptions.set("#q-entry2", ["#p2-yes", "#p2-no", "#p2-yes-f", "#p2-no-f"]);
var promptOptionsCapitalsMatter = new Set();
// promptOptionsCapitalsMatter.set("#q-entry2");
var textAreaSet = new Set();
// primitive types: string, int, boolean
// basic objects: array, obj
// fancy object: set, map
textAreaSet.add("#q-entry3");
var entryInputString = "";

$(window).on('load', function() {
    console.log("singleForm.js loaded")
    
$(window).on('keypress',function(e) {
    var keyCode = e.key;
    console.log({e}, {keyCode});
    if(keyCode == '13' || keyCode == 'Enter' && e.shiftKey == false){
        $('#btn-next').trigger('click');
        entryInputString = "";
        // e.preventDefault();
        // return false;
        
    } else if (keyCode == '39' && e.shiftKey == false) {
        $('#btn-next').trigger('click');
        entryInputString = "";
        // event.preventDefault();
        // return false;
    }

    var regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(e.key) || keyCode == "Enter" || keyCode == "13" || keyCode == "39") {
    //   e.preventDefault();
        console.log("invalid key", e.key)
    } else {
        if (currentPromptField == 0) {

        } else {
            entryInputString += e.key;
            
            if (promptMultiOptions.has(currentPromptField[currentPage-1])) {
                var options = promptMultiOptions.get(currentPromptField[currentPage-1]);
                console.log({options}, currentPromptField[currentPage-1])
                for (i=0; i < options.length; i++) {
                    console.log(options[i], i);
                    var optionValue = $(options[i]).val();
                    console.log({optionValue, keyCode, options}, optionValue[0])
                    
                    if (promptOptionsCapitalsMatter.has(currentPromptField[currentPage-1])) {
                        if (keyCode == optionValue[0]) {
                            $(options[i]).trigger('click');
                        }
                    } else if (keyCode.toLowerCase() == optionValue[0].toLowerCase()) {
                        $(options[i]).trigger('click');
                    }
                    checkWholeString(keyCode, options[i], optionValue, currentPromptField[currentPage-1]);
                }
            } else {
                $(currentPromptField[currentPage-1]).focus();

            }
        }
    }
    
});

function checkWholeString(incomingValue, targetField, targetValue, entryParentId) {
    console.log({entryInputString})
    var tempTargetValueStr = '';

    Array.from(targetValue).forEach(function (element) {
        if (tempTargetValueStr.length < entryInputString.length) {
            tempTargetValueStr += element;
        }
    });
    console.log({tempTargetValueStr, entryInputString})

    if (promptOptionsCapitalsMatter.has(entryParentId)) {
        if (tempTargetValueStr == entryInputString) {
            $(targetField).trigger('click');
            
        }
    } else if (tempTargetValueStr.toLowerCase() == entryInputString.toLowerCase()) {
        $(targetField).trigger('click');
        
    }

}
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
    entryInputString = "";

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

    if (textAreaSet.has(currentPromptField[currentPage-1])) {
        $('#prompt-footer').addClass('footer-textArea');
    } else {
        $('#prompt-footer').removeClass('footer-textArea');

    }

    console.log({beforePage, afterPage, currentPage, maxPage})
 });

 $('#btn-prev').on('click', function () {
    entryInputString = "";
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
    $(afterPage).removeClass('inactivePrompt');
    $(afterPage).addClass('currentPrompt');
    $('.progressText').text(currentPage + ' / 3');
    $('#submit-container').addClass('inactivePrompt');
    $('#holo-form').removeClass('inactivePrompt');

    // $('#prompt-footer').removeClass('inactivePrompt');
    // $('#final-header').addClass('inactivePrompt');
    $('#btn-next').prop('disabled', false);

    if (textAreaSet.has(currentPromptField[currentPage-1])) {
        $('#prompt-footer').addClass('footer-textArea');
    } else {
        $('#prompt-footer').removeClass('footer-textArea');

    }
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
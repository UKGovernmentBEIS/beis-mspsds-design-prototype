
/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})


if ($('.hmcts-menu--add-new').length){
  new HMCTSFrontend.Menu({
    container: $('.hmcts-menu--add-new'),
    mq: '(min-width: 200em)',
    buttonText: 'Add new',
    buttonClasses: 'hmcts-button--secondary hmcts-menu__toggle-button--secondary',
    menuClasses: 'hmcts-menu__wrapper--right'
  });
}


if ($('.hmcts-menu--actions').length){
  new HMCTSFrontend.Menu({
    container: $('.hmcts-menu--actions'),
    mq: '(min-width: 200em)',
    buttonText: 'Actions',
    buttonClasses: 'hmcts-button--secondary hmcts-menu__toggle-button--secondary',
    menuClasses: 'hmcts-menu__wrapper--right'
  });
}

if ($('.hmcts-menu--add-case-history').length){
  new HMCTSFrontend.Menu({
    container: $('.hmcts-menu--add-case-history'),
    mq: '(min-width: 300em)',
    buttonText: 'Add new',
    buttonClasses: 'hmcts-button--secondary hmcts-menu__toggle-button--secondary'
  });
}


$('.opss-filter--hide').click(function(e){
  e.preventDefault()

  button = $(this)

  if (button.text()== '+ Show case filters'){
    $('.mspsds-case-filter-controls').show()
    button.text("- Hide case filters")
    $('.mspsds-case-list-tab').removeClass('govuk-grid-column-full')
    $('.mspsds-case-list-tab').addClass('govuk-grid-column-three-quarters')

  }
  else {
    $('.mspsds-case-filter-controls').hide()
    button.text("+ Show case filters")
    $('.mspsds-case-list-tab').removeClass('govuk-grid-column-three-quarters')
    $('.mspsds-case-list-tab').addClass('govuk-grid-column-full')
  }

})

// toggle something on the page
$('.app-toggle-link').click(function(e){

  // don't follow href
  e.preventDefault()

  // get the button / link
  var button = $(this)

  // Get the target
  var targetIdentifer = button.data('target');

  // Should the original button be hidden?
  var hideLink = button.data('hide-link')
  if (hideLink == "true" || hideLink) button.addClass('hidden')

  var targetItems = $('.' + targetIdentifer + '.target-item')
  targetItems.toggleClass('hidden', 0)

})

  // Deselect main checkboxes when none ticked
  // Deselect none when main checkboxes ticked
  var $selectButtons = $('*[data-js-select="select"]')
  var $deSelectButtons = $('*[data-js-select="deselect"]')

  $selectButtons.on('click', function () {
    $deSelectButtons.each((index, item) => {
      if($(item).is(":checked")){
        $(item).next().click()
      }
    })
    // $(this).click()
  })
  $deSelectButtons.on('click', function () {

      $selectButtons.each((index, item) => {
        if($(item).is(":checked")){
          $(item).next().click()
        }
      })

  })

// Ignore clicks on # anchors
  $('a[href=#]').on('click', function(e){
    e.preventDefault()
  })

  $('.autocomplete__dropdown-arrow-down').on('click', function(event){
    var input = $(event.target).parents('.autocomplete__dropdown-arrow-down').prev()
    if (! input.hasClass('autocomplete__input--focused')){
      console.log('does not have class')
      input.addClass('autocomplete__input--focused')
      input.click()
      input.focus()
    }
   
  })


// Non working drag and drop - added to prevent page being lost if things are dragged

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {
}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "moj-multi-file-upload__dropzone") {
    $(event.target).addClass("moj-multi-file-upload--dragover")
    // event.target.style.background = "grey";
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "moj-multi-file-upload__dropzone") {
    $(event.target).removeClass("moj-multi-file-upload--dragover")
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className == "moj-multi-file-upload__dropzone") {
    // event.target.style.background = "";
    $(event.target).removeClass("moj-multi-file-upload--dragover")
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
  }
}, false);
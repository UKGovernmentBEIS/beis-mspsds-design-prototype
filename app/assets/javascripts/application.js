
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

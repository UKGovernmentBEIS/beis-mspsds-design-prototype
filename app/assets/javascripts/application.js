/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})


new HMCTSFrontend.Menu({
    container: $('.hmcts-menu--add-new'),
    mq: '(min-width: 200em)',
    buttonText: 'Add new',
    buttonClasses: 'hmcts-button--secondary hmcts-menu__toggle-button--secondary',
    menuClasses: 'hmcts-menu__wrapper--right'
  });



  new HMCTSFrontend.Menu({
    container: $('.hmcts-menu--actions'),
    mq: '(min-width: 200em)',
    buttonText: 'Actions',
    buttonClasses: 'hmcts-button--secondary hmcts-menu__toggle-button--secondary',
    menuClasses: 'hmcts-menu__wrapper--right'
  });

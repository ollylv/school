$(document).ready(function(){

    //---- GLOBAL VAR
    var $formElements = $('.query-form').find('input, select');
    var $email = $('.email');

    //---- AJAX REQUEST FUNCTIONS
    ajaxCountries();

    //---- E-MAIL PLUGIN - START
    $( function() {
        var availableTags = [
            "alextest@gmail.com",
            "peter.test@itncorp.com",
            "daniel.test@itncorp.com",
            "bruce.test@itncorp.com",
            "bondar.test@dyninno.com",
            "svetlana.example@dyninno.com",
            "abbas.example@itncorp.com",
            "marina.example@itncorp.com",
            "jeffrey.example@itncorp.com"
        ];

        $email.autocomplete({
            minLength: 2,
            source: availableTags
        });

    } );
    //---- E-MAIL PLUGIN - END



    //------- ONCLICK EVENT LISTENERS - START

    //---- SCROLL TO FORM
    $('.apply-button').on('click', function (){
        var $scrollTo = $('.bottom-content');
        var position = $scrollTo.offset().top;

        //html for firefox and ie
        $('body, html').animate({scrollTop: position});
    });

    //---- POPUP OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-open');

        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    //---- POPUP CLOSE
    $('[data-popup-close]').on('click', function(e)  {

        if (e.target !== this){
            return;
        }
        else {
            var targeted_popup_class = $(this).attr('data-popup-close');
            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

            e.preventDefault();
        }
    });

    //---- FORM VALIDATION + SUBMIT
    $('#send-query-button').on('click', function (e) {
        var error = formValidation();

        if(error){
            e.preventDefault();
        }

        else{
            console.log(createformObj());
            $('[data-popup=popup-2]').fadeIn(350);
            clearForm();
        }
    });

    //---- FORM ERROR CLEAR
    $formElements.on('focus', function () {
        var $this = $(this);
        if($this.hasClass('is_error')){
            $this.removeClass('is_error');
        }
    });

    // the shame :D
    $('.location').on('focus', function () {
        var $this = $(this);
        $this.addClass('colorIt');
    });
    //-------- ONCLICK EVENT LISTENERS - END




    //-------- FUNCTIONS - START

    //---- AJAX REQUEST
    function ajaxCountries(){

        $.ajax({
            cache: false,
            async: true,
            type: 'GET',
            url: 'https://restcountries.eu/rest/v1/all',
            success: handleData,
            error: errorHandle
        });
    }

    //----- AJAX DATA HANDLER
    function handleData(data) {

        $.each(data, function (i, item) {

            var countryName = item.name;

            $(".location").append('<option value="' + countryName + '">' + countryName + '</option>');

        });
    }

    //----- AJAX ERROR HANDLER
    function errorHandle() {
        console.log('problems with AJAX COUNTRY DATA REQUEST // LOOK FOR ajaxCountries()');
    }

    //----- FORM VALIDATION
    function formValidation(){
        var errorCount = 0;

        $formElements.each(function (i, item){
            var $this = $(this);
            var inputVal = $this.val();

            if(inputVal === undefined || inputVal === '' || inputVal === '* Choose your location'){
                errorCount++;
                $this.addClass('is_error');
            }
            else {

                if($this.hasClass('email')){

                    if(validateEmail(inputVal)){
                        return true;
                    }
                    else {
                        errorCount++;
                        $this.addClass('is_error');
                    }
                }
            }
        });

        if (errorCount === 0){
            return false;
        }
        else {
            return true;
        }
    }
    //----- CREATE OBJECT AFTER SUBMIT
    function createformObj(){
        var obj = {};

        $formElements.each(function (i, item){
            var $this = $(this);

            //didn't want to use name= attr :) chose class but plugin was giving undesired class names
            if($this.hasClass('ui-autocomplete-input')){
                $this.removeClass('ui-autocomplete-input');
            }

            var inputType = $this.attr('type');
            var inputVal = $this.val();
            var name = $this.attr('class');

            //filtering button out ;/
            if(inputType !== 'button'){
                obj[name] = inputVal;
            }
        });

        return obj;
    }
    //----- FORM RESET
    function clearForm(){

        $('.query-form')[0].reset();
        $('.location').removeClass('colorIt');

    }

    //----- REGEX EMAIL VALIDATION
    function validateEmail(email) {
        var emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

        if (emailRegex.test(email)){
            return true;
        }
        else {
            return false;
        }
    }

    //-------- FUNCTIONS - END

});








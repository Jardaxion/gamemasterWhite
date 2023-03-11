let numPage = 1;
$(document).ready(function() {
    // Открытие/закрытие менюшки в профиле
    $('.js-openClose-menu').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $(this).next().slideToggle();
    })

    //Открытие/закрытие меню в хедере
    $('.header__menu-button').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('noScroll');
    })


    //Открытие/закрытие уведомлений
    $('.header__notific').on('click', function(e){
        let target = $(e.target);
        if(!target.is('.header__notific-content') && !target.is('.header__notific-content *')){
            $(this).toggleClass('active');
            $('.header__notific-content').toggleClass('active');
        }
    })

    //Переключение страниц на регистрации
    $('.js-next').on('click', function(e) {
        e.preventDefault();

        numPage++;
        $('.reg__right-page.active').hide();
        $('.reg__right-page[data-page="' + numPage + '"]').css({display: 'flex'});
        $('.reg__right-page[data-page="' + numPage + '"]').addClass('active');
        $('.reg__left-box--text.active').removeClass('active');
        $('.reg__left-box').each(function() {
            if($(this).children().html() == numPage){
                $(this).addClass('active');
                if($(window).width() < 960){
                    $(this).children().next().children().addClass('active');
                }
            }
        })
    })

    $('.reg__left-box').each(function() {
        if($(this).children().html() == numPage){
            $(this).addClass('active');
            if($(window).width() < 960){
                $(this).children().next().children().addClass('active');
            }
        }
    })

    // Открытие/Закрытие популярных поисков
    $('.marketTop__search-input').on('focus', () => {
        $('.marketTop__search-popularSearch').addClass('show');
    })

    $('.marketTop__search-input').focusout(() => {
        $('.marketTop__search-popularSearch').removeClass('show');
    })

    //Открытие/Закрытие сортировки
    $('.js-open-sorting').click(function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $('.marketTop__sorting-choose').toggleClass('show');
    })

    $('.marketTop__settings').click(function(e){
        e.preventDefault();

        $('.marketTop__settings-menu').toggleClass('active');
    })

    //Slider range на фильтре
    $('.marketBottom__box-sliderRange').slider({
        range: true,
        min: Number($('.marketBottom__box-sliderRange').data('min')),
        max: Number($('.marketBottom__box-sliderRange').data('max')),
        values: [Number($('.marketBottom__box-sliderRange').data('min')), Number($('.marketBottom__box-sliderRange').data('max'))],
        slide: function(e, ui) {
            $('#from').val(ui.values[0]);
            $('#to').val(ui.values[1]);

            $('.marketBottom__box-range.min').html(ui.values[0]);
            $('.marketBottom__box-range.max').html(ui.values[1]);
        }
    })

    $('#from').val(Number($('.marketBottom__box-sliderRange').data('min')));
    $('#to').val(Number($('.marketBottom__box-sliderRange').data('max')));

    $('.marketBottom__box-range.min').html(Number($('.marketBottom__box-sliderRange').data('min')));
    $('.marketBottom__box-range.max').html(Number($('.marketBottom__box-sliderRange').data('max')));

    // Переключение страниц в чате
    $('.js-select-chat-page').on('click', function(e) {
        e.preventDefault();

        $('.js-select-chat-page.select').removeClass('select');
        $(this).addClass('select');

        $('.marketBottom__chats-page.active').removeClass('active');
        $('.marketBottom__chats-page[data-page="' + $(this).data('page') + '"]').addClass('active')
    })

    // Переключение страниц в мобильном чате
    $('.js-select-chat-page').on('click', function(e) {
        e.preventDefault();

        $('.js-select-chat-page.select').removeClass('select');
        $(this).addClass('select');

        $('.mobileChat__page.active').removeClass('active');
        $('.mobileChat__page[data-page="' + $(this).data('page') + '"]').addClass('active')
    })

    //Открытие/закрытие выборки файлов
    $('.js-opne-selectFile').on('click', () => {
        $('.marketBottom__chat-menu').toggleClass('active');
    })

    //Открытие/закрытие выборки сделки
    $('.js-open-mobSelMenu').on('click', function(){
        $(this).toggleClass('active');
        $('.chatMobile__select-menu').toggleClass('active');
    });

    // Слайдеры
    // Гланый экран
    let indexSlider = new Swiper('.slider__content-wrapper', {
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.slider__nextButton',
            prevEl: '.slider__prevButton',
        },
        pagination: {
            el: '.slider__pagination',
            clickable: true,
        }
    });

    //Слайдер на главном экране в блоке
    let blockSlider = new Swiper('.block__buttons-wrapper', {
        loop: false,
        spaceBetween: 9,
        slidesPerView: 'auto',
        width: null,
        scrollbar: {
            el: '.block__buttons-scrollbar',
        },
        breakpoints: {
            960: {
                spaceBetween: 11
            }
        }
    });

    //Открытие менюшки в каталоге
    $('.marketBottom__market2-block--more').on('click', function(){
        $('.marketBottom__market2-block--more.active').removeClass('active');
        $('.marketBottom__market2-menu.active').removeClass('active');
        
        $(this).next().toggleClass('active');
        $(this).toggleClass('active');

        $(this).addClass('second');
        setTimeout(() => {
            $(this).removeClass('second');
        }, 500)
    })
    
    //Модальные окна
    //Открытие
    $('.js-open-modal').on('click', function(e){
        e.preventDefault();

        if($('.js-open-desktop-menu').hasClass('reverse')){
            openCloseMenu();
        }

        if($('.js-open-mobile-menu').hasClass('reverse')){
            openCloseMobMenu();
        }

        openModal($(this).data('modal'));
    })
    //Закрытие
    $('.js-close-modal').on('click', function(e){
        e.preventDefault();

        closeModal();
    })
    $('.modal').on('click', function(e){
        e.preventDefault();

        if(e.target === document.querySelector('.modal')){
            closeModal();
        }

    })
    //Переоткрытие
    $('.js-reOpen-modal').on('click', function(e){
        e.preventDefault();

        reOpenModal($(this).data('modal'));
    })

    $(window).on('click', (e) => {
        if((!$(e.target).is($('.marketBottom__market2-menu')) 
        || !$(e.target).is($('.marketBottom__market2-menu *'))) 
        && !$('.marketBottom__market2-block--more').hasClass('second')){
            $('.marketBottom__market2-menu').removeClass('active');
            $('.marketBottom__market2-block--more').removeClass('active');
        }
    })

    if (/iPhone/.test(navigator.userAgent) && !window.MSStream)
    {
        $(document).on("focus", "input, textarea, select", function()
        {
            $('meta[name=viewport]').remove();
            $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
        });

        $(document).on("blur", "input, textarea, select", function()
        {
            $('meta[name=viewport]').remove();
            $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
        });
    }
})

//Модальные окна
//Открытие
function openModal(id){
    $('.modal#'+id).addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('noScroll');
}

//Закрытие
function closeModal() {
    $('.modal.active').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('noScroll');
}

//Закрытие одного модального окна и открытие другого
function reOpenModal(id) {
    $('.modal.active').removeClass('active');
    $('.modal#'+id).addClass('active');
}

//adap func
function adap(fClass, sClass){
    fClass = '.marketBottom__market2-block--' + fClass;
    sClass = '.marketBottom__market2-titleLine--' + sClass;
    $(fClass).width($(sClass).width());
}
let numPage = 1;
let isDis = true;
let lastScrollTop = 0;
$(document).ready(function() {
    $('.profile__center-input').prop('disabled', isDis);
    $('.profile__top-right--link.edit').on('click', function(e){
        e.preventDefault();
        let text = "";
        isDis = !isDis;
        let child = 'first-of-type';
        let child2 = 'last-of-type';

        if(!isDis){
            text = 'Сохранить';
        } else{
            text = 'Редактировать'
        }

        if(!isDis){
            child = 'last-of-type';
            child2 = 'first-of-type';
        }

        $(this).children('span').html(text);
        $(this).children('svg:' + child).hide();
        $(this).children('svg:' + child2).show();

        $('.profile__center-input').prop('disabled', isDis);
    })

    $(window).scroll(() => {
        let st = $(window).scrollTop();
        
        if (st > lastScrollTop){
            $('header').addClass('dontShow');
        } else {
           $('header').removeClass('dontShow');
        }
        lastScrollTop = st;
    })

    //Вычисление и постановака тайтолов на market2.html(очень важно!!! я писал это 4 часа и думал еще часа 3)
    if($('.marketBottom__right').hasClass('marketBottom__market2')){
        let i = 0;
        let j = 0;
        let k = 0;
        $('.marketBottom__market2-bigBlock:first-of-type .marketBottom__market2-block--wrapper').each(function(){
            let item = $($('.marketBottom__market2-titleLine').children()[i]);

            if(item.hasClass('marketBottom__market2-titleLine--charWrapper')){

                let newItem = $($(item.children()[0]).children()[j]);
                char = $(this); 
                
                newItem.width(char.width());
                newItem.css({'marginLeft': char.css('margin-left')});
                newItem.css({'paddingLeft': char.children('hr').css('margin-right')});
                newItem.css({'marginRight': char.css('padding-right')});

                if($($(item.children()[0]).children()[j+1]).length === 0){
                    i++;
                }

                console.log(char);
                console.log(char.width());

                j++;
                
            } else {
                item.width($(this).width());
                item.css({'marginLeft': $(this).css('margin-left')});
                item.css({'marginRight': $(this).css('padding-right')});
                i++;
            }
        })
    } else { //Создание тайтлов на остальных страницах
        $('.marketBottom__market2-bigBlock:first-of-type .marketBottom__market2-block--wrapper').each(function(){
            let arrow = '';
    
            if($(this).data('titleline-isselected')){
                arrow = `
                    <svg width="8" height="13" viewbox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.64645 12.3536C3.84171 12.5488 4.15829 12.5488 4.35355 12.3536L7.53553 9.17157C7.7308 8.97631 7.7308 8.65973 7.53553 8.46447C7.34027 8.2692 7.02369 8.2692 6.82843 8.46447L4 11.2929L1.17157 8.46447C0.976311 8.2692 0.659729 8.2692 0.464466 8.46447C0.269204 8.65973 0.269204 8.97631 0.464466 9.17157L3.64645 12.3536ZM3.5 2.18557e-08L3.5 12L4.5 12L4.5 -2.18557e-08L3.5 2.18557e-08Z" fill="#FF5C00"></path>
                    </svg>
                `;
            }
    
            let text = `
                <div class="marketBottom__market2-titleLine--titleBlock">
                    <div class="marketBottom__market2-titleLine--titleBlock-wrapper"> 
                        <p class="marketBottom__market2-titleLine--titleBlockText">`+$(this).data('titleline-text')+`</p>
                        `+ arrow +`
                    </div>
                </div>`;
            
            $(this).children('div:first-of-type').before(text)
            $(this).children('img:first-of-type').before(text)
            $(this).children('p:first-of-type').before(text)
        })
    }

    $('.marketTop__settings-menu--selectPage').on('click', function(e){
        e.preventDefault();

        $('.marketTop__settings-menu--selectPage.active').removeClass('active');
        $(this).addClass('active');

        $('.marketTop__settings-menu--right-page.active').removeClass('active');
        $('.marketTop__settings-menu--right-page[data-page="'+ $(this).data('page') +'"]').addClass('active');
    })

    document.querySelectorAll('.marketBottom__market2 .marketBottom__market2-bigBlock--grey-wrapper').forEach(function(el){
        new Swiper(el ,{
            scrollbar: {
                el: document.querySelector('.marketBottom__market2 .marketBottom__market2-pag'),
                draggable: true,
            },
            slidesPerView: 'auto',
            navigation: {
                nextEl: document.querySelector('.marketBottom__market2 .marketBottom__market2-nextArrow'),
                prevEl: document.querySelector('.marketBottom__market2 .marketBottom__market2-prevArrow'),
            },
        })
    })

    document.querySelectorAll('.marketBottom__lots-box .marketBottom__market2-bigBlock:not(.notAnav) .marketBottom__market2-bigBlock--grey-wrapper').forEach(function(el){
        let blockWithNavChilder = el.parentNode.parentNode.parentNode.children;
        let blockWithNav;

        for(let i = 0; i < blockWithNavChilder.length; i++){
            if(blockWithNavChilder[i].className.includes('marketBottom__market2-block')){
                blockWithNav = blockWithNavChilder[i];
                break;
            }
        }
        
        new Swiper(el, {
            scrollbar: {
                el: blockWithNav.children[1],
                draggable: true,
            },
            slidesPerView: 'auto',
            navigation: {
                nextEl: blockWithNav.children[2],
                prevEl: blockWithNav.children[0],
            }
        })
    })

    
    new Swiper(document.querySelector('.marketBottom__market2-titleLine--charWrapper'), {
        scrollbar: {
            el: document.querySelector('.marketBottom__market2 .marketBottom__market2-pag'),
            draggable: true,
        },
        slidesPerView: 'auto',
        navigation: {
            nextEl: document.querySelector('.marketBottom__market2 .marketBottom__market2-nextArrow'),
            prevEl: document.querySelector('.marketBottom__market2 .marketBottom__market2-prevArrow'),
        },
    })
    
    $('.marketBottom__market2-titleLine--char').width($('.marketBottom__market2-bigBlock--grey-wrapper').width());
    $('.marketBottom__market2-titleLine--char').width($('.marketBottom__market2-bigBlock--grey').width());

    $('.marketBottom__market2Mobile-filters--filter').on('click', function(e){
        $(this).toggleClass('active');
    })

    $('.marketBottom__market2-titleLine--titleBlock').on('click', function(e){
        $(this).toggleClass('active');
    })

    $('.marketBottom__like').on('click', function(e){
        e.preventDefault();
        $(this).parent('.marketBottom__card').toggleClass('liked');
    })
    // Открытие/закрытие менюшки в профиле
    $('.js-openClose-menu').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $(this).next().slideToggle(200);
    })

    //Открытие/закрытие меню в хедере
    $('.header__menu-button').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('noScroll');
    })

    $('.modal__item-selNum--left').on('click', function(){
        $(this).next().html($(this).next().html() - 1);
    })

    $('.modal__item-selNum--right').on('click', function(){
        $(this).prev().html(Number($(this).prev().html()) + 1);
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

    $('.marketBottom__market2-pag').width($('.marketBottom__market2-bigBlock--grey-wrapper').width());


    let heightOfAll = 200;
    $('.marketBottom__market2-content .marketBottom__market2-bigBlock').each(function(){
        heightOfAll += $(this).height();
    })
    $('.marketBottom__market2-top').height(heightOfAll);

    //Слайдер на главном экране в блоке
    let blockSlider = new Swiper('.block__buttons-wrapper', {
        loop: false,
        spaceBetween: 9,
        slidesPerView: 'auto',
        width: null,
        scrollbar: {
            el: '.block__buttons-scrollbar',
            draggable: true,
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

    //Открытие фильтра в мои лоты
    $('.marketBottom__lots-box--select').on('click', function(){
        $(this).next().toggleClass('active');
        $(this).toggleClass('active');
    })

    //Включение выключение настройки
    $('.marketBottom__setting-select').on('click', function(){
        $(this).toggleClass('active');
    })

    $('.marketBottom__notifications-openClose').on('click', function(){
        $(this).toggleClass('active');
        $('.marketBottom__notifications-right').slideToggle();
    })

    $('.marketBottom__history-select--select').on('click', function(){
        $(this).toggleClass('active');
        $(this).next().toggleClass('active');
    })
    
    $('.marketBottom__historyMobile-select--top').on('click', function(){
        $(this).toggleClass('active');
        $(this).next().slideToggle();

    })

    $('.basket__buy-line.banks').on('click', function(e){
        e.preventDefault();

        $(this).toggleClass('active');
        $('.basket__banksCard').slideToggle();
    })

    $('.basket__next').on('click', function(e){
        e.preventDefault();

        $('.basket__left').toggleClass('active');
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

    document.querySelectorAll('.lineSlider').forEach(function(el){
        new Swiper(el, {
            loop: false,
            spaceBetween: 15,
            slidesPerView: el.getAttribute("data-slideperview"),
            scrollbar: {
                el: el.children[1],
                draggable: true,
            },
            navigation: {
                nextEl: el.children[2].children[2],
                prevEl: el.children[2].children[0]
            },
            pagination: {
                el: el.children[2].children[1],
                clickable: true,
            },
            breakpoints: {
                960: {
                    slidesPerView: 'auto',
                }
            }
        })
    })

    $('.addLot__sixLine-item').on('click', function(){
        $('.addLot__sixLine-item.active').removeClass('active');

        $(this).addClass('active');
    })

    $('.addLot__selectTwoColumn-item--item').on('click', function(){
        $('.addLot__selectTwoColumn-item--item.active').removeClass('active');

        $(this).addClass('active');
    })

    $('.addLot__selectTwoColumn-item--double').on('click', function(){
        $('.addLot__selectTwoColumn-item--double.active').removeClass('active');

        $(this).addClass('active');
    })

    $('a.block__block.swiper-slide').on('click', function(e){
        e.preventDefault();
        $('a.block__block.swiper-slide.active').removeClass('active');

        $(this).addClass('active');
    })

    $('.addLot__box .block__block').on('click', function(e){
        e.preventDefault();

        $('.addLot__box .block__block.active').removeClass('active');

        $(this).addClass('active');
    })

    $('.addLot__select-title').on('click', function(e){
        e.preventDefault();
        if(!$('.addLot__select-title.active').is($(this))){
            $('.addLot__select-title.active').removeClass('active');
            $('.addLot__select-select.active').removeClass('active');
        }

        $(this).toggleClass('active');
        $(this).next().toggleClass('active');
    })
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
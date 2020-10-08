"use strict";

$(function () {
  /*-----------------------------------------
  hamburger
  ----------------------------------------*/
  $('.js-toggle-sp-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
  }); //ボタン押されたら閉じる

  $('.header-link').on('click', function () {
    $('.js-toggle-sp-menu').toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
  });
  /*-----------------------------------------
  アコーディオン
  ----------------------------------------*/

  $('.js-faq').on('click', function () {
    $(this).find('.js-faqA').stop().slideToggle(300);
    $(this).toggleClass('add-active');
  });
  /*-----------------------------------------
  スライダー
  ----------------------------------------*/
  // results

  new Swiper('.swiper-container', {
    speed: 400,
    width: 600,
    //（設定するとレスポンシブ機能はなくなる）
    loop: true,
    loopedSlides: 6,
    //ループ時にslidesPerView： ‘auto’の場合クローンの数を指定
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      //“bullets”, “fraction”, “progressbar”,”custom”から選べる。
      clickable: true //ページネーションをクリックすると、対応するスライドが表示さレナい

    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 24
      }
    }
  });
  /*-----------------------------------
  バリデーションチェック
  ----------------------------------------*/
  // form validation

  (function () {
    var requireFlg = false;
    var privacyFlg = false;
    var $require = $('#js-contactForm .js-require');
    var fillCount = 0;

    function setSubmitProp() {
      if (requireFlg && privacyFlg) {
        //エラーないなら
        $('#form-submit').prop('disabled', false);
      } else {
        $('#form-submit').prop('disabled', true);
      }
    } // 必須項目


    $require.on('blur', function () {
      if ($(this).attr('id') === 'js-formKana' && !$(this).val().match(/^([ァ-ン]|ー)+$/)) {
        $(this).val('');
        alert('全角カタカナで入力してください。');
      }

      $require.each(function () {
        var value = $(this).val();

        if (value !== '' && value.match(/[^\s\t]/)) {
          //スペースなどの空白も不可 aside from space or tab 
          fillCount++;
        }
      });
      requireFlg = fillCount === $require.length ? true : false;
      setSubmitProp();
      fillCount = 0;
    }); // プライバシーポリシー

    $('#form-privacy').on('change', function () {
      privacyFlg = $(this).prop('checked') ? true : false;
      setSubmitProp();
    }); // 送信時

    $('#js-contactForm').on('submit', function () {
      if (!(requireFlg && privacyFlg)) {
        alert('入力に誤りがあります。');
        return false;
      }
    });
  })(); // smooth scroll


  $('a[href^="#"]').on('click', function (e) {
    var $header = $('#js-header');
    var speed = 500;
    var href = $(this).attr('href');
    var target = $(href === '#' || href === '' ? 'html' : href);
    var position = target.offset().top - $header.outerHeight();
    $('html, body').animate({
      scrollTop: position
    }, speed, 'swing');
    e.preventDefault();
  });
  $(function () {
    var pagetop = $('#page_top'); // ボタン非表示

    pagetop.hide(); // 100px スクロールしたらボタン表示

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        pagetop.fadeIn();
      } else {
        pagetop.fadeOut();
      }
    });
    pagetop.click(function () {
      $('body, html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });
});
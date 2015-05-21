'use strict';

/**
 * @ngdoc overview
 * @name coffeecounterWebApp
 * @description
 * # coffeecounterWebApp
 *
 * Main module of the application.
 */
angular.module('coffeecounterWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref'
  ]);

$(document).ready(function(){
  TweenMax.to("#section-1", 1, {marginTop:"+=30px", opacity: "1"});
  TweenMax.to(".text-2.innovation", 1, {opacity: "1", delay: "1"});
  TweenMax.to(".line.left", .8, {opacity: "1", marginRight: "-=60px", delay: "1.2"});
  TweenMax.to(".line.right", .8, {opacity: "1", marginLeft: "-=60px", delay: "1.2"});
  moving();
  $(window).on('resize', function(){
    moving();
  });
});

function moving(){
  $('.curved').circleType({radius: 1200});

  var h1m = $('.text-1.medium').height();
  var w1m = $('.text-1.medium').width();
  $('.total').css('margin-bottom', h1m/5*-1);

  var h1l = $('.text-1.large').height();
  $('.text-1.large').css('margin-bottom', h1l/5*-1);

  //$('.text-2.medium.left').css('margin-right',w1m+60+$('.text-2.medium.left').width());
  //$('.text-2.medium.right').css('margin-left',w1m+60);
  $('.text-2.medium.left, .text-2.medium.right').css('margin-top', h1m/2.5);
  $('#section-3').css('height', h1m);

  $('.line').css('margin-top', $('.innovation').height()/2);
  $('.line.left').css('margin-right',w1m+50);
  $('.line.right').css('margin-left',w1m-15+50);
}

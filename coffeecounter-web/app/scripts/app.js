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
  /* Animations */
  var flag_3 = true;
  var flag_4 = true;

  var flag2 = true;

  TweenMax.to("#section-1", 1, {marginTop:"+=30px", opacity: "1"});
  TweenMax.to(".text-2.innovation", 1, {opacity: "1", delay: "1"});
  TweenMax.to(".line.left", .8, {opacity: "1", marginRight: "-=60px", delay: "1.2"});
  TweenMax.to(".line.right", .8, {opacity: "1", marginLeft: "-=60px", delay: "1.2"});
  $('.curved').circleType({radius: 1200});
  moving();
  $(window).on('resize', function(){
    moving();
  });

  /* Charts */
  // Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var data = {
    labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],
    datasets: [
        {
            label: "Coffee Counter I",
            fillColor: "rgba(255, 255, 255, 0.8)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: [0, 14, 15, 18, 5, 3, 8, 12, 4, 2, 9, 0]
        },
        {
            label: "Coffee Counter II",
            fillColor: "rgba(255, 255, 255, 0.8)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: [0, 18, 5, 3, 14, 4, 2, 15, 8, 12, 9, 0]
        }
    ]
  };

  var option = {
    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'dharma_gothic_m_regularRg', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 40,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#FFF",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(255,255,255,.5)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - Whether the line is curved between points
    bezierCurve : false,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 6,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 30,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };
  var myLineChart;

  // Progressive disclosure images
  $(window).scroll(function(){
    $('.hideme').each( function(i){
        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
          if($(this).attr('id')!="myChart"){
            $(this).animate({'opacity':'1','margin-top':'-40px'},1000,'easeOutQuart', function(){
              if($(this).attr('id')=="section-3" && flag_3){
                TweenMax.to(".text-2.medium.left", .8, {opacity: "1", left: "+=80px"});
                TweenMax.to(".text-2.medium.right", .8, {opacity: "1", right: "+=80px"});
                flag_3 = false;
                $('#totalcups').numAnim({
                  endAt: "00378",
                  duration: 1
                });
              }
              else if($(this).attr('id')=="section-4" && flag_4){
                $('#todaycups').numAnim({
                  endAt: "042",
                  duration: 1
                });
                flag_4 = false;
              }
            });
          }
        }
        else if(bottom_of_window > $(this).position().top + $(this).outerHeight()/3*2 && $(this).attr('id')=="myChart" && flag2){
          myLineChart = new Chart(ctx).Line(data,option);
          console.log("update");
          flag2 = false;
        }
    });
  });
});

function moving(){


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

  $('#coffee').css('padding-top', h1m+h1l);
}

(function($){
    $.fn.extend({
        numAnim: function(options) {
            if ( ! this.length)
                return false;

            this.defaults = {
                endAt: 2560,
                numClass: 'autogen-num',
                duration: 5,   // seconds
                interval: 31  // ms
            };
            var settings = $.extend({}, this.defaults, options);

            var $num = $('<span/>', {
                'class': settings.numClass
            });

            return this.each(function() {
                var $this = $(this);

                // Wrap each number in a tag.
                var frag = document.createDocumentFragment(),
                    numLen = settings.endAt.toString().length;
                for (var x = 0; x < numLen; x++) {
                    var rand_num = Math.floor( Math.random() * 10 );
                    frag.appendChild( $num.clone().text(rand_num)[0] )
                }
                $this.empty().append(frag);

                var get_next_num = function(num) {
                    ++num;
                    if (num > 9) return 0;
                    return num;
                };

                // Iterate each number.
                $this.find('.' + settings.numClass).each(function() {
                    var $num = $(this),
                        num = parseInt( $num.text() );

                    var interval = setInterval( function() {
                        num = get_next_num(num);
                        $num.text(num);
                    }, settings.interval);

                    setTimeout( function() {
                        clearInterval(interval);
                    }, settings.duration * 1000 - settings.interval);
                });

                setTimeout( function() {
                    $this.text( settings.endAt.toString() );
                }, settings.duration * 1000);
            });
        }
    });
})(jQuery);

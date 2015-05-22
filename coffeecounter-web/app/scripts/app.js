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

  var flag_2 = true;
  var flag_3 = true;
  var flag_4 = true;
  var flag_5 = true;

  /* Charts */
  // Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart;
  var data = {
    labels: ["9 A M", "1 0 A M", "1 1 A M", "1 2 P M", "1 P M", "2 P M", "3 P M", "4 P M", "5 P M", "6 P M", "7 P M", "8 P M"],
    datasets: [
        {
            label: "Coffee Counter I",
            fillColor: "rgba(255, 255, 255, 0.8)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            label: "Coffee Counter II",
            fillColor: "rgba(255, 255, 255, 0.8)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
    ]
  };

  var option = {
    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    // Interpolated JS string - can access value
    scaleLabel: "<%if (value != 0){%><%=value%><%}%>",
    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'dharma_gothic_m_regularRg', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 32,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#FFF",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: false,
    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

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
    // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };

/* Firebase */
var totalcups = "00000";
var todaycups = "000";
var myFirebaseRef = new Firebase("https://amber-torch-2593.firebaseio.com");
myFirebaseRef.child("coffee").orderByKey().limitToLast(1).on("child_added", function(snapshot){
    var lastchild = snapshot.val();

    var total = pad(lastchild['total'],5);
    var daily = pad(lastchild['daily'],3);
    var timestamp = lastchild['timestamp'];
    var hourly = lastchild['hourly'];
    var id = lastchild['id'];
    totalcups = total;
    todaycups = daily;

    for (var key in hourly){
    	var hr = key;
    	//console.log(hr);
    	var m1 = hourly[key].split(',')[0];
    	var m2 = hourly[key].split(',')[1];
    	data['datasets'][0]['data'][hr-9] = m1;
		  data['datasets'][1]['data'][hr-9] = m2;
      if(!flag_2)myLineChart = new Chart(ctx).Line(data,option);
    }

    $('#totalcups').numAnim({
      endAt: totalcups,
      duration: 1
    });
    $('#todaycups').numAnim({
      endAt: todaycups,
      duration: 1
    });
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var k1 = 0;
var k2 = 0;

$(document).ready(function(){
  var window_width = $(window).width();
  /* Animations */
  TweenMax.to("#section-1", 1, {marginTop:"+=30px", opacity: "1"});
  TweenMax.to(".text-2.innovation", 1, {opacity: "1", delay: "1"});
  TweenMax.to(".line.left", .8, {opacity: "1", left: "+=60px", delay: "1.2"});
  TweenMax.to(".line.right", .8, {opacity: "1", right: "+=60px", delay: "1.2"});
  $('.curved').circleType({radius: 1200});

  /* Responsive */
  moving();

  $(window).on('resize', function(){
    k1 = 60;
    k2 = 80;
    moving();
  });

  // Progressive disclosure images
  $(window).scroll(function(){
    $('.hideme').each( function(i){
        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
          if($(this).attr('id')=="section-3" && flag_3){
            TweenMax.to("#section-3", .8, {opacity: "1", marginTop: "-=40px"});
            TweenMax.to(".text-2.medium.left", .8, {opacity: "1", left: "+=80px", delay: .8});
            TweenMax.to(".text-2.medium.right", .8, {opacity: "1", right: "+=80px", delay: .8});
            flag_3 = false;
            $('#totalcups').numAnim({
              endAt: totalcups,
              duration: 1
            });
          }
          else if($(this).attr('id')=="section-4" && flag_4){
            TweenMax.to("#section-4", .8, {opacity: "1", marginTop: "-=40px"});
            $('#todaycups').numAnim({
              endAt: todaycups,
              duration: .8
            });
            flag_4 = false;
          }
        }
        else if(bottom_of_window >= $(this).position().top + $(this).outerHeight()/6*5){
          if($(this).attr('id')=="myChart" && flag_2){
            myLineChart = new Chart(ctx).Line(data,option);
            TweenMax.to("#myChart", .8, {opacity: "1"});
            flag_2 = false;
          }
        }
        else if(bottom_of_window >= $(this).position().top + $(this).outerHeight()/2){
          if($(this).attr('id')=="machines" && flag_5){
            if($(window).width()>=991){
              TweenMax.to("#machine-1", .8, {opacity: "1", marginLeft: "+=120px", ease:Power1.easeInOut});
              TweenMax.to("#machine-2", .8, {opacity: "1", marginRight: "+=120px", ease:Power1.easeInOut});
            }
            else {
              $('#machine-1').css('margin-left', 'auto');
              $('#machine-2').css('margin-right', 'auto');
              TweenMax.to("#machine-1, #machine-2", .8, {opacity: "1", ease:Power1.easeInOut});
            }
            flag_5 = false;
          }
        }
    });
  });
});
var shrink = true;
var enlarge = true;

function moving(){
  var window_width = $(window).width();
  if(window_width < 1024) {
    $('#machine-1').css('margin-left', 'auto');
    $('#machine-2').css('margin-right', 'auto');
    if(window_width<767){
      enlarge = true;
      if(shrink){
        option['scaleFontSize'] =  16;
        option['pointDotRadius'] = 3;
        myLineChart = new Chart(ctx).Line(data,option);
        shrink = false;
      }
    }
    else{
      shrink = true;
      if(enlarge){
        option['scaleFontSize'] =  32;
        option['pointDotRadius'] = 6;
        myLineChart = new Chart(ctx).Line(data,option);
        enlarge = false;
      }
    }
  }
  var h1m = $('.text-1.medium').height();
  var w2i = $('.text-2.innovation').width();
  $('.total').css('margin-bottom', h1m/5*-1);

  var h1l = $('.text-1.large').height();
  $('.text-1.large').css('margin-bottom', h1l/5*-1);

  $('.text-2.medium.left, .text-2.medium.right').css('margin-top', h1m/2.5);
  $('.text-2.medium.left').css('left', window_width/2-$('#totalcups').width()/2-$('.text-2.medium.left').width()-100+k1);
  $('.text-2.medium.right').css('right', window_width/2-$('#totalcups').width()/2-$('.text-2.medium.right').width()-100+k1);

  $('#section-3').css('height', h1m);

  $('.line').css('margin-top', $('.innovation').height()/2);
  $('.line.left').css('left', window_width/2-$('.innovation span').width()/2-$('.line').width()-100+k1);
  $('.line.right').css('right', window_width/2-$('.innovation span').width()/2-$('.line').width()-100+k1);
  $('#coffee').css('padding-top', h1m+h1l-40);
}

/* Scrambling Numbers */
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

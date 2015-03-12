$(document).ready(function() {
	var CONSTANTS = {} 
	  , timers = []
	  , $countdown = {
	      container: $('.clock').first(),
	      days: $('.clock').first().find('[data-countdown-unit="days"]'),
	      hours: $('.clock').first().find('[data-countdown-unit="hours"]'),
	      minutes: $('.clock').first().find('[data-countdown-unit="minutes"]'),
	      seconds: $('.clock').first().find('[data-countdown-unit="seconds"]')
	    }
	  , _successLOAD
	  , _errorLOAD
	  , jqxhr
	  , nbad = new Date("February 19, 2015 20:00:00 GMT")
	  , nbadiso = nbad.toISOString()
	  , nhld = new Date("March 2, 2015 20:00:00 GMT")
	  , nhldiso = nhld.toISOString()
	  , nflfad = new Date("March 10, 2015 20:00:00 GMT")
	  , nflfadiso = nflfad.toISOString()
	  , nfld = new Date("April 30, 2015 23:00:00 GMT")
	  , nfldiso = nfld.toISOString()
	  , bitly = 'http://es.pn/1E4BbVJ';
	;

  $('.carousel').carousel({
    interval: 5000,
    swipe: 30
  });
  $(".carousel").swiperight(function() {
  	$(".carousel").carousel('prev');
  });
  $(".carousel").swipeleft(function() {
    $(".carousel").carousel('next');
  });
  
  initCountdown(new Date(nfldiso));
  getStocks();
  
  setInterval(function(){ 
  	getStocks()    
  }, 5000);
  
  /* GA Events */
  $('.mlogo').on('click',function() {
  	ga('send', 'event', 'Header', 'Logo', 'Fidelity Mobile');
  	window.open('https://communications.fidelity.com/pi/2015/brokerage/trading','_blank');
  });
  $('.logo').on('click',function() {
  	ga('send', 'event', 'Header', 'Logo', 'Fidelity Desktop');
  });
  $('td.shift').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Image', 'Shift Change');
  	window.open('https://www.fidelity.com/viewpoints/tech-stock-ideas-TradeTalk','_blank');
  });
  $('td.scout').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Image', 'Scouting the Field');
  	window.open('https://www.fidelity.com/viewpoints/value-ideas-TradeTalk','_blank');
  });
  $('td.trigger').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Image', 'When to Pull the Trigger');
  	window.open('https://www.fidelity.com/viewpoints/bollinger-bands-TradeTalk','_blank');
  });
  $('td.learn').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Image', 'What Investors Can Learn From GMs');
  	window.open('https://www.fidelity.com/viewpoints/offseason-manager-moves-TradeTalk','_blank');
  });
  $('a.shift').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Text', 'Shift Change');
  });
  $('a.scout').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Text', 'Scouting the Field');
  });
  $('a.trigger').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Text', 'When to Pull the Trigger');
  });
  $('a.learn').on('click',function() {
  	ga('send', 'event', 'Viewpoints', 'Text', 'What Investors Can Learn From GMs');
  });
  
  $('.hero .trending .title').on('click',function() {
  	ga('send', 'event', 'Hero', 'Title', 'Trending');
  });
  $('.hero .news .title').on('click',function() {
  	ga('send', 'event', 'Hero', 'Title', 'News');
  });
  $('.hero .news .articles ul li:nth-child(1)').on('click',function() {
  	ga('send', 'event', 'Hero', 'News', 'First');
  });
  $('.hero .news .articles ul li:nth-child(2)').on('click',function() {
  	ga('send', 'event', 'Hero', 'News', 'Second');
  });
  $('.hero .news .articles ul li:nth-child(3)').on('click',function() {
  	ga('send', 'event', 'Hero', 'News', 'Third');
  });
  $('.hero .news .articles ul li:nth-child(4)').on('click',function() {
  	ga('send', 'event', 'Hero', 'News', 'Fourth');
  });
  $('.hero .news .articles ul li:nth-child(5)').on('click',function() {
  	ga('send', 'event', 'Hero', 'News', 'Fifth');
  });
  
  $('.trades .left a.btn').on('click',function() {
  	ga('send', 'event', 'Trades', 'Button', 'Im In');
  });
  $('.trades .right a.btn').on('click',function() {
  	ga('send', 'event', 'Trades', 'Button', 'When To Pull the Trigger');
  });
  
  $('.edge .text a').on('click',function() {
  	ga('send', 'event', 'Edge', 'Link', 'Advantage You Need');
  });
  
  
  /* scroll for trade tracker */
  $('.tradetracker .content p').marquee('ttmarquee');
  
  $(".tradetracker .ttmarquee").mouseover(function(){
  	$('.tradetracker .ttmarquee').trigger('stop');
  });
  $(".tradetracker .ttmarquee").mouseout(function(){
  	$('.tradetracker .ttmarquee').trigger('start');
  });
  
  /* scroll for stocks */
  $('div.scroll').css('height','31px');
    
  $('#marqueetext').marquee('stockmarquee');
  
  $(".ssmarqueetext").mouseover(function(){
  	$('.ssmarqueetext').trigger('stop');
  });
  $(".ssmarqueetext").mouseout(function(){
  	$('.ssmarqueetext').trigger('start');
  });
  
  function ontick(ts){
  	return updateCountdown(ts);
  }
    
  function updateCountdown(ts){
    $countdown.days.text(ts.days < 10 ? '0' + ts.days.toString() : ts.days.toString());
    $countdown.hours.text(ts.hours < 10 ? '0' + ts.hours.toString() : ts.hours.toString());
    $countdown.minutes.text(ts.minutes < 10 ? '0' + ts.minutes.toString() : ts.minutes.toString());
    $countdown.seconds.text(ts.seconds < 10 ? '0' + ts.seconds.toString() : ts.seconds.toString());
    return $countdown;
  }
  
  function initCountdown(d){
    if (Date.now() < d.valueOf()){
      var timer = countdown(ontick, d, ~(countdown.YEARS | countdown.MONTHS | countdown.WEEKS | countdown.MILLISECONDS), 0);
      return timers.push(timer);
    } else {
      $countdown.days.text('00');
      $countdown.hours.text('00');
      $countdown.minutes.text('00');
      $countdown.seconds.text('00');
      return $countdown;
    }
  }     
  
  function getStocks() {
  	_successLOAD = function _success(response){
  		//console.log("success: ", response.QUOTES['.ttma']);
  		var rnum = "RANKING_CLOSE_"
  			, rname = "RANKING_DESCRIPTION_"
  			,	rabbrev = "RANKING_SYMBOL_"
  			, date = "ACTIVITY_DATE_LAST"
  			, time = "ACTIVITY_TIME_LAST"
  			, num = []
  			, name = []
  			, abbrev = []
  		;
  		
  		for (var i=1; i<=10; i++) {
  			num.push(rnum + i);
  			name.push(rname + i);
  			abbrev.push(rabbrev + i);
  		}
  		
  		/*
  		console.log("num: ", num);
  		console.log("name: ", name);
  		console.log("abbrev: ", abbrev);
  		*/
  		$('.scroll .ssmarqueetext').empty();
  		
  		$.each(num, function(n) {
  			//console.log(response.QUOTES['.ttma'][name[n]]);
  			
  			sname = response.QUOTES['.ttma'][name[n]];
  			sabbrev = response.QUOTES['.ttma'][abbrev[n]];
  			snum = response.QUOTES['.ttma'][num[n]];
  			
  			$('.scroll .ssmarqueetext').append('<strong>' + sname + '</strong> (' + sabbrev + ') ' + snum + '   ');
  		});
  		
  		$('.stocks .note').text('Quotes delayed at least 15 min. as of ' + response.QUOTES['.ttma'][time] + ' ET ' + response.QUOTES['.ttma'][date] + '. Data is provided by Fidelity investments and interactive data corp.');
  	};
  	
  	_errorLOAD = function _error(jqXHR, textStatus, errorThrown){
  	  console.log("ajax error");
  	}; 
  
	  jqxhr = $.ajax({
	    url: 'https://fastquote.fidelity.com/service/quote/json?productid=microsite&symbols=.ttma',
	    cache: false,
	    type: 'GET',
	    dataType: 'jsonp',
	    success: _successLOAD,
	    error: _errorLOAD
	  });
	}
  
 
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1545707392373473',
  	  xfbml      : true,
  	  version    : 'v2.2'
  	});
  };
  
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
  	if (d.getElementById(id)) {return;}
  	  js = d.createElement(s); js.id = id;
  		js.src = "//connect.facebook.net/en_US/sdk.js";
  		fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  	
  $('.header .fb').on('click', function(e){
    e.preventDefault();
  	FB.ui(
  	{
  		method: 'share',
  		href: 'http://promo.espn.go.com/espn/contests/fidelity/2015/tradetalk/facebook_share/summary?view=header',
  	},
  	function(response) {
  		if (response && !response.error_code) {
  		  ga('send', 'event', 'Social Share', 'FB Share', 'Fidelity Header');
  		} else {
  		  //alert('Error while posting.');
  		}
  	}
  	);
  }); 
  $('.header .tw').on('click', function(e){
  	ga('send', 'event', 'Social Share', 'Twitter Share', 'Fidelity Header');
  	var url = 'https://twitter.com/intent/tweet?source=webclient&text=The%20countdown%20is%20on!%20The%20football%20draft%20is%20about%20to%20begin%20%23TradeTalk%20via%20%40Fidelity%20%40ESPN&url=' + bitly
  	var title = 'Twitter'
  	socialWindow = window.open(url,title,'toolbar=no,width=700,height=400,directories=no,status=no,scrollbars=yes,resize=no,menubar=no');
  });
  $('.header .tt').on('click', function(e){
  	ga('send', 'event', 'Social Share', '#TradeTalk', 'Fidelity Header');
  	var url = 'https://twitter.com/intent/tweet?source=webclient&text=The%20countdown%20is%20on!%20The%20football%20draft%20is%20about%20to%20begin%20%23TradeTalk%20via%20%40Fidelity%20%40ESPN&url=' + bitly
  	var title = 'Twitter'
  	socialWindow = window.open(url,title,'toolbar=no,width=700,height=400,directories=no,status=no,scrollbars=yes,resize=no,menubar=no');
  });
  
  $('.footer .fb').on('click', function(e){
    e.preventDefault();
  	FB.ui(
  	{
  		method: 'share',
  		href: 'http://promo.espn.go.com/espn/contests/fidelity/2015/tradetalk/facebook_share/summary?view=footer',
  	},
  	function(response) {
  		if (response && !response.error_code) {
  		  ga('send', 'event', 'Social Share', 'FB Share', 'Fidelity Footer');
  		} else {
  		  //alert('Error while posting.');
  		}
  	}
  	);
  }); 
	$('.footer .tw').on('click', function(e){
		ga('send', 'event', 'Social Share', 'Twitter Share', 'Fidelity Footer');
		var url = 'https://twitter.com/intent/tweet?source=webclient&text=Be%20at%20the%20top%20of%20your%20game%20with%20%23TradeTalk%20from%20%40Fidelity%20%40ESPN&url=' + bitly
		var title = 'Twitter'
		socialWindow = window.open(url,title,'toolbar=no,width=700,height=400,directories=no,status=no,scrollbars=yes,resize=no,menubar=no');
	});
	$('.footer .tt').on('click', function(e){
		ga('send', 'event', 'Social Share', '#TradeTalk', 'Fidelity Footer');
		var url = 'https://twitter.com/intent/tweet?source=webclient&text=Let%27s%20talk%20trades.%20%23TradeTalk%20from%20%40Fidelity%20%40ESPN&url=' + bitly
		var title = 'Twitter'
		socialWindow = window.open(url,title,'toolbar=no,width=700,height=400,directories=no,status=no,scrollbars=yes,resize=no,menubar=no');
	});
	$('.footer .url a').on('click', function(e){
		ga('send', 'event', 'Footer', 'Link', 'fidelity.com/tradetalk');
	});  
           
});

function socialShare(url,title,label){
	socialWindow = window.open(url,title,'toolbar=no,width=700,height=400,directories=no,status=no,scrollbars=yes,resize=no,menubar=no');
}
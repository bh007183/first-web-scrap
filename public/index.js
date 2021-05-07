

$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent("https://www.trilogyed.com/about/careers/") + '&callback=?', function(res){
	$("#body").append(res.contents);
	console.log(res)

});




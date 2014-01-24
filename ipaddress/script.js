$(document).ready(function(){
	(function(){
	var ip={
		init: function(){
			this.url='http://ip.jsontest.com/';
			console.log(this.url);
			this.fetch();
		},
		fetch: function(){
			console.log(this);
			$.getJSON(this.url,function(data) {
					//console.log(data);
					var context = {
						ip:data.ip
					};
					var template=Handlebars.compile($('#template').html());
					var temp=template(context);
					console.log(temp);
					$(".holder").append(temp);
			});
		}

	};
	ip.init();
})();

});
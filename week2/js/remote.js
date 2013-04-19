//Mark Johnson 
// ASD 1304
// Week 2 

//Loads data.csv
$( '#csv-data-btn' ).bind( 'click', function(){
	$.mobile.changePage( '#siblings', {} );
	$.ajax({
		type: "GET",
		url: "xhr/data.csv",
		dataType: "text",
		success: function( data ) {
			var allTextLines = data.split( /\r\n|\n/ );
			var headers = allTextLines[0].split( ',' );
			var lines = [];

			for ( var i = 1; i<allTextLines.length; i++ ){
				var data = allTextLines[i].split( ',' );
				if ( data.length == headers.length ){
					var headLines = [];

					for ( var j=0; j<headers.length; j++ ){
						headLines.push( data[j] );
					}
					lines.push( headLines );
				}
			}

			for(var m = 0; m < lines.length; m++){
				var headLines = lines[m];
				$(' ' +
					'<div data-role="content" >' +
						'<div class="dataDiv">' + headLines[0] +'</div>' +
						'<div class="dataDiv">' + headLines[1]+'</div>' +
						'<div class="dataDiv">' + headLines[2] +'</div>' +
					'</div>'
				).appendTo("#csv-container");
			}
		}
	} )
} ); 

// Load data.json
$("#js-data-btn").bind("click", function(){
	$.mobile.changePage("#json-page", {});
	$.ajax({
		url: "xhr/data.json",
		type: "GET",
		dataType: "json",
		success: function(response){
			for( var i =0; j= response.players.length; i < j, i++){
				var jsonData = response.players[i]; // makes equal to current index
				$(' ' +
					'<div data-role="content" >' +
						'<div class="dataDiv">' + jsonData.name +'</div>' +
						'<div class="dataDiv">' + jsonData.championships_Won +'</div>' +
						'<div class="dataDiv">' + jsonData.points_scored +'</div>' +
						'<div class="dataDiv">' + jsonData.notes +'</div>' +
					'</div>'
				).appendTo("#js-container");
			};
		}
	});
});

// Loads data.xml
$("#xml-data-btn").bind("click", function(){
	$.mobile.changePage("#xml-page", {});
	$.ajax({
		url: "xhr/data.xml",
		type: "GET",
		dataType: "xml",
		success: function(xml){
			$(xml).find("typeOfCar").each(function(){
				var cName = $(this).find("carName").text();
				var cModel = $(this).find("carModel").text();
				var desc = $(this).find("description").text();
				$(' ' +
					'<div data-role="content" >' +
						'<div class="dataDiv">' + cName +'</div>' +
						'<div class="dataDiv">' + cModel +'</div>' +
						'<div class="dataDiv">' + desc +'</div>' +
					'</div>'
				).appendTo("#xml-container");
			});
		}
	});
});



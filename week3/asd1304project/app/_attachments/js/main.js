$('#home').on('pageinit', function(){
	$.ajax({
		"url": "_view/notes",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, note){
			
				var title = note.value.title;
				var date = note.value.date;
				var where = note.value.where;
				var notes = note.value.notes;
				
				$('#noteList').append(
					$('<li>')
						.text("Title: " + title + " Date: " + date + " Where: " + where + " Notes: " + notes)
					
				);
			});
			
			$('#noteList').listview('refresh');
			
		}
	});
});

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



$('#additem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#noteForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			alert("Required fields missing");
			},
			submitHandler: function() {
		var data = $(".myForm").serializeArray();
			storeData(data);
		}
	});
	
		$('#reset').click(function() {
	    	$('#amount').val('1').slider('refresh');
	    	$('#selectCat').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
		$('form#noteForm')[0].reset();
		
	});
	
	$("#clear").click(function(){
        clearLocal();
        return false;
    }); 
});


$("#display").click(function(){
	$.mobile.changePage('#displayitem', { transition: "slide"});
      getData();
      return false;
  });

var autofillData = function (){
	//store JSON data 
	for(var n in json){
	    var id = Math.floor(Math.random()*100000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getData = function(){
	if(localStorage.length === 0){
        	alert("No notes to view, some will be added.");
        	autofillData();
        }
	        var makeDiv = $('<div>');
	        makeDiv.attr("id", "items");
	        var makeList = $('<div>');
	        makeList.attr("id", "ulList");
	        makeList.attr("data-inset", "true"); 
	        makeList.attr("data-role", "listview");
	        makeList.appendTo(makeDiv);
			$('#displaydata').append(makeDiv);
			$('#items').show();
	        for(var i=0, len=localStorage.length; i<len; i++){
	            var makeLi = $('<li>');
	            makeLi.attr("id", "mainLi");
	            makeLi.attr("class", "ui-li ui-li-static ui-btn-up-c");
	            var linksLi = $('<li>');
	            linksLi.attr("id", "editDeleteLi");
	            makeList.append(makeLi);
	            var key = localStorage.key(i);
	            var value = localStorage.getItem(key);
	            var obj = JSON.parse(value);
	            var makeSubList = $('<div>');
	            makeSubList.attr("id", "subUl");
	            makeLi.append(makeSubList);
	            for(var n in obj){
	                var makeSubLi = $('<li>');
	                makeSubList.append(makeSubLi);
	                var optSubText = obj[n][0]+ " " +obj[n][1];
	                makeSubLi.html(optSubText);
	                makeLi.append(linksLi);
            	}
	            makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
            }
};

var makeItemLinks = function(key, linksLi){
    var editLink = $('<a>');
		editLink.attr("href", "#additem")
				.attr("data-role", "button")
				.attr("data-theme", "b")
				.attr("data-transition", "slide")
				.attr("data-direction", "reverse")
				.attr("style", "padding: 10px")
				.attr("class", "ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all")
				.key = key;
    var editText = "Edit Item ";
    	editLink.on("click", editItem)
				.html(editText)
				.appendTo(linksLi);
				
    var deleteLink = $('<a>');
    	deleteLink.attr("href", "#")
				  .attr("data-role", "button")
				  .attr("data-theme", "b")
				  .attr("style", "padding: 10px")
				  .attr("class", "ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all")
				  .key = key;
    var deleteText = "Delete Item";
    	deleteLink.on("click", deleteItem)
				  .html(deleteText)
				  .appendTo(linksLi);
};

var storeData = function(data){
	var key;
	if(!key){
    	var id = Math.floor(Math.random()*100000001);
    }
    else{
    	id = key;
    }

    var item 				= {};
	  item.title 			= ["Title:", $('#title').val()];
        item.selectCat		= ["Category:", $('#selectCat').val()];
        item.dadded 		= ["Date", $('#dadded').val()];
        item.where 		= ["Where will this be:", $('#where').val()];
        item.favorite 	 	= ["Favorite Note:", $('input[name=favorite]:checked').val()];
        item.amount		= ["Amount of items:", $('#amount').val()];
        item.notes 		= ["Notes:", $('#notes').val()];
		
	//save to local storage
	console.log(id, item);
       localStorage.setItem(id, JSON.stringify(item));
       alert("Note Saved!");
		
		$('form#noteForm')[0].reset();
		$('#amount').val('1').slider('refresh');
	    	$('#selectCat').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
}; 

 var editItem = function(){
    	//grab data from local storage
    	var value = localStorage.getItem(this.key);
    	var item = JSON.parse(value);
    	   	
    	$('#title').val(item.title[1]);
    	$('#selectCat').val(item.selectCat[1]).selectmenu();
    	$('#dadded').val(item.dadded[1]);
    	$('#favorite').val(item.favorite[1]);
    	$('#amount').val(item.amount[1]);
    	$('#notes').val(item.notes[1]);
    	
    	save.off('click', storeData);
    	//change submit value to edit
    	$('#submit').val("Edit Item");
    	var editSubmit = $('#submit');
    	//save key value established
    	$('#editSubmit').on("click", validate);
    	editSubmit.key = this.key;	
};

var clearLocal = function(){
	if (localStorage.length === 0){
    		alert("You have no notes to clear!");
			$.mobile.changePage('#additem', { transition: "slide"});			
    	}
    	else{
    		localStorage.clear();
    		alert("The notes have been deleted!");
			$.mobile.changePage('#additem', { transition: "slide"});
			window.location.reload();
		}
	};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this item?");
    	if(ask){
    		localStorage.removeItem(this.key);
    		alert("Note was deleted.");
    		$.mobile.changePage('#additem', { transition: "slide"});
			window.location.reload();
    	}
    	else{
    		alert("Note was not deleted.");
    	}	
};
// Mark Johnson 
// ASD1304 
// Notebuddy
// Project 4 CouchDB App

$('#createNote').on('pageinit', function (){
	var noteForm = $('#addItem');
	noteForm.validate({
		invalidHandler: function (form, validator) {

		},
		submitHandler: function () {
			var data = noteForm.serializeArray();
			if ($('#submit').val() === "Save Note") {
				storeData();
			}
		}
});
	
var title = $('#title');
	selectCat = $('#selectCat');
	date = $('#dadded');
	where = $('#where');
	note = $('#notes');
	
	function storeData() {
		var favorite = $(':radio:checked').val();
		var item			= {};
			item._id		= ("note" + $.now());
			item.title		= title.val();
			item.selectCat	= selectCat.val();
			item.date		= date.val();
			item.where		= where.val();
			item.favorite	= favorite;
			//item.amount		= amount.val();
			//item.notes		= notes.val();
			
		$.couch.db("notebuddy").saveDoc(item, {
			success: function(data) {
				console.log(data);
			}
		});
		alert("Note Saved!");
		$.mobile.changePage('#viewNotes');
		window.location.reload();
	}
	
	function getCheckboxValue() {
		var checkboxes = $(':checkbox:checked');
		var holdValues = [];
		for (var i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				var checkedValue = checkboxes[i].value;
				holdValues.push(checkedValue);
			}
		}
		return holdValues;	
	}
});

$('#viewNotes').on("pageinit", function() {
	$.couch.db("notebuddy").view("notebuddy/notes", {
		success: function(data) {
			$("#noteList").empty();
			$.each(data.rows, function(index, notes) {
				var key = notes.key
					title = notes.value.title
					dadded = notes.value.dadded
					where = notes.value.where
					favorite = notes.value.favorite
					amount = notes.value.amount
					notes = notes.value.notes
					id = notes.id
					rev = notes.value.rev
				$(''+
					'<div id="'+ id +'" data-role="collapsible" data-content-theme="e">'+
						'<h4>'+ key +'</h4>'+
						'<p>Title: '+ title +'</p>'+
						'<p>Date: '+ dadded +'</p>'+
						'<p>Where: '+ where +'</p>'+
						'<p>Favorite? '+ favorite +'</p>'+
						'<p>Amount: '+ amount +'</p>'+
						'<p>Notes '+ notes +'</p>'+
						'<li><a class="editLink" data-role="button" data-inline="true" data-theme="b" href="#createNote" data-mini="true">Edit Note</a>'+
						'<a class="deleteLink" data-role="button" data-inline="true" data-theme="b" href="#" data-mini="true">Delete Note</a>'+
						'</li>'+
					'</div>'
				).appendTo('#noteList');
				makeItemLinks(id, rev);
			});

		$('#noteList').trigger("create");
		
		}
});
	
	function makeItemLinks(id, rev) {
		var deleteLink = $('#'+ id +' .deleteLink');
		deleteLink.on("click", function() {
			var ask = confirm("Delete This Note.");
			if (ask) {
				deleteNote(id, rev);
				alert("Note was deleted!");
				window.location.reload();
			} else {
				alert("Note was not deleted!");
			}
		});
		
		var editLink = $('#'+ id +' .editLink');
		editLink.on("click", function() {
			$.couch.db("notebuddy").openDoc(id, {
			    success: function(note) {
				    $.mobile.changePage('#createNote');
					
					//populate form fields with current values
					$('#title').val(''+ note.title);
					$("#selectCat option[value=" + note.selectCat +"]").attr("selected","selected");
					$('#selectCat').selectmenu('refresh', true);
					$('#dadded').val(''+ note.dadded);
					$('#where').val(''+ note.where);
					$("input[type='radio'][value="+ note.favorite +"]").attr("checked", "true").checkboxradio("refresh");
					$('#amount').val(''+ note.amount);
					$('#notes').val(''+ note.notes);
										
					//Change submit button value to edit button
					$('#headerBar').html('Edit Note');
					$('#submit').val('Edit Note');
					var editSubmit = $('#submit');
					
					editSubmit.on("click", function(){
						var title = $('#title');
							selectCat = $('#selectCat');
							date = $('#dadded');
							where = $('#where');
							note = $('#notes');
						var favorite = $(':radio:checked').val();
						var favorite = getCheckboxValue();
						
						var note			= {};
							note._id		= id;
							note._rev		= rev;
							note.title		= title.val();
							note.date		= date.val();
							note.where		= where.val();
							note.favorite	= favorite.val();
							note.selectCat	= selectCat;
							note.amount		= amount.val();
							note.notes		= notes.val();
							
							//log out the note to see if its working 
							console.log(note);
						
						$.couch.db("notebuddy").saveDoc(note, {
						    success: function(data) {
						    	// log out data to see if its working 
						        console.log(data);
						    }
						});	
						
						alert("Note Was Updated!");
						$.mobile.changePage('#viewNotes');
						window.location.reload();
							
						function getCheckboxValue() {
							var checkboxes = $(':checkbox:checked');
							var holdValues = [];
							for (var i=0, j=checkboxes.length; i<j; i++){
								if(checkboxes[i].checked){
									var checkedValue = checkboxes[i].value;
									holdValues.push(checkedValue);
								}
							}
							return holdValues;	
						}
					
					});
				}
			});
		});
	}
	
	function deleteNote(id, rev) {
		var doc = {
			_id: ""+ id +"",
			_rev: ""+ rev +""
		};
		$.couch.db("notebuddy").removeDoc(doc, {
			success: function(data) {
				// log out data to see if its working 
				console.log(data);
				$('#viewNotes').trigger("create");
			}
		});
	}
	
});









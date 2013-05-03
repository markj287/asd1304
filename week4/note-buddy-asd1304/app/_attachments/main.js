$('#newNote').on('pageinit', function (){
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
		content = $('#content');
		category = $('#category');
			
	function storeData() {
		var note				= {};
			note._id			= ("note" + $.now());
			note.title			= title.val();
			note.content		= content.val();
			note.category		= category.val();
			
		$.couch.db("notebuddyapp").saveDoc(note, {
			success: function(data) {
				console.log(data);
			}
		});
		alert("Note Saved!");
		$.mobile.changePage('#notes');
		window.location.reload();
	}
	
});

$('#notes').on("pageinit", function() {
	$.couch.db("notebuddyapp").view("notebuddy/notes", {
		success: function(data) {
			$("#noteList").empty();
			$.each(data.rows, function(index, notes) {
				var key = notes.key
					title = notes.value.title
					content = notes.value.content
					category = notes.value.category
					id = notes.id
					rev = notes.value.rev
				$(''+
					'<div id="'+ id +'" data-role="collapsible" data-content-theme="e">'+
						'<h3>'+ key +'</h3>'+
						'<p>Title: '+ title +'</p>'+
						'<p>Content: '+ content +'</p>'+
						'<p>Category: '+ category +'</p>'+
						'<li><a class="editLink" data-role="button" data-inline="true" data-theme="b" href="#newNote" data-mini="true">Edit</a>'+
						'<a class="deleteLink" data-role="button" data-inline="true" data-theme="b" href="#" data-mini="true">Delete</a>'+
						'</li>'+
					'</div>'
				).appendTo('#noteList');
				titleItemLinks(id, rev);
			});
		$('#noteList').trigger("create");
		}
	});
	function titleItemLinks(id, rev) {
		var deleteLink = $('#'+ id +' .deleteLink');
		deleteLink.on("click", function() {
			var ask = confirm("Are you sure you want to delete this note.");
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
			$.couch.db("notebuddyapp").openDoc(id, {
			    success: function(note) {
				    $.mobile.changePage('#newNote');
					console.log(note.category);
					
					//populate form fields with current values
					$('#title').val(''+ note.title);
					$('#content').val(''+ note.content);
					$("#category option[value=" + note.category +"]").attr("selected","selected");
					$('#category').selectmenu('refresh', true);
				
					//Change submit button value to edit button
					$('#headerBar').html('Edit Saved Note');
					$('#submit').val('Edit Saved Note');
					var editSubmit = $('#submit');
					
					editSubmit.on("click", function(){
						var title = $('#title');
							content = $('#content');
							category = $('#category');
				
						var note			= {};
							note._id		= id;
							note._rev		= rev;
							note.title		= title.val();
							note.content	= content.val();
							note.category	= category.val();
						
						console.log(note);
						
						$.couch.db("notebuddyapp").saveDoc(note, {
						    success: function(data) {
						        console.log(data);
						    }
						});	
						
						alert("Note Updated!");
						$.mobile.changePage('#notes');
						window.location.reload();
							
					
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
		$.couch.db("notebuddyapp").removeDoc(doc, {
			success: function(data) {
				console.log(data);
				$('#notes').trigger("create");
			}
		});
	}
	
});





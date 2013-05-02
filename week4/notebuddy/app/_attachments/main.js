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
		var display = getCheckboxValue();
		var item			= {};
			item._id		= ("note" + $.now());
			item.title		= title.val();
			item.selectCat	= selectCat.val();
			item.dadded		= dadded.val();
			item.where		= where.val();
			item.favorite	= favorite;
			item.display	= display;
			item.amount		= amount.val();
			itme.notes		= notes.val();
			
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









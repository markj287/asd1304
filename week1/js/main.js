// Mark Johnson
// ASD 1304

$('#home').on('pageinit', function(){

});

$('#additem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#noteForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			alert("Required fields missing!");
			},
			submitHandler: function() {
		var data = $(".myForm").serializeArray();
			storeData(data);
		}
	});
	
	$('#reset').click(function() {
   	$('#amount').val('1').slider('refresh');
    	$('#selectCat').val('selection').selectmenu('refresh');
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
	for(var n in json){
	    var id = Math.floor(Math.random()*100000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
};
let deleteUrl = contextPath + "admin/map/usereventgrouppermission/delete";
let g_tableId = "#userEventGroupPermissionTableId";

function createDateFormatter(data, type, full) {
	return full.createDateStr;
}
function expireDateFormatter(data, type, full) {
	return full.expireDateStr;
}

$("#userId").on("change", function (e) {
	$("#search-button").click();
});

$("#layerId").on("change", function (e) {
	$("#search-button").click();
});

$("#eventGroupId").on("change", function (e) {
	$("#search-button").click();
});

var options = $('#eventGroupId option');
$("#layerId").on("change", function(){	

	var layerId = $(this).val();	
	var optionsList = $('#eventGroupId option');
	
	let eventGroupFilterUrl = "admin/map/usereventgrouppermission/eventGroupFormFilter/"
	$.post(eventGroupFilterUrl, {layerId: layerId})
	.fail(function (xhr) {
		xhr.state = false;
		console.error(xhr);
		xhr.description = lang.get("label.unknown.error");
		xhr.redirectUrl = null;
	})
	.always(function (response) {
		
		let unremoveList = [];
		$.each(response.data, function(key, data){
			
			unremoveList.push(data);
		});
		
		for(var i = 1; i<optionsList.length; i++){												
			optionsList[i].remove();
		}
		
		for(var j = 0; j<unremoveList.length; j++){			
			$('#eventGroupId').append('<option value='+unremoveList[j].id+' >'+unremoveList[j].name+'</option>')			
		}		
	});
});


let $editModal = $('#editModal');

var options = $('#modalLayerId option');
$("#modalUserId").on("change", function(){	
	
	var modalUserId = $(this).val();	
	var optionsList = $('#modalLayerId option');	
	
	let layerFilterUrl = "admin/map/usereventgrouppermission/layerFilter/"
	$.post(layerFilterUrl, {userId: modalUserId})
	.fail(function (xhr) {
		xhr.state = false;
		console.error(xhr);
		xhr.description = lang.get("label.unknown.error");
		xhr.redirectUrl = null;
	})
	.always(function (response) {
		
		let unremoveList = [];
		$.each(response.data, function(key, data){
			
			unremoveList.push(data);
		});
		
		for(var i = 1; i<optionsList.length; i++){												
			optionsList[i].remove();
		}
		
		for(var j = 0; j<unremoveList.length; j++){			
			$('#modalLayerId').append('<option value='+unremoveList[j].id+' >'+unremoveList[j].name+'</option>')			
		}		
	  });
  });


var options = $('#modalEventGroupId option');
$("#modalLayerId").on("change", function(){	

    var modalUserId = $("#modalUserId").val();
	var modalLayerId = $(this).val();	
	var optionsList = $('#modalEventGroupId option');
	
	let eventGroupFilterUrl = "admin/map/usereventgrouppermission/eventGroupFilter/"
	$.post(eventGroupFilterUrl, {layerId: modalLayerId, userId:modalUserId})
	.fail(function (xhr) {
		xhr.state = false;
		console.error(xhr);
		xhr.description = lang.get("label.unknown.error");
		xhr.redirectUrl = null;
	})
	.always(function (response) {
		
		let unremoveList = [];
		$.each(response.data, function(key, data){
			
			unremoveList.push(data);
		});
		
		for(var i = 1; i<optionsList.length; i++){												
			optionsList[i].remove();
		}
		
		for(var j = 0; j<unremoveList.length; j++){			
			$('#modalEventGroupId').append('<option value='+unremoveList[j].id+' >'+unremoveList[j].name+'</option>')			
		}		
	  });
  });




let $saveBtn = $("#editModal #layer-save-btn");
$saveBtn.on("click", function (e) {
	
	let modalData = $('#editModal *').serializeArray();
	
	custombox.confirm(lang.get("label.are.you.sure.want.to.save"), function (result) {
		if (result) {
			
			$.post(contextPath + "admin/map/usereventgrouppermission/save", modalData)
			.fail(function (xhr) {
				xhr.state = false;
				console.error(xhr);
				xhr.description = lang.get("label.unknown.error");
				xhr.redirectUrl = null;
			})
			.always(function (data) {
				
				if (data.state) {
					
					$editModal.modal("hide");
					custombox.alertSuccess(data.description);
						
									
									
				} else {
					
					custombox.alertError(data.description ? data.description : lang.get("label.unknown.error"));
									
				
				}
				
			});
		}
	});
	
});

function deleteItem(elem) {
	
	let $this = $(elem);
	let dataId = $this.data("id");
	if (!(dataId && Number.isInteger(dataId))) {
		custombox.alertError(lang.get("label.ThisRecordCannotBeDeleted.PleaseTryAgain"));//TODO:lang
		dataTableUtility.tableStandingRedraw(g_tableId);
		return;
	}
	
	$.post(deleteUrl, {userEventGroupPermissionId: dataId})
	.fail(function (xhr) {
		xhr.state = false;
		console.error(xhr);
		xhr.description = lang.get("label.unknown.error");
		xhr.redirectUrl = null;
	})
	.always(function (response) {
		
		if (!response.state) {
			
			custombox.alertError(response.description ? response.description : lang.get("label.unknown.error"));
		}
		
		dataTableUtility.tableStandingRedraw(g_tableId);
	});
}


$editModal.on('show.bs.modal', function (event) {
	
	let button = $(event.relatedTarget);
	let type = button.data("type");
	let modal = $(this);
	modal.clearForm(true);
	
	$('#modalUserId').val(null).trigger('change');
	$('#modalLayerId').val(null).trigger('change');
	
	let title;
	
	if (type === "add") {
		
		title = lang.get("label.userEventGroupPermission.add");
		
	} else {
		
		let data = jQuery.data(button[0], "response-data");
		
		if (!data || !(data.id && Number.isInteger(data.id))) {
			custombox.alertError(lang.get("label.thisRecordCannotBeUpdated.PleaseTryAgain"));//TODO:lang
			modal.data("will-hide", true);
			return;
		}
		
		modal.find('input#id').val(data.id);	
		modal.find('select#modalLayerId').val(data.modalLayerId).trigger('change');		
		modal.find('select#modalUserId').val(data.modalUserId).trigger('change');
		title = lang.get("label.userEventGroupPermission.edit");
	}
	
	modal.find('.modal-title').text(title);
	
});

$editModal.on("hidden.bs.modal", function () {
	//clears datas
	let modal = $(this);
	modal.clearForm(true);//includeHidden = true
	dataTableUtility.tableStandingRedraw(g_tableId);
});

$editModal.on('shown.bs.modal', function (event) {
	//açıldıktan sonra kapatabiliyoruz sadece
	if ($(this).data("will-hide")) {
		$(this).modal("hide");
	}
});

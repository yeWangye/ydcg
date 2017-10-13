var page = {
	now: 1,
	pageCount ,
	dom: function(pageCount) {
		var _html = "";
		for(var i = 1; i <= pageCount; i++) {
			_html += '<li class="paginate_button">' +
				'<a href="#" aria-controls="DataTables_Table_0" data-dt-idx="' + i + '" tabindex="0">' + i + '</a>' +
				'</li>';
		}
		var needHtml = '<li class="paginate_button previous disabled" id="DataTables_Table_0_previous">' +
			'<a href="#" aria-controls="DataTables_Table_0" tabindex="0">上一页</a>' +
			'</li>' +
			_html +
			'<li class="paginate_button next" id="DataTables_Table_0_next">' +
			'<a href="#" aria-controls="DataTables_Table_0" tabindex="0">下一页</a>' +
			'</li>';
		$(".pagination")[0].innerHTML += needHtml;
	}
	init: function(pageCount,) {
		var _this=this;
		_this.dom(pageCount);
		_this.addClass(_this.now);
	},
	addClass: function() {
		for(var i=1;i<=pageCount;i++){
			
		}
		$(".paginate_button a").attr("data-dt-idx")
	},
	reMoveClass: function() {

	}
	nextPage: function() {

	},
	lastPage: function() {

	},
	toPage: function() {

	}
}
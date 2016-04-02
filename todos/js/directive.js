(function(angular){
	'use strict';
	var todoApp= angular.module('todoApp');
	todoApp.directive('autoFocus',[function(){
		return {
			link: function(scope,element,attributes){
element.on('dblclick',function(){
	angular.element(this).find('input').eq(1)[0].focus();
})
			}
		}
	}])
})(angular)

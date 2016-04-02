(function(angular){
	var todoApp = angular.module("todoApp");
	function getId() {
      return Math.random()
    };
	//定义一个控制器
todoApp.controller('mainContrl', [
	'$scope',
	'$location',
	'Storage',
	function($scope, $location, Storage){
      $scope.input = "";
      $scope.currentEditingId = 0;
      $scope.todos = Storage.get();
      //新增任务操作
      $scope.add = function(){
      	//此方法会在用户敲回车时触发
      	if(!$scope.input) return;//屏蔽用户不输入内容就敲回车的情况

         //$scope.todos.push({id:getId(), text:$scope.input, completed:false})
         Storage.add($scope.input);//添加到todos并且存储起来
         $scope.input = "";
      };
      //删除单个选项
      $scope.remove = Storage.remove;
      //获取有没有已经完成的元素，确定下标显示或者隐藏
      $scope.hasCompleted = Storage.hasCompleted;
      //function(){
      // 	var hasCompleted = false;
      // 	//every 和some和forEach都是遍历数组
      // 	//every 是满足一个
      // 	//some是满足多个
      // 	return $scope.todos.some(todo=>todo.completed);
      // };
      //清空 所有已完成的
      //不能在循环中移除或者新增数组元素
      $scope.clearCompleted = function(){
      	var temp = Storage.clearCompleted()
      	$scope.todos = temp;
      	//定义一个空数组
      	// var unCompleteds = [];
       //  $scope.todos.forEach(todo=>{
       //  	if(!todo.completed){
       //  		//未完成的添加到数组里
       //  		unCompleteds.push(todo);
       //  	}
       //  });
       //  //重新定义todos数组的内容
       //  $scope.todos = unCompleteds;
      };
      //全部完成 全选
      $scope.checkedAll = false;
      $scope.allCompleted = function(){
      	Storage.allCompleted($scope.checkedAll);
      // $scope.todos.forEach(todo=>{
      // 	todo.completed = $scope.checkedAll
      // });
      };
      //双击编辑操作
      $scope.edit = function(current){
      	$scope.currentEditingId = current.id;
      };
      //失去焦点保存
      $scope.save = function(){
      	$scope.currentEditingId = 0;
      	Storage.save();
      };
      //筛选问题
      $scope.filterData = {};

      $scope.location = $location;
      //watch 只能监视scope上的成员，所以把$location挂载到scope上
       $scope.$watch('location.url()',function(now,old){
       	 switch(now) {
      	case '/completed':
      	$scope.filterData = { completed: true };
      	break;
      	case '/active':
      	$scope.filterData = { completed: false };
      	break
      	default: $scope.filterData = {};
      	break;
      };

       })
       //在页面加载完过后获取当前的锚点值
      //var url = $location.url();


      // $scope.changeFilter = function(newFilter){
      //    $scope.filterData = newFilter;
      // }
   }]);
})(angular);

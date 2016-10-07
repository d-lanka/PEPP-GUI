var app = angular.module('pepp-app', ['ngRoute', 'pepp.templates', 'pepp-module-all']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/tab/:name?', {
			templateUrl: 'tabs/home.html'
		})
		.otherwise({
			redirectTo: '/'
		})

});
angular.module('main-tabs', []);

angular.module('pepp-module-all', ['main-tabs']);
(function (module) {
	module.service('HomeService', function ($q, $http) {
		var deferred = $q.defer();

		this.get = function (url) {
			$http.get(url, config)
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function (data, status, headers, config) {
					deferred.reject(data);
				});
			return deferred.promise;
		};

		this.post = function (url, data, config) {
			$http.post(url, data, config)
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function (data, status, headers, config) {
					deferred.reject(data);
				});

			return deferred.promise;
		};
	});
})(angular.module('main-tabs'));
(function (module) {
	module.controller('TabsCtrl', function ($scope, $window, HomeService) {

		$scope.currentTab = 'BasicConfig';
		$scope.isFileCreated = false;
		$scope.datadataCollection = {};
		$scope.tabs = [{
				title: 'BasicConfig',
				url: 'one.tpl.html'
			},
			{
				title: 'DataCollection',
				url: 'two.tpl.html'
			},
			{
				title: 'Calls',
				url: 'two.tpl.html'
			},
			{
				title: 'Validate',
				url: 'two.tpl.html'
			},
			{
				title: 'Execute',
				url: 'three.tpl.html'
			}];

		// Handling tab
		$scope.onClickTab = function (tab) {
			$scope.currentTab = tab.title;
		};

		$scope.setTab = function (newTab) {
			$scope.tab = newTab;
		};

		$scope.isSet = function (tabNum) {
			return $scope.tab === tabNum;
		};

		$scope.isActiveTab = function (tabTitle) {
			return ($scope.currentTab == tabTitle);
		};

		// Form submit
		$scope.saveConfigData = function ($event, formIsValid) {
			$event.preventDefault();
			if (formIsValid) {
				var url = 'http://localhost:8091/config/dataCollection'
				HomeService.post(url, $scope.dataCollection).then(function (response) {
					if (response === 'OK') {
						$scope.isFileCreated = true;
					}
				}).catch(function (exception) {
					console.log(exception);
				});
			}
		};

		$scope.downloadConfigFile = function () {
			var url = 'http://localhost:8091/config/file?fileName=' + $scope.dataCollection.fileName;
			$window.open(url, '_blank');
		};
	});
})(angular.module('main-tabs'));

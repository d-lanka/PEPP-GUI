(function (module) {
    module.controller('TabsCtrl', function ($scope, $window, HomeService) {

        $scope.currentTab = 'BasicConfig';
        $scope.isFileCreated = false;
        $scope.datadataCollection = {};
        $scope.tabs = [{ title: 'BasicConfig', url: 'one.tpl.html' },
            { title: 'DataCollection', url: 'two.tpl.html' },
            { title: 'Calls', url: 'two.tpl.html' },
            { title: 'Validate', url: 'two.tpl.html' },
            { title: 'Execute', url: 'three.tpl.html' }];

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
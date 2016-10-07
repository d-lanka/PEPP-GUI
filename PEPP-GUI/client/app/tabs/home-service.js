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
//Selectionner data dans la BDD


var app = angular.module("myapp", ['ngRoute']);

//controller liste candidat

app.controller('listeCandidats', function ($http, $scope) {
    $http({
        method: "GET",
        url: "http://localhost/projet_test/database/lesCandidats.php",
        headers: {
            'Accept': '*.*',
            'Content-Type': 'application/json'
        }
    }).then(function onSuccess(response) {
        $scope.lescandidats = response.data.mydb;
        console.log(response)

    }).catch(function onError(response) {
        // Handle error
        console.warn("error getting data");
        console.log(response)
    });

})
//controller select candidat

    .controller('unCandidat', function ($http, $scope, $routeParams) {
        $http({
            method: "GET",
            url: "http://localhost/projet_test/database/select.php",
            headers: {
                'Accept': '*.*',
                'Content-Type': 'application/json'
            },
            params: {"idcandid": $routeParams.idcandid},
        }).then(function onSuccess(response) {
            $scope.Candidat = response.data.mydb;
            console.log(response)

        }).catch(function onError(response) {
            // Handle error
            console.warn("error getting data");
            console.log(response)
        });
    })


    //controller diplomes

    .controller('diplomes',function ($http,$scope,$routeParams) {
        $http({
            method:"GET",
            url:"http://localhost/projet_test/database/SelectDiplome.php",
            headers:{
                'Accept': '*.*',
                'Content-type': 'application/json'
            },
            params: {"idcandid":$routeParams.idcandid},
        }).then(function onSuccess (response){
            $scope.lesdiplomes= response.data.mydb;
            console.log(response)

        }).catch(function onError (response){
            //Handle error
            console.warn("error getting data");
            console.log(response)
        });
    })


    //controller experience professionnelle

    .controller('xpro',function ($http,$scope,$routeParams) {
        $http({
            method:"GET",
            url:"http://localhost/projet_test/database/SelectXpro.php",
            headers:{
                'Accept': '*.*',
                'Content-type': 'application/json'
            },
            params: {"idcandid":$routeParams.idcandid},
        }).then(function onSuccess (response){
            $scope.lesxpros= response.data.mydb;
            console.log(response)

        }).catch(function onError (response){
            //Handle error
            console.warn("error getting data");
            console.log(response)
        });
    })

    //controller competences

    .controller('competences', function ($http, $scope, $routeParams) {
        $http({
            method: "GET",
            url: "http://localhost/projet_test/database/SelectCompetences.php",
            headers: {
                'Accept': '*.*',
                'Content-Type': 'application/json'
            },
            params: {"idcandid": $routeParams.idcandid},
        }).then(function onSuccess(response) {
            $scope.lescompetences = response.data.mydb;
            console.log(response)

        }).catch(function onError(response) {
            // Handle error
            console.warn("error getting data");
            console.log(response)
        });
    })

        //controller langues

    .controller('langue', function ($http, $scope, $routeParams) {
        $http({
            method: "GET",
            url: "http://localhost/projet_test/database/SelectLangues.php",
            headers: {
                'Accept': '*.*',
                'Content-Type': 'application/json'
            },
            params: {"idcandid": $routeParams.idcandid},
        }).then(function onSuccess(response) {
            $scope.leslangues = response.data.mydb;
            console.log(response)

        }).catch(function onError(response) {
            // Handle error
            console.warn("error getting data");
            console.log(response)
        });
    })




    //Update-editer un champs

    .controller('operationUtilisateur', function ($http, $scope, $location) {
        $scope.consulterCandidat = function ($parameter) {
            console.log($parameter);
            $location.url('/unCandidat/' + $parameter);
        };
        $scope.modifier = function () {
            $http({
                method: "POST",
                url: "http://localhost/projet_test/database/Update.php",
                headers: {
                    'Accept': '*.*',
                    'Content-Type': 'application/json'
                },
                data: {"candidat": $scope.Candidat},

            }).then(function onSuccess(response) {
                $scope.lescandidats = response.data.mydb;

                console.log(response)

            }).catch(function onError(response) {
                // Handle error
                console.warn("error getting data");
                console.log(response)
            });
        };
    });


//routes

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/lescandidats.html',
            })
            .when('/candidats', {
                templateUrl: 'templates/lescandidats.html',
            })
            .when('/unCandidat/:idcandid', {
                templateUrl: 'templates/unCandidat.html',
            });

    }]);

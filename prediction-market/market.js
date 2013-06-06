angular.module('market', []).config(function($routeProvider) {
    $routeProvider
        .when('/', { controller: Main, templateUrl: 'main.html' })
        .otherwise({ redirectTo: '/' });
});

function Main($scope) {
    $scope.message = 'hello';

    $scope.predictions = [
        {
            title: 'Навальному вынесут приговор до 1 июня',
            bets: [
                { user: 'kkapp', value: 20 },
                { user: 'mmcleric', value: 25 },
                { user: 'andrewkhitry', value: 10 },
                { user: 'tobe', value: 20 },
                { user: 'ropewalker', value: 10 }
            ],
            outcome: false
        }
    ];

    var users = _.uniq(
        _.flatten(
            _.map($scope.predictions, function(prediction) {
                return _.map(prediction.bets, function(bet) {
                    return bet.user;
                })
            })
        )
    );

    var user2score = {};
    _.each(users, function(user) {
        user2score[user] = 0;
    });

    _.each($scope.predictions, function (prediction) {

        _.reduce(prediction.bets, function (memo, bet) {
            var memoValue = memo.value;
            var value = bet.value;
            if (!prediction.outcome) {
                memoValue = 100 - memoValue;
                value = 100 - value;
            }

            var score = Math.round(100 * (Math.log(value) - Math.log(memoValue)) / Math.log(2));
            user2score[memo.user] -= score;
            user2score[bet.user] += score;
            return bet;
        });

    });

    console.log(user2score);

    $scope.users = users;
    $scope.user2score = user2score;
}

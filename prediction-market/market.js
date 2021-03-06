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
        },
        {
            title: 'Star Trek Into Darkness соберет $250M к 10-му июня',
            bets: [
                { user: 'mmcleric', value: 70 },
                { user: 'kkapp', value: 90 },
                { user: 'ropewalker', value: 70 }
            ],
            outcome: false
        },
        {
            title: 'Навальному вынесут обвинительный приговор 18 июля 2013',
            bets: [
                { user: 'bessarabov', value: 51 },
                { user: 'mmcleric', value: 75 },
                { user: 'ropewalker', value: 60 }
            ],
            outcome: true
        },
        {
            title: 'Armikrog соберёт > $2m',
            bets: [
                { user: 'kkapp', value: 90 },
                { user: 'andrewkhitry', value: 70 },
                { user: 'payalnik', value: 60 },
                { user: 'mmcleric', value: 20 },
                { user: 'mazoo', value: 25 },
                { user: 'mmcleric', value: 1 }
            ],
            outcome: false
        },
        {
            title: 'Кипяченая вода зацветет к 10-му августа',
            bets: [
                { user: 'mmcleric', value: 20 },
                { user: 'bessarabov', value: 99 }
            ],
            outcome: false
        },
        {
            title: 'Гермиону воскресят к концу 96-й главы HPMoR',
            bets: [
                { user: 'elspet', value: 40 },
                { user: 'andrewkhitry', value: 1 }
            ],
            outcome: false
        },
        {
            title: 'Андрей Хитрый хотя бы один раз был в очках на встрече LW или созвоне старейшин',
            bets: [
                { user: 'varman', value: 30 },
                { user: 'mmcleric', value: 60 },
                { user: 'bt2901', value: 75 }
            ],
            outcome: true
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

    $scope.users = users;
    $scope.user2score = user2score;
}

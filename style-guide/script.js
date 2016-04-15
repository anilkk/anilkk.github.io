// Code goes here

angular.module('app', ['ngAnimate', 'ui.bootstrap'])
    .controller('styleguideCntl', function($scope, $location) {
        $scope.bgColors = $location.search()['bgc'].split(',');
        $scope.tColors = $location.search()['tc'].split(',');
    })
    .config(['$tooltipProvider', function($tooltipProvider) {
        $tooltipProvider.setTriggers({
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur',
            'never': 'mouseleave' // <- This ensures the tooltip will go away on mouseleave
        });
    }])
    .directive('colorPreview', function($timeout) {
        return {
            replace: true,
            scope: {
                bgColor: '='
            },
            controller: function($scope) {
                $scope.isTooltipOpen = false;
                $scope.getColorStyle = function() {
                    return '#' + $scope.bgColor;
                };

                $scope.selectColor = function($event) {

                };
                $scope.openTooltip = function($event) {

                    $timeout(function() {
                        $scope.isTooltipOpen = false;
                    }, 2000);
                };
            },
            templateUrl: 'colorPreview.html'
        }
    })
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function() {
        var clipboard = new Clipboard('.color-preview');

        clipboard.on('success', function(e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    });

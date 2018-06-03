var DemoApp1 = angular.module('DemoApp1', ['dx']);

DemoApp1.controller('DemoController1', function DemoController1($scope) {
    $scope.chartOptions = {
        size: {
            width: 500
        },
        palette: "bright",
        dataSource: dataSource,
        series: [
            {
                argumentField: "country",
                valueField: "area",
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1
                    }
                }
            }
        ],
        title: "Area of Countries",
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            var point = e.target;
    
            toggleVisibility(point);
        },
        onLegendClick: function (e) {
            var arg = e.target;
    
            toggleVisibility(e.component.getAllSeries()[0].getPointsByArg(arg)[0]);
        }
    };
    
    function toggleVisibility(item) {
        if(item.isVisible()) {
            item.hide();
        } else { 
            item.show();
        }
    }
});

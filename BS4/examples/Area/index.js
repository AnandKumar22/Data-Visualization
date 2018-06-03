var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.currentType = type[0];

    $scope.chartOptions = {
        palette: "Harmony Light",
        dataSource: dataSource,
        commonSeriesSettings: {
            argumentField: "country"
        },
        series: [
            { valueField: "y1564", name: "15-64 years" },
            { valueField: "y014", name: "0-14 years" },
            { valueField: "y65", name: "65 years and older" }
        ],
        margin: {
            bottom: 20
        },
        title: "Population: Age Structure (2000)",
        argumentAxis: {
            valueMarginsEnabled: false
        },
        "export": {
            enabled: true
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        bindingOptions: {
            "commonSeriesSettings.type": "currentType"
        }
    };

    $scope.typesOptions = {
        dataSource: types,
        bindingOptions: {
            value: "currentType"
        }
    };

     $scope.chartOptions1 = {
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

    /*Bar Graph */
    $scope.chartOptions3 = {
        dataSource: populationData,
        legend: {
            visible: false
        },
        series: {
            type: "bar"
        },
        argumentAxis: {
            tickInterval: 10,
            label: {
                format: {
                    type: "decimal"
                }
            }
        },
        title: "World Population by Decade"
    };

    /*Line Graph*/
    $scope.chartOptions4 = {
        palette: "violet",
        dataSource: dataSource_line,
        commonSeriesSettings: {
            argumentField: "country"
        },
        bindingOptions: { 
            "commonSeriesSettings.type": "currentType"
        },
        margin: {
            bottom: 20
        },
        argumentAxis: {
            valueMarginsEnabled: false,
            discreteAxisDivisionMode: "crossLabels",
            grid: {
                visible: true
            }
        },
        series: [
            { valueField: "hydro", name: "Hydro-electric" },
            { valueField: "oil", name: "Oil" },
            { valueField: "gas", name: "Natural gas" },
            { valueField: "coal", name: "Coal" },
            { valueField: "nuclear", name: "Nuclear" }
        ],
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            itemTextPosition: "bottom"
        },
        title: { 
            text: "Energy Consumption in 2004",
            subtitle: {
                text: "(Millions of Tons, Oil Equivalent)"
            }
        },
        "export": {
            enabled: true
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.valueText
                };
            }
        }
    };
    
    $scope.typesOptions = {
        dataSource: types,
        bindingOptions: { 
            value: "currentType"
        }
    };

   /* Variable number of Bars */
   $scope.products = products;
    
    $scope.productsToValues = function() {
        $scope.activeProducts = [];
        $scope.products.forEach(function (item){
            if(item.active)
                $scope.activeProducts.push(item.count);
        });
    };

    $scope.productsToValues();
    
    $scope.barGaugeOptions = {
        bindingOptions: {
            values: "activeProducts"
        },
        startValue: 0,
        endValue: 50,
        label: {
            format: {
                type: "fixedPoint",
                precision: 0
            }
        }
    };

   /*Dynamic Series*/
    $scope.chartOptions5 = {
        palette: "violet",
        dataSource: multiple_dataSource,
        commonSeriesSettings: {
            argumentField: "country",
            valueField: "oil",
            type: "bar"
        },
        seriesTemplate: {
            nameField: "year",
            customizeSeries: function(valueFromNameField) {
                return valueFromNameField === 2009 ? { type: "line", label: { visible: true }, color: "#ff3f7a" } : {};
            }
        },
        title: { 
            text: "Oil Production",
            subtitle: {
                text: "(in millions tonnes)"
            }
        },
        "export": {
            enabled: true
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        }
    };

   /* Double Pie */
   var legendSettings = {
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center',
        itemTextPosition: 'right',
        rowCount: 2
    },
        seriesOptions = [{
            argumentField: "name",
            valueField: "area",
            label: {
                visible: true,
                format: "percent"
            }
        }],
        sizeGroupName = "piesGroup";

    $scope.countriesAreaChartOptions = {
        dataSource: multiple_countries,
        sizeGroup: sizeGroupName,
        title: "Area of Countries",
        palette: "Soft",
        legend: legendSettings,
        series: seriesOptions
    };

    $scope.landWaterRationChartOptions = {
        sizeGroup: sizeGroupName,
        title: "Water/Land Ratio",
        legend: legendSettings,
        palette: "Soft Pastel",
        dataSource: waterLandRatio,
        series: seriesOptions
    };
});

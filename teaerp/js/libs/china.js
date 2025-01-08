(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports, require('echarts'));
    } else {
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var map = {
        "type": "FeatureCollection",
        "features": [
            {
                "id": "110000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["..."] // 这里是具体的地图数据
                },
                "properties": {
                    "cp": [116.405285, 39.904989],
                    "name": "北京",
                    "childNum": 1
                }
            },
            // ... 其他省份的数据
        ]
    };

    echarts.registerMap('china', map);
})); 
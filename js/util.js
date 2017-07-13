var woeid = {
	kl : '1154781',
	jb: '1154698',
	ml: '1154903',
	kc: '91799332',
	pg: '91799345'
};

var URL = 'https://query.yahooapis.com/v1/public/yql?q=';

var app = angular.module("weather", []); 	
app.controller('wController', function($scope,$http) {

  	$scope.temp = {
   	 	unit: 'C',
    	city: 'kl'
  	};

  	var yql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where woeid="' + woeid.kl + '") and u="c"';

  	$http.get(URL+yql+'&format=json').then(function(response) {

        $scope.weatherData = response.data.query.results.channel;
        console.log($scope.weatherData);
        
        var link = $scope.weatherData.link;
        link = link.split('*')[1];
        $scope.attrLink = link;
        $scope.weatherData.item.condition.img = getImgName($scope.weatherData.item.condition.code);

        for(var i=0; i<$scope.weatherData.item.forecast.length; i++) {
        	var n = getImgName($scope.weatherData.item.forecast[i].code);
           	$scope.weatherData.item.forecast[i].img_name = n;
        }
        
    });
    
});

function initApp(){

	
}

function getImgName(c){
	
	var img_name;
	switch (c) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '37':
		case '38':
		case '39':
		case '45':
		case '47':
			img_name = 'thunder';
			break;

		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '10':
		case '11':
		case '12':
		case '17':
		case '18':
		case '19':
		case '20':
		case '21':
		case '22':
		case '23':
		case '35':
		case '40':
			img_name = 'rain';
			break;

		case '24':
		case '25':
		case '26':
		case '27':
		case '28':
		case '29':
		case '30':
		case '44':
			img_name = 'cloud';
			break;

		case '31':
		case '32':
		case '33':
		case '34':
		case '36':
			img_name = 'sun';
			break;

		case '13':
		case '14':
		case '15':
		case '16':
		case '41':
		case '42':
		case '43':
		case '46':
			img_name = 'snow';
			break;

		default:
			img_name = 'cloud';
			break;
	}

	return img_name;
}


function celciusToFahrenheit(c) {
	return Math.round(c*1.8+32);
}
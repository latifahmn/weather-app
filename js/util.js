var URL = 'https://query.yahooapis.com/v1/public/yql?q=';

var app = angular.module("weather", []); 	
app.controller('wController', function($scope,$http) {

  	$scope.temp = {
   	 	unit: 'C',
    	city: 'kl'
  	};

  	$scope.cities = {
  		kl: { woeid: '1154781', name: 'kl', text: 'Kuala Lumpur'},
  		jb: { woeid: '1154698', name: 'jb', text: 'Johor Baharu'},
  		ml: { woeid: '1154903', name: 'ml', text: 'Melaka'},
  		kc: { woeid: '91799332', name: 'kc', text: 'Kuching'},
  		pg: { woeid: '91799345', name: 'pg', text: 'Penang'}};   

    $scope.getWeatherData = function(w,u) {

    	var yql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where woeid="' + w + '") and u="'+u+'"';

  		$http.get(URL+yql+'&format=json').then(function(response) {

  			$scope.heroStyle = { 'opacity': '0'};
  			$scope.heroStyle = { 'opacity': '1'};

  			$('.hero img').fadeOut(500, function() {
  				$('.hero img').attr("src","");
		        $('.hero img').attr("src","images/"+ $scope.temp.city + ".jpg");
		        
		    });
		    $( ".hero img" ).fadeIn( 1000, "linear" );

  			$scope.weatherData = response.data.query.results.channel;
	        //console.log($scope.weatherData);

	        $scope.weatherData.astronomy.sunrise = formatTime($scope.weatherData.astronomy.sunrise);
	        $scope.weatherData.astronomy.sunset = formatTime($scope.weatherData.astronomy.sunset);

	        var link = $scope.weatherData.link;
	        link = link.split('*')[1];
	        $scope.weatherData.link = link;

	        $scope.weatherData.item.condition.img = getImgName($scope.weatherData.item.condition.code);

	        for(var i=0; i<$scope.weatherData.item.forecast.length; i++) {

	        	var n = getImgName($scope.weatherData.item.forecast[i].code);
	           	$scope.weatherData.item.forecast[i].img_name = n;
	           	$scope.weatherData.item.forecast[i].day = formatDay($scope.weatherData.item.forecast[i].day);
	        }
        
    	});
    	
    }

    $scope.updateCity = function(cn) {    	
        $scope.getWeatherData($scope.cities[cn].woeid,$scope.temp.unit);
    };

    $scope.updateTemp = function(u) {
    	u = u.toLowerCase();
    	$scope.getWeatherData($scope.cities[$scope.temp.city].woeid,$scope.temp.unit);
    }

    $scope.getWeatherData($scope.cities.kl.woeid,"c");
    
});

function formatDay(d){
	var day;
	d = d.toLowerCase();
	switch (d) {
		case 'fri':
			day = 'Friday';
			break;
		case 'sat':
			day = 'Saturday';
			break;
		case 'sun':
			day = 'Sunday';
			break;
		case 'mon':
			day = 'Monday';
			break;
		case 'tue':
			day = 'Tuesday';
			break;
		case 'wed':
			day = 'Wednesday';
			break;
		case 'thu':
			day = 'Thursday';
			break;		
	}

	return day;

}

function formatTime(t){
	
	var t = t.split(" ");
	var c = t[0].split(":");
	if (c[1].length < 2){
		c[1] = '0'+c[1];
	}
	return c[0]+ ':' +c[1]+' ' +t[1];
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
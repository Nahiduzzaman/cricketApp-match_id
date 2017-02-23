(function (angular) {
'use strict';

	angular.module('cricketApp')
	    .controller('startController', constructor);
	    	constructor.$inject = ['StatisticService','$scope','$timeout'];
	    	function constructor(StatisticService,$scope,$timeout) {
	    		var vm = this;
	        	vm.game = {
		     		country1: 'Bangladesh',
		     		country2: 'India',     		
		     		to_bowl: null
		     	};

		     	vm.setGame = function(game){
		     		if(game.to_bowl == game.country1){
				  		game.to_bat = game.country2;
				  	}else{
				  		game.to_bat = game.country1;
				  	}
				  	console.log(game);
				  	StatisticService.setMatch_id();
					localStorage.setItem("teamData", JSON.stringify(game));
		     	}

		     	vm.showCoin = true;
		     	vm.hideTossButton = false;

			    vm.coinToss = function (game) {
			    	 var countryArray = [ game.country1, game.country2 ];
			    	 game.to_bowl = countryArray[Math.floor(Math.random() * countryArray.length)];
			    	 console.log('game',game);
			    	 vm.country_to_bowl = game.to_bowl; 			    	 
			    	 vm.hideTossButton = true;
			         vm.showCoin=false; 
			         $timeout(function () {
			          	vm.showCoin = true;
			          	vm.showTossResult = true; 
			         }, 2200);   
			    };
	    	}

})(window.angular);
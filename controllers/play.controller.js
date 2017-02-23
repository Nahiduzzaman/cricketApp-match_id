(function(angular) {
'use strict';
	
	angular.module('cricketApp')
		.controller('playController', constructor);
		    constructor.$inject = ['$stateParams','StatisticService','$scope','$window','$state'];
		    function constructor($stateParams,StatisticService,$scope,$window,$state) {
		    	var vm = this;
		    	var gameData = [];
		    	var allmatchData = [];
		    	var lastMatchData = [];
		        vm.resetData = function(){
		            console.log('removeItem');
		            localStorage.removeItem("gameData");
		            localStorage.removeItem("teamData");
		            $window.location.reload();
		        }
		      	
		      	vm.teamData = JSON.parse(localStorage.getItem("teamData"));
		      	console.log('teamData',vm.teamData);

		      	vm.newGame = function(){
		      		allmatchData = StatisticService.newgame();
		      		localStorage.setItem("matchData", JSON.stringify(allmatchData));
		      		vm.resetData();
		      	}
		      
		      	vm.bowl = function(){
		      		gameData = StatisticService.play();
		      		console.log(gameData);
		      		localStorage.setItem("gameData", JSON.stringify(gameData));
		            vm.gameData = JSON.parse(localStorage.getItem("gameData"));

		            /*vm.matchData = JSON.parse(localStorage.getItem("matchData"));
		            var lastMatchData = vm.matchData[vm.matchData.length-1].gameData;
		    		console.log('lastMatchData',lastMatchData);
		    		vm.match_id = lastMatchData[lastMatchData.length-1].match_id;*/

		    		if(JSON.parse(localStorage.getItem("matchData")) == null){
			    		vm.matchData = [];
					    vm.match_id = 0;
			    	}else{
			    		vm.matchData = JSON.parse(localStorage.getItem("matchData"));
		            	var lastMatchData = vm.matchData[vm.matchData.length-1].gameData;
		            	vm.match_id = lastMatchData[lastMatchData.length-1].match_id;
		            }

		      		console.log('gameData',vm.gameData);
		            if(vm.gameData[vm.gameData.length-1].score == 'WD' || vm.gameData[vm.gameData.length-1].score == 'NB' ){
		            	$state.reload();
		          	}              
		      	}

		      	if(JSON.parse(localStorage.getItem("matchData")) == null){
		    		vm.matchData = [];
				    vm.match_id = 0;
		    	}else{
		    		vm.matchData = JSON.parse(localStorage.getItem("matchData"));
	            	var lastMatchData = vm.matchData[vm.matchData.length-1].gameData;
	            	vm.match_id = lastMatchData[lastMatchData.length-1].match_id;
	            }
	    		
		        vm.gameData = JSON.parse(localStorage.getItem("gameData")); //it shows when controller reinitialize after route changed

		        vm.sendIndex = function(item,idx){
		            vm.getStats = item;
		            console.log('getStats in  sendIndex',vm.getStats);
		        }
		 
		      	vm.getStats = StatisticService.get($stateParams.match,$stateParams.ball,$stateParams.over,vm.gameData);
		      	console.log('getStats',vm.getStats); 
		    }

})(window.angular);
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

		      	vm.newGame = function(){
		      		allmatchData = StatisticService.newgame();
		      		localStorage.setItem("matchData", JSON.stringify(allmatchData));
		      		vm.resetData();
		      	}
		      
		      	vm.bowl = function(){
		      		gameData = StatisticService.play();
		      		console.log(gameData);
		      		vm.getMatchId();
		      		localStorage.setItem("gameData", JSON.stringify(gameData));
		            vm.gameData = JSON.parse(localStorage.getItem("gameData"));
		      		console.log('gameData',vm.gameData);
		            if(vm.gameData[vm.gameData.length-1].score == 'WD' || vm.gameData[vm.gameData.length-1].score == 'NB' ){
		            	$state.reload();
		          	}              
		      	}

		      	vm.getMatchId = function(){
		      		if(JSON.parse(localStorage.getItem("matchData")) == null){
		    			vm.matchData = [];
				    	vm.match_id = 1;
			    	}else{
			    		vm.matchData = JSON.parse(localStorage.getItem("matchData"));
		            	var lastMatchData = vm.matchData[vm.matchData.length-1].gameData;
		            	vm.match_id = lastMatchData[lastMatchData.length-1].match_id+1;
		            }
		      	}	      	

	            console.log('matchData',vm.matchData);
	            vm.match_id_by_route = $stateParams.match; 
	            console.log('match_id_by_route',$stateParams.match);
	            vm.old_match = false;
	            vm.get_old_and_currentMatch_history = function(){
	            	if($stateParams.match <= vm.matchData.length){
	            		vm.old_match = true; 
		            	console.log('History of Match No.',$stateParams.match);
		            	vm.teamData = vm.matchData[$stateParams.match-1].teamData;
		            	console.log('hist',vm.teamData);
		            	vm.gameData = vm.matchData[$stateParams.match-1].gameData;
		            }else{
		          		console.log('current match');
		    			vm.teamData = JSON.parse(localStorage.getItem("teamData"));
			        	vm.gameData = JSON.parse(localStorage.getItem("gameData")); //it shows when controller reinitialize after route changed
			        }
	            }

		        vm.sendIndex = function(item,idx){
		            vm.getStats = item;
		            console.log('getStats in  sendIndex',vm.getStats);
		        }

		 		vm.getMatchId();
		 		vm.get_old_and_currentMatch_history();
		      	vm.getStats = StatisticService.get($stateParams.match,$stateParams.ball,$stateParams.over,vm.matchData,vm.gameData);
		      	console.log('getStats',vm.getStats); 
		    }

})(window.angular);
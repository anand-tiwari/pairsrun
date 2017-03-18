
app.controller('appController', function ($scope, $state, $rootScope, $timeout) {

/*-------------- initial modal show hide condition ------------------------------------------------------------*/
	  $scope.result = false;
	  $scope.modalShown = true;
  	$scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
  	};

/*---------- scope variable is used in ng-repeat for creating blocks -------------------------------------------*/
   	function shuffle(sourceArray) {
	    for (var i = 0; i < sourceArray.length - 1; i++) {
          sourceArray[i].colorCode = 'white';
	        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

	        var temp = sourceArray[j];
	        sourceArray[j] = sourceArray[i];
	        sourceArray[i] = temp;
	    }
	    return sourceArray;
    };

    /* Generate json variable with different color for card and then suffle it. */
    function generate(){
      var data = [];
     	for(var i=0;i<8;i++){
          var color;
          var colorCode = Math.floor(Math.random() * 3) + 1;
          switch (colorCode) {
          case 1:
          		color = 'red';
          		break;
          case 2:
          		color = 'green';
          		break;
          case 3:
          		color = 'yellow';
          };
  		  data.push({'color': color});
  		  data.push({'color': color});
     	}
      $scope.rows = shuffle(data);
    };

    generate();
/*------------------    timer function -------------------------------------------------------------------------*/
    
    $scope.onTimeout = function(){
        // updating minute and second if second is rechead to zero
        if($scope.minute>0 && $scope.second==0){
          	$scope.minute = $scope.minute -1;
          	$scope.second = $scope.second + 60;
        }
        $scope.second--;
        
        // if both minute an second are zero and timer is running then stop timer
        if($scope.minute == 0 && $scope.second == 0 && $scope.stopTimer == false){
          	$scope.toggleModal();
          	$scope.stopTimer = true;
          	$scope.result = true;
        }else if(!$scope.stopTimer){
            $timeout($scope.onTimeout,1000);
        }
    }


/* ----------------------- start function of game  -------------------------------------------------------------*/
    $scope.start = function(){

        $scope.detail = {
            totalpoint: 0,
            numberOfTimesMatchTileShown:0,
            totalTilesRemaning: 16,
            bonusPoint:0
        };

        $scope.second = 0;
     		$scope.minute = 1;

     		$scope.stopTimer = false;
        $scope.modalShown = false;
      	$timeout($scope.onTimeout,1000);
    };

    $scope.reset = function(){
      $state.go($state.current, {}, {reload: true}).then(function(){
      });
    };

/*---------------------- comapre previous tiles and current tiles color ----------------------------------------*/
    function compareMatch(row) {
    	$timeout(function () {
    		// if match found 
  			if($scope.previous.color == row.color){
    				$scope.previous.colorCode = 'block';
    				row.colorCode = 'block';

    				$scope.detail.totalTilesRemaning = $scope.detail.totalTilesRemaning - 2;
    				$scope.detail.numberOfTimesMatchTileShown ++;
    				$scope.detail.totalpoint = $scope.detail.totalpoint+20;

    				if($scope.detail.totalTilesRemaning==0){
      					$scope.detail.bonusPoint = $scope.second;
      					$scope.detail.totalpoint = $scope.detail.totalpoint + $scope.detail.bonusPoint;
      					$scope.stopTimer = true;
      					$scope.result = true;
      					$scope.toggleModal();
    				}
  			}else{
    				$scope.previous.colorCode = 'white';
    				row.colorCode = 'white';
    				$scope.detail.totalpoint = $scope.detail.totalpoint + ($scope.detail.numberOfTimesMatchTileShown * -5);
  			}
  			count = 0;
  		},250);
    }


/*------------------------- click event of tiles ----------------------------------------------------------------*/
    var count = 0;
    $scope.previous;
    $scope.getInitial = function(row, index){
        row.colorCode = row.color;
        count++;
        // for every first click store the data 
        if(count==1)
           $scope.previous = row;
  		  else if(count==2){
          // for every second click compare colorCode with previous clicked box..
  			 compareMatch(row);
  		  }
    };
});

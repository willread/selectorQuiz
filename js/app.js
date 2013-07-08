var QuizControl = function($scope){
	$scope.questions = [
		{
			name: "Universal Selector",
			selector: "div * p",
			markup: [
				"<div>",
				"	<span>",
				"		<p>First paragraph</p>",
				"	</span>",
				"</div>",
				"<span>",
				"	<p>Second paragraph</p>",
				"</span>"
			],
			answers: [2]
		},
		{
			name: "Type Selector",
			selector: "p i",
			markup: [
				"<p>",
				"	Lorem ipsum dolor sit amet.",
				"	<i>Consectetur adipiscing elit.</i>",
				"	Nunc et massa non sapien.",
				"</p>"
			],
			answers: [2]
		}
	];
	
	$scope.total = $scope.questions.length;
	
	$scope.$watch("answers", function(){
		$scope.valid = false;
		console.log("wee");
	}, true);
	
	for(var ii = 0; ii < $scope.questions.length; ii++){
		var question = $scope.questions[ii];
		var newAnswers = [];
		for(var jj = 0; jj < question.markup.length; jj++) newAnswers[jj] = false;
		for(var jj = 0; jj < question.answers.length; jj++) newAnswers[question.answers[jj]] = true;
		$scope.questions[ii].answers = newAnswers;
	}
	
	$scope.setQuestion = function(num){
		$scope.current = num;
		$scope.question = $scope.questions[num];
		$scope.answers = [];
		for(var ii = 0; ii < $scope.question.markup.length; ii++) $scope.answers[ii] = false;
	}
	
	$scope.checkQuestion = function(){
		var correct = true;
		for(var ii = 0; ii < $scope.answers.length; ii++){
			if($scope.answers[ii] !== $scope.question.answers[ii]) correct = false;
		}
		// TODO: Do something when success / fail
		if(correct){
			$scope.setQuestion($scope.current + 1);
		}else{
			$scope.valid = true;
		}
	}
	
	$scope.setQuestion(0);
}
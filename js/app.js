var QuizControl = function($scope){
	$scope.questions = [
		{
			name: "Universal Selector",
			selector: "div * p",
			markup: [
				"<div>",
				"	<span id=\"wrapper\">",
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
	
	// Initialize total
	$scope.total = $scope.questions.length;
	
	// Remove invalid flag to hide error message when answers change
	$scope.$watch("answers", function(){
		$scope.valid = true;
	}, true);
	
	// Do some pre-processing of question data
	for(var ii = 0; ii < $scope.questions.length; ii++){
		var question = $scope.questions[ii];
	
		// Parse answers from questions object and replace with a nice array of true/false for later comparison	
		var newAnswers = [];
		for(var jj = 0; jj < question.markup.length; jj++) newAnswers[jj] = false;
		for(var jj = 0; jj < question.answers.length; jj++) newAnswers[question.answers[jj]] = true;
		$scope.questions[ii].answers = newAnswers;
		
		// Format markup for rendering
		// Syntax highlighting is very basic, but suits our needs
		for(var jj = 0; jj < question.markup.length; jj++){
			var html = question.markup[jj];
			
			// Escape tag brackets
			html = html.replace(/</g, "&lt;");
			html = html.replace(/>/g, "&gt;");
			
			// Style attributes
			html = html.replace(/([\w\-]*)(\=)(["'\w\-]*)/gi, "<span class=\"attribute\">$1</span><span class=\"tag\">$2</span><span class=\"value\">$3</span>");
			
			// Style tags
			html = html.replace(/(&lt;\/?[\w\-]+)/gi, "<span class=\"tag\">$1</span>"); // <abc
			html = html.replace(/(&gt;)/g, "<span class=\"tag\">$1</span>");
			
			// Convert tabs to spans to allow us to style them
			html = html.replace(/\t/g, "<span class=\"tab\"></span>");
			
			question.markup[jj] = html;
		}
	}
	
	// Change the question
	$scope.setQuestion = function(num){
		$scope.current = num;
		$scope.question = $scope.questions[num];
		$scope.answers = [];
		for(var ii = 0; ii < $scope.question.markup.length; ii++) $scope.answers[ii] = false;
	}
	
	// Check answers for current question
	$scope.checkQuestion = function(){
		var correct = true;
		for(var ii = 0; ii < $scope.answers.length; ii++){
			if($scope.answers[ii] !== $scope.question.answers[ii]) correct = false;
		}
		// TODO: Handle successfully answering last question
		if(correct){
			$scope.setQuestion($scope.current + 1);
		}else{
			$scope.valid = false;
		}
	}
	
	// Set initial question
	$scope.setQuestion(0);
}
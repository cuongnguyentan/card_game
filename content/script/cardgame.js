// JavaScript Document
// Developed by NGUYEN TAN CUONG
// cuongxoi@cuongxoi.com
// (+84) 1658 556 015
// -----
// XOI Development & Designs
// www.cuongxoi.com
// December 2015
// MEMORY CARD GAME
//=======================================================================================================

var app = angular.module('cardgame', ['ngRoute', 'ngTouch', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "pages/game.html",
			controller: "GameController"
		})

		.when("/game", {
			templateUrl: "pages/game.html",
			controller: "GameController"
		})
}]);

app.controller('GameController', function($scope, $rootScope, $location, $window, $timeout) {
	board = $window.document.getElementById('game_board');
	reserved_colors = ['#92B4A7', '#81667A'];
	move_engaged = 0;
	move_timeout = 500;
	pair = [{}, {}];
	total = 0,
	mid = 0;
	used_colors = [];
	disposed = 0;

	$rootScope.cards = [];
	$rootScope.moveCount = 0;
	$rootScope.gameMsg = '';

	function reset_game()
	{
		var msg = $window.document.getElementById('game_msg');
		$(msg).stop().animate({opacity: 0}, 200, 'swing', function() {
			$(msg).hide();
		});

		$rootScope.cards = [];
		$rootScope.moveCount = 0;
		$rootScope.gameMsg = '';

		move_engaged = 0;
		pair = [{}, {}];
		used_colors = [];
		disposed = 0;
	}

	function mix_cards(fold)
	{
		var c = $scope.colNum;
		var r = $scope.rowNum;

		if (!c || !r) return;

		var i, j, k, temp;
		var n = $rootScope.cards.length;
		fold = fold || 25;

		for (i = 0; i < fold; i++)
		{
			j = Math.floor(Math.random()*n);
			k = Math.floor(Math.random()*n);

			temp = $rootScope.cards[j].index;
			$rootScope.cards[j].index = $rootScope.cards[k].index;
			$rootScope.cards[k].index = temp;
		}
	}

	function random_color()
	{
		var source = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
		var color = '#';

		for (var i = 0; i < 6; i++)
			color += source[Math.floor(Math.random()*16)];

		return color;
	}

	function new_game(r, c)
	{
		reset_game();

		var i, j, n, m;
		var used_cards = [];

		r = r || 5;
		c = c || 5;
		n = 0;

		$scope.colNum = c;
		$scope.rowNum = r;

		total = r * c;
		mid = Math.ceil(total / 2);

		for (i = 0; i < mid; i++)
		{
			do
			{
				temp = random_color();
			} while ((reserved_colors.indexOf(temp) >= 0) || ((used_colors.indexOf(temp) >= 0)))

			used_colors.push(temp);

			for (j = 0; j < 2; j++)
			{
				if (n == total) break;

				$rootScope.cards[n] = {};
				$rootScope.cards[n].index = n;
				$rootScope.cards[n].num = n;
				$rootScope.cards[n].color = temp;
				n++;
			}
		}

		mix_cards();
	}

	$scope.restart_game = function()
	{
		end_game('Starting New Game...');

		$timeout(function() {
			new_game();
		}, 1000);
	}

	$scope.facedownAction = function ($event) {
		if (move_engaged == 2) return;

		var td = $event.currentTarget;
		var t2 = td.getElementsByClassName('card_visual')[0];
		var t1 = td.parentNode.getElementsByClassName('card_faceup')[0].getElementsByClassName('card_visual')[0];

		var temp = t1.getAttribute('id');
		var k = parseInt(temp.substring(temp.lastIndexOf('_') + 1, temp.length));

		trigger_card(t2, t1, function(){
			$(td).hide();

			if (!move_engaged)
			{
				move_engaged = 1;
				pair[0].card = $rootScope.cards[k];
				pair[0].elem = [t1, t2];
			}
			else
			{
				move_engaged = 2;
				pair[1].card = $rootScope.cards[k];
				pair[1].elem = [t1, t2];
				check_pair();
			}
		});
	};

	function trigger_card(pre, post, transit)
	{
		var w = pre.parentNode.offsetWidth;

		$(pre).stop().animate({width: 0}, 100, 'linear', function() {
			if (transit) transit();

			$(post).stop().animate({width: w}, 200, 'swing');
		});
	}

	function check_pair()
	{
		var flag = false;
		if (pair[0].card.color == pair[1].card.color) flag = true;

		$rootScope.moveCount++;

		$timeout(function() {
			if (flag)
			{
				trigger_card(pair[0].elem[0], pair[0].elem[1], function() {
					$(pair[0].elem[0].parentNode.parentNode).hide();
					return;
				});

				trigger_card(pair[1].elem[0], pair[1].elem[1], function() {
					$(pair[1].elem[0].parentNode.parentNode).hide();
					move_engaged = 0;
					return;
				});

				disposed += 2;
				if (disposed >= total - 1) end_game('You Won');
			}
			else
			{
				trigger_card(pair[0].elem[0], pair[0].elem[1], function() {
					$(pair[0].elem[1].parentNode).show();
				});

				trigger_card(pair[1].elem[0], pair[1].elem[1], function() {
					$(pair[1].elem[1].parentNode).show();
					move_engaged = 0;
				});
			}
		}, move_timeout);
	}

	function end_game(str)
	{
		var msg = $window.document.getElementById('game_msg');
		$rootScope.gameMsg = str;

		$(msg).stop().animate({opacity: 0}, 0, 'linear');
		$(msg).show();
		$(msg).stop().animate({opacity: 0.9}, 200, 'swing');
	}

	$timeout(function() {
		new_game();
	}, 0);
});

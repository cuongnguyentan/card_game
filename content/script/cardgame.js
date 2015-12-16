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

var board = id('game_board');
var cards = [];
var reserved_colors = ['#92B4A7', '#81667A'];
var move_count = 0;
var move_engaged = 0;
var move_timeout = 500;
var pair = [{}, {}];
var total, mid;
var used_colors = [];
var disposed = 0;

function new_game(r, c)
{
	var i, j, n, m;

	board.innerHTML = '<div id="game_msg"><span>You Won</span></div>';
	id('move_count').innerHTML = 0;

	r = r || 5;
	c = c || 5;
	n = 0;

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

			cards[n] = {};
			cards[n].index = n;
			cards[n].color = temp;
			n++;
		}
	}

	n = 0;
	for (i = 0; i < r; i++)
	{
		for (j = 0; j < c; j++)
		{
			(function () {
				var temp, t, t1, t2, tu, td;
				var m = n;
				var k = Math.floor(Math.random()*total);

				temp = document.createElement('div');
				temp.setAttribute('class', 'slot card_holder');
				temp.setAttribute('id', 'card_holder_'+m);
				temp.setAttribute('slotdiv', c);
				temp.setAttribute('slotspan', 1);
				temp.setAttribute('square', 1);

				t = document.createElement('div');
				t.setAttribute('class', 'card');
				t.setAttribute('id', 'card_'+m);

				tu = document.createElement('div');
				td = document.createElement('div');
				t1 = document.createElement('div');
				t2 = document.createElement('div');

				tu.setAttribute('class', 'card_faceup');
				t1.style.backgroundColor = cards[k].color;
				t1.setAttribute('class', 'card_visual');
				t1.setAttribute('id', 'card_'+m+'_up');
				tu.appendChild(t1);

				td.setAttribute('class', 'card_facedown');
				td.setAttribute('id', 'card_facedown_'+m);
				t2.setAttribute('class', 'card_visual');
				t2.setAttribute('id', 'card_'+m+'_down');
				td.appendChild(t2);

				td.onmouseover = function() {
					trigger_thumbnail(td, 50);
				};

				td.onmouseout = function() {
					trigger_thumbnail(td, 100);
				};

				td.onclick = function () {
					if (move_engaged == 2) return;

					trigger_card(t2, t1, function(){
						hide(td);

						if (!move_engaged)
						{
							move_engaged = 1;
							pair[0].card = cards[k];
							pair[0].elem = [t1, t2];
						}
						else
						{
							move_engaged = 2;
							pair[1].card = cards[k];
							pair[1].elem = [t1, t2];
							check_pair();
						}
					});
				};

				t.appendChild(tu);
				t.appendChild(td);

				temp.appendChild(t);
				board.appendChild(temp);

				setOpacity(temp, 0);
				setTimeout(function() {
					trigger_thumbnail(temp, 100);
				}, m/total * 1000);

				n++;
			})();
		}
	}

	temp = document.createElement('div');
	temp.setAttribute('class', 'clear');
	board.appendChild(temp);

	resize_slot();
}

function trigger_card(pre, post, transit)
{
	var w = pre.parentNode.offsetWidth;

	if (!animators[pre.id])
		animators[pre.id] = new Animator();

	if (!animators[post.id])
		animators[post.id] = new Animator();

	animators[pre.id].elem = pre;
	animators[pre.id].transWidthTo(0, 1, function(){
		if (transit) transit();

		animators[post.id].elem = post;
		animators[post.id].transWidthTo(w, 2);
	}, null, true);
}

function check_pair()
{
	var flag = false;
	if (pair[0].card.color == pair[1].card.color) flag = true;
	
	move_count++;
	id('move_count').innerHTML = move_count;
	
	setTimeout(function() {
		if (flag)
		{
			trigger_card(pair[0].elem[0], pair[0].elem[1], function() {
				hide(pair[0].elem[0].parentNode.parentNode);
				return;
			});

			trigger_card(pair[1].elem[0], pair[1].elem[1], function() {
				hide(pair[1].elem[0].parentNode.parentNode);
				move_engaged = 0;
				return;
			});

			disposed += 2;
			if (disposed >= total - 1) end_game();
		}
		else
		{
			trigger_card(pair[0].elem[0], pair[0].elem[1], function() {
				show(pair[0].elem[1].parentNode);
			});

			trigger_card(pair[1].elem[0], pair[1].elem[1], function() {
				show(pair[1].elem[1].parentNode);
				move_engaged = 0;
			});
		}
	}, move_timeout);
}

function end_game()
{
	var won = id('game_msg');
	setOpacity(won, 0);
	show(won);
	trigger_thumbnail(won, 100);
}
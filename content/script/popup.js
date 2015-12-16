// JavaScript Document
// Developed by NGUYEN TAN CUONG
// cuongxoi@cuongxoi.com
// (+84) 1658 556 015
// -----
// XOI Development & Designs
// www.cuongxoi.com
// 2011 - 2014
// POPUP FUNCTIONS
//=======================================================================================================

var popup_on = false;
var focusing;

var args = new Array();
var popup_outcome;

var current_popup;

function off_popup(outcome)
{
	if (!popup_on) return;

	popup_on = false;

	var wrap = id('popup_wrapper');
	var cover = id('popup_coverup');

	var a = new Animator();
	a.elem = wrap;
	a.transOpacity(0, 3, function(){
		hide(wrap);
		hide(cover);
		hide(current_popup);

		if (popup_outcome) popup_outcome();
		if (outcome) outcome();
	});

	var a = new Animator();
	a.elem = cover;
	a.transOpacity(0, 2);
}

function popup_alert(str, outcome)
{
	id('popup_content').innerHTML = str;

	on_popup('popup_content');

	if (outcome) popup_outcome = outcome;
}

function on_popup(name, outcome, x, y)
{
	var temp = windowScrollHeight();

	var p = id(name);

	var wrap = id('popup_wrapper');
	var cover = id('popup_coverup');

	show(p);
	current_popup = p;

	show(wrap);
	show(cover);

	wrap.style.bottom = 'auto';
	wrap.style.top = (windowScrollTop() + 100) + 'px';
	wrap.style.left = ((windowWidth() - p.offsetWidth) / 2) + 'px';

	if (x) wrap.style.left = (x - wrap.offsetWidth/2) + 'px';
	if (y) wrap.style.top = (y - wrap.offsetHeight/2) + 'px';

	setOpacity(wrap, 0);
	setOpacity(cover, 0);

	if (wrap.offsetTop + wrap.offsetHeight > temp)
	{
		wrap.style.top = 'auto';
		wrap.style.bottom = '100px';

		scrollUp(wrap.offsetTop - 100, 3);
	}

	var a = new Animator();
	a.elem = wrap;
	a.transOpacity(100, 3, function(){
		if (outcome) outcome();
	});

	var a = new Animator();
	a.elem = cover;
	a.transOpacity(75, 3);
	popup_on = true;
}

var context_menu_engaging = false;
function show_context_menu(event)
{
	if (id('context_menu') && (id('context_menu').innerHTML.length > 0))
	{
		if (context_target)
		{
			if ((event.pageY < context_target.offsetTop)
			|| (event.pageY > context_target.offsetTop + context_target.offsetHeight)
			|| (event.pageX < context_target.offsetLeft)
			|| (event.pageX > context_target.offsetLeft + context_target.offsetWidth))
			{
				context_target = null;
				return;
			}
		}
		else return;

		show(id('context_menu'));
		id('context_menu').style.left = event.pageX + 'px';
		id('context_menu').style.top = event.pageY + 'px';

		var temp = window.onmousedown;
		window.onmousedown = function(event)
		{
			if (context_menu_engaging)
				return;

			hide(id('context_menu'));
			window.onmousedown = temp;
		}

		return true;
	}
}

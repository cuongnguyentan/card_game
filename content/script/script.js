// JavaScript Document
// Developed by NGUYEN TAN CUONG
// cuongxoi@cuongxoi.com
// (+84) 1658 556 015
// -----
// XOI Development & Designs
// www.cuongxoi.com
// 2011 - 2015
//=======================================================================================================

var animators = new Array();

window.onresize = resize;

function init(page)
{
	resize();
}


var body_min_width = 660;
function resize()
{
	var fsize, fsize2, fsize3;

	var container = Math.floor(document.body.offsetWidth * 15 / 16 - 30);
	if (container > 1200) container = 1200;
	if (container < 300) container = 300;

	var elems = document.getElementsByClassName('container');
	for (var i = 0; i < elems.length; i++)
		elems[i].style.width = container + 'px';

	resize_slot();
	resize_text();
}

function trigger_link(elem, color, t)
{
	if (!animators[elem.id])
	{
		animators[elem.id] = new Animator();
		animators[elem.id].elem = elem;
	}

	t = t || 1;
	animators[elem.id].transColor(color, t);
}

function trigger_back(elem, color)
{
	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transBackColor(color, 2);
}

function trigger_back_(elem, from, to, event)
{
	if(event != null)
	{
		var e = event.toElement || event.relatedTarget;
		if (e.parentNode == elem || e == elem) return;
	}

	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transBackColor_(to, from, 2);
}

function trigger_thumbnail(elem, opacity)
{
	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transOpacity(opacity, 2);
}

function trigger_nav_bg(elem, h)
{
	if (!animators[elem.id])
	{
		animators[elem.id] = new Animator();
		animators[elem.id].elem = elem;
	}

	animators[elem.id].transHeightTo(h, 2, null, null);
}

function trigger_button(elem)
{
	elem = elem.getElementsByClassName('button_hover')[0].getElementsByTagName('div')[0];

	var w = elem.parentNode.offsetWidth;

	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transWidthTo(w, 3);
}

function untrigger_button(elem)
{
	elem = elem.getElementsByClassName('button_hover')[0].getElementsByTagName('div')[0];

	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transWidthTo(0, 5);
}

function trigger_menu(elem)
{
	var temp = elem.getAttribute('class')
	if (temp)
	{
		temp = temp.split(' ');
		if (temp.indexOf('active') >= 0) return;
	}

	var h = calculate_size('vmax', -2);
	var t = -elem.offsetTop;

	elem = elem.getElementsByTagName('div')[0];

	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	elem.style.top = t + 'px';
	show(elem);
	animators[elem.id].elem = elem;
	animators[elem.id].transTopTo(h, 3);
}

function untrigger_menu(elem)
{
	var temp = elem.getAttribute('class')
	if (temp)
	{
		temp = temp.split(' ');
		if (temp.indexOf('active') >= 0) return;
	}

	var t = -(elem.offsetTop * 1.5);

	elem = elem.getElementsByTagName('div')[0];

	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transTopTo(t, 5, function(){
		hide(elem);
	});
}

function trigger_stamp(elem)
{
	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transHeightTo(0, 2);
}

function untrigger_stamp(elem)
{
	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transHeightTo(84, 2);
}

function trigger_zoom(elem, p)
{
	if (!animators[elem.id])
		animators[elem.id] = new Animator();

	animators[elem.id].elem = elem;
	animators[elem.id].transZoomTo(p, 2);
}

function load_lphoto(src)
{
	id('lphoto_target').src = src;
	id('lphoto_target').style.height = (windowHeight() - 200) + 'px';
	setTimeout(function(){
		on_popup('lphoto');
	}, 100);
}
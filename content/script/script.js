// JavaScript Document
// Developed by NGUYEN TAN CUONG
// cuongxoi@cuongxoi.com
// (+84) 1658 556 015
// -----
// XOI Development & Designs
// www.cuongxoi.com
// 2011 - 2015
//=======================================================================================================

var header_imgs = new Array();

var animators = new Array();
var current_header_img = 0;
var animate_num = 0;
var animate_timeout;

var current_page;
var action_pending = false;

window.onresize = resize;

function init(page)
{
	//show(id('loading'));

	current_page = page;

	/*animators[id('header_img').id] = new Animator();
	animators[id('header_img').id].elem = id('header_img');

	animate_num = header_imgs.length;
	id('banner').getElementsByTagName('img')[1].setAttribute('src', header_imgs[0]);
	animate_timeout = setTimeout(function()
	{
		animate(1);
	}, 5000);*/

	resize();

	/*hide(id('loading'));
	var a = new Animator();
	a.elem = id('loading_blind');
	a.transOpacity(0, 3, function(){
		hide(id('loading_blind'));
	});*/
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

	if (container < body_min_width)
	{
		/*hide(id('nav_menu'));
		show(id('nav_menu_alternate'));*/
	}
	else
	{
		/*hide(id('nav_menu_alternate'));
		show(id('nav_menu'));*/
	}
}

/*function fetch_header_images()
{
	animate_num = header_imgs.length;

	id('banner').getElementsByTagName('img')[1].setAttribute('src', header_imgs[0]);

	var temp = new Image();
	temp.src = header_imgs[0];
	temp.onload = function(){
		hide(id('loading'));
		var a = new Animator();
		a.elem = id('loading_blind');
		a.transOpacity(0, 3, function(){
			hide(id('loading_blind'));
		});
	};

	animate_timeout = setTimeout(function()
	{
		animate(1);
	}, 5000);
}*/

function animate(step)
{
	if (animate_timeout) clearTimeout(animate_timeout);

	var i0 = id('banner').getElementsByTagName('img')[0];
	var i1 = id('banner').getElementsByTagName('img')[1];

	var temp = i1.getAttribute('src');
	i0.setAttribute('src', temp);

	current_header_img += step;
	if (current_header_img >= animate_num) current_header_img = 0;
	if (current_header_img < 0) current_header_img = animate_num - 1;

	i1.setAttribute('src', header_imgs[current_header_img]);
	setOpacity(i1, 0);

	animators[id('header_img').id].transOpacity(100, 7, null, null);

	/*var a = new Animator();
	a.elem = id('story_text');
	a.transOpacity(0, 3, function(){
		id('story_price').innerHTML = header_imgs[current_header_img]['price'];
		id('story_title').innerHTML = header_imgs[current_header_img]['name'];
		id('story_description').innerHTML = header_imgs[current_header_img]['description'];

		var b = new Animator();
		b.elem = id('story_text');
		b.transOpacity(100, 3);
	});*/

	animate_timeout = setTimeout(function()
	{
		animate(1);
	}, 5000);
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

function fix_gallery()
{
	var elem = document.getElementsByClassName('gallery')[0];

	var photos = elem.getElementsByClassName('gallery_photo');
	for (var i = 0; i < photos.length; i++)
		photos[i].style.height = Math.floor(photos[i].offsetWidth * 3 / 4) + 'px';
}

function load_lphoto(src)
{
	id('lphoto_target').src = src;
	id('lphoto_target').style.height = (windowHeight() - 200) + 'px';
	setTimeout(function(){
		on_popup('lphoto');
	}, 100);
}

var current_photo = 1;
var max_photo = 4;
var mainphoto = new Animator();
function load_mainphoto(src, step, item_id)
{
	var img = id('main_img');
	mainphoto.elem = img;
	mainphoto.transOpacity(0, 3, function(){
		if (src) img.src = src;
		else if (step)
		{
			current_photo += step;
			if (current_photo > max_photo) current_photo = 1;
			if (current_photo < 1) current_photo = max_photo;

			img.src = 'images/items/'+item_id+'/'+current_photo+'.jpg';
		}
		else return false;

		mainphoto.transOpacity(100, 3);
	});
}

function set_lang(lang)
{
	ajaxoi('POST', 'set_lang.php?lang='+lang, function() {
		window.location.reload();
	});
}

function load_article_list(name, lim, controls, start)
{
	show(id('loading'));

	ajaxoi('GET', 'news.php?summoner='+name+'&lim='+lim+'&controls='+controls+'&start='+start, function(response) {
		id(name).innerHTML = response;
		resize_slot(id(name));
		hide(id('loading'));
	});
}

function email_success()
{
	untrigger_menu(id('contacts_email'));
	show(id('contacts_email_notify'));
	hide(id('loading'));

	var elems = id('contacts_email').getElementsByTagName('form')[0].elements;
	for (var i = 0; i < elems.length - 1; i++) elems[i].value = '';
}

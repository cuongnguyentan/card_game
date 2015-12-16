// JavaScript Document
// Developed by NGUYEN TAN CUONG
// cuongxoi@cuongxoi.com
// (+84) 1658 556 015
// -----
// XOI Development & Designs
// www.cuongxoi.com
// 2011 - 2015
// BASE FUNCTIONS
//=======================================================================================================

window.onscroll = function() {
	if (id('to_top'))
	{
		if (windowScrollTop() > windowHeight()) show(id('to_top'));
		else hide(id('to_top'));
	}
}

function id(name)
{
	return document.getElementById(name);
}

function show(elem)
{
	elem.style.display = 'block';
}

function hide(elem)
{
	elem.style.display = 'none';
}

function getIframeDocument(id)
{
	if (document.getElementById(id).contentDocument)
		return document.getElementById(id).contentDocument;
	else
		return document.frames[id].document;
}

function getStyle(elem, name)
{
	if (elem.style[name]) return elem.style[name];

	else if (elem.currentStyle) return elem.currentStyle[name];

	else if (document.defaultView && document.defaultView.getComputedStyle)
	{
		name = name.replace(/([A-Z])/g, "-$1");
		name = name.toLowerCase();

		var style = document.defaultView.getComputedStyle(elem, "");
		return style && style.getPropertyValue(name);
	}

	else return null;
}

function setOpacity(elem, level)
{
	if (navigator.appName == 'Microsoft Internet Explorer') elem.style.filter = 'alpha(opacity='+level+')';
	else elem.style.opacity = level / 100;
}

function scrollUp(y, speed)
{
	var tempX = window.pageXOffset;
	var tempY = window.pageYOffset;

	for(var i = 0; i <= 100; i+=5)
	{
		(function()
		 {
			var pos = i;

			setTimeout (function()
						{
							window.scrollTo(tempX, tempY - (pos/100)*(tempY - y));
							if (pos <= t)
							{
								window.scrollTo(tempX, tempY);
							}
						}, (pos+1)*speed);
		 })();
	}
}

function checkbox_change(elem, skip)
{
	var chk = elem.getElementsByTagName('div')[0];
	var temp = getStyle(chk, 'backgroundPosition');

	var left = parseInt(temp.substring(0, temp.indexOf('px')));
	temp = temp.substring(temp.indexOf('px') + 3, temp.length);

	var top = parseInt(temp.substring(0, temp.indexOf('px')));

	chk.style.backgroundPosition = '0px '+ (16 - top) + 'px';

	chk = elem.getElementsByTagName('input')[0];
	chk.checked = !chk.checked;

	if (!skip)
		if (chk.onchange) chk.onchange();
}

function radio_change(elem)
{
	var chk = elem.getElementsByTagName('input')[0];

	var r = document.getElementsByName(chk.name);
	var temp;
	for (i = 0; i < r.length; i++)
		if (r[i].nodeName == 'INPUT')
			if (r[i].checked) checkbox_change(r[i].parentNode, true);

	if (!chk.checked) checkbox_change(chk.parentNode);
}

function clear_timeout(list)
{
	for (var i in list) clearTimeout(list[i]);
}

function encode(elem, key)
{
	var password = elem.value;
	var encoded = '';
	var i = 0;

	while (i < password.length)
	{
		encoded += ((password.charCodeAt(i) * (i+key)) % 255).toString(16);
		i++;
	}

	elem.value = encoded;
}

function addCommas(str, strong)
{
	str = str.toString();
	var temp = '';
	var n = 0;

	for (var i = str.length - 1; i >= 0; i--)
	{
		temp = str.charAt(i) + temp;

		n++;
		if ((n % 3 == 0) && (i > 0)) temp = ',' + temp;
	}

	if (strong)
		temp = '<strong>'+temp.substring(0, temp.length - 4)+'</strong>'+temp.substring(temp.length - 4, temp.length);

	return temp;
}

function removeCommas(str)
{
	var temp = '';

	for (var i = 0; i < str.length; i++)
		if (str.charAt(i) != ',')
			temp += str.charAt(i);

	return temp;
}

function stripTags(str)
{
	return str.replace(/(<([^>]+)>)/ig,"");
}

function clean_string(text)
{
	text = text.replace(/[ẵẳẫẩắằăặầấâậạáàâãªäả]/g,'a');
	text = text.replace(/[ẴẲẪẨẮẰĂẶẤẦÂẬẠÁÀÂÃÄẢ]/g,"A");
	text = text.replace(/[ĨỈỊÍÌÎÏ]/g,"I");
	text = text.replace(/[ĩỉịíìîï]/g,"i");
	text = text.replace(/[ỸỶỴÝỲ]/g,"Y");
	text = text.replace(/[ỹỷỵýỳ]/g,"y");
	text = text.replace(/[ễểếềêệẹéèêëẻẽ]/g,"e");
	text = text.replace(/[ỄỂẾỀÊỆẸÉÈÊËẺẺ]/g,"E");
	text = text.replace(/[ỗổốồôộọóòôốồõºöỏơớờởợ]/g,"o");
	text = text.replace(/[ỖỔỐỒÔỘỌÓÒÔỐỒÕÖỎƠỚỜỞ]/g,"O");
	text = text.replace(/[ưữửựừứũủụúùûü]/g,"u");
	text = text.replace(/[ƯỮỬỰỪỨŨỦỤÚÙÛÜ]/g,"U");
	text = text.replace(/[’‘‹›‚]/g,"'");
	text = text.replace(/[“”«»„]/g,'"');
	text = text.replace("–","-");
	text = text.replace("ç","c");
	text = text.replace("Ç","C");
	text = text.replace("ñ","n");
	text = text.replace("Ñ","N");
	text = text.replace("đ","d");
	text = text.replace("Đ","D");

	text = text.replace("/[^a-zA-Z0-9\s]/",'');
	text = text.replace(" ","_");

	return text;
}

function string_encode(text)
{
	var result = '';

	for (var i = 0; i < text.length; i++)
	{
		if (i > 0) result += '-';
		result += text.charCodeAt(i);
	}

	return result;
}

function string_decode(text)
{
	var result = '';
	var temp = '';

	for (var i = 0; i < text.length; i++)
	{
		if (text[i] != '-')
			temp += text[i];
		else
		{
			result += String.fromCharCode(temp);
			temp = '';
		}
	}

	result += String.fromCharCode(temp);

	return result;
}

function windowWidth()
{
	var w;
	if (window.innerWidth) w = window.innerWidth;
	else if (document.body.clientWidth) w = document.body.clientWidth;
	else if (document.documentElement.clientWidth) w = document.documentElement.clientWidth;

	return w;
}

function windowHeight()
{
	var h;
	if (window.innerHeight) h = window.innerHeight;
	else if (document.body.clientHeight) h = document.body.clientHeight;
	else if (document.documentElement.clientHeight) h = document.documentElement.clientHeight;

	return h;
}

function windowScrollTop()
{
	var temp = (document.all ? document.scrollTop : window.pageYOffset);

	return temp;
}

function windowScrollLeft()
{
	var temp = (document.all ? document.scrollLeft : window.pageXOffset);

	return temp;
}

function windowScrollHeight() // Borgar
{
	var body = document.body,
    html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

	return height;
}

function convertBase(num, origin, target)
{
	num = num.toString();

	var temp, result = 0, i = 0;
	while (i < num.length)
	{
		temp = parseInt(num[i]);
		if(!(temp >= 0))
		{
			switch (num[i])
			{
				case 'a': temp = 10; break;
				case 'b': temp = 11; break;
				case 'c': temp = 12; break;
				case 'd': temp = 13; break;
				case 'e': temp = 14; break;
				case 'f': temp = 15; break;
				default: break;
			}
		}
		result += temp * Math.pow(origin, num.length - i - 1);
		i++;
	}

	if (target != 10)
	{
		temp = result;

		var rem;
		result = '';
		while (temp > 0)
		{
			rem = temp % target;
			if (rem >= 10)
			{
				switch (rem)
				{
					case 10: rem = 'a'; break;
					case 11: rem = 'b'; break;
					case 12: rem = 'c'; break;
					case 13: rem = 'd'; break;
					case 14: rem = 'e'; break;
					case 15: rem = 'f'; break;
					default: break;
				}
			}

			result = rem + result;
			temp = Math.floor(temp / target);
		}
	}

	return result;
}

function getMonthName(time)
{
	var temp = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

	return temp[time.getMonth()];
}

function getDaysNum(month, year)
{
	var temp = 0;
	month = parseInt(month);
	year = parseInt(year);

	switch(month)
	{
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			temp = 31;
			break;

		case 2:
			if ((year % 4 == 0) || ((year % 100 == 0) && (year % 400 == 0)))
				temp = 29;
			else
				temp = 28;
			break;

		case 4:
		case 6:
		case 9:
		case 11:
			temp = 30;
			break;

		default: break;
	}

	return temp;
}

function stopDefault(e) // Bryan
{
    if (e && e.preventDefault) e.preventDefault();
    else window.event.returnValue = false;

    return false;
}

function isWhitespace(node) // Tim Down
{
    return node.nodeType == 3 && /^\s*$/.test(node.data);
}

function setEnd(txt) // Hallgeir Engen
{
	if (txt.createTextRange)
	{
   		//IE
	   var FieldRange = txt.createTextRange();
	   FieldRange.moveStart('character', txt.value.length);
	   FieldRange.collapse();
	   FieldRange.select();
   	}
  	else
	{
	   //Firefox and Opera
	   txt.focus();
	   var length = txt.value.length;
	   txt.setSelectionRange(length, length);
  	}
}

function calculate_size(u, v)
{
	var result = null;
	var temp;

	switch (u)
	{
		case 'vmax':
			temp = windowWidth();
			if (temp < windowHeight()) temp = windowHeight();

			result = v * temp / 100;
			break;

		case 'px':
		default:
			result = v;
			break;
	}

	return result;
}

// SKIN

function arrange_grid(grid)
{
	var cells = grid.querySelectorAll('.cell');
	var columns = grid.querySelectorAll('.column');

	var temp;

	for (var i = 0; i < cells.length; i++)
	{
		temp = columns[0];
		for (var j = 1; j < columns.length; j++)
			if (temp.offsetTop + temp.offsetHeight > columns[j].offsetTop + columns[j].offsetHeight)
				temp = columns[j];

		temp.appendChild(cells[i]);
	}
}

function resize_text()
{
	var fsize, minfsize, maxfsize, hratio, temp;
	var elems = document.querySelectorAll('.flex');

	for (var i = 0; i < elems.length; i++)
	{
		fsize = getStyle(elems[i], 'fontSize');
		minfsize = elems[i].getAttribute('minfsize');
		maxfsize = elems[i].getAttribute('maxfsize');

		if (minfsize && (fsize < minfsize))
		{
			elems[i].style.fontSize = minfsize + 'px';
			fsize = minfsize;
		}

		if (maxfsize && (fsize > maxfsize))
		{
			elems[i].style.fontSize = maxfsize + 'px';
			fsize = maxfsize;
		}

		hratio = elems[i].getAttribute('hratio');
		if (hratio)
		{
			temp = hratio.split('.');
			elems[i].style.lineHeight = Math.floor(fsize * temp[1] / temp[0]) + 'px';
		}
	}
}

function resize_slot()
{
	var holders = document.querySelectorAll('.holder');

	for (k = 0; k < holders.length; k++)
	{
		resize_(holders[k]);

		if (holders[k].getAttribute('class').indexOf('grid') >= 0)
			arrange_grid(holders[k]);
	}
}

function resize_(holder)
{
	var container, temp, i, j, k, div, span;

	var elems = holder.querySelectorAll('.slot');
	container = holder.offsetWidth;

	var upto = 0;
	var first = true;
	var last = false;
	for (i = 0; i < elems.length; i++)
	{
		if (elems[i].parentNode != holder) continue;

		div = parseInt(elems[i].getAttribute('slotdiv'));
		span = parseInt(elems[i].getAttribute('slotspan'));
		var spanmin = parseInt(elems[i].getAttribute('spanmin'));
		var pleft = parseInt(elems[i].getAttribute('padleft'));
		var pright = parseInt(elems[i].getAttribute('padright'));

		var w = Math.floor(container / div * span);

		if (div == span) w = container;
		if (w < spanmin) w = spanmin;

		if (pleft >= 0) elems[i].style.paddingLeft = pleft + 'px';
		if (pright >= 0) elems[i].style.paddingRight = pright + 'px';

		elems[i].style.width = w + 'px';

		upto += w;

		if (getStyle(elems[i], 'clear') == 'both')
		{
			upto = w;
			first = true;
			last = false;
		}

		if (upto == container)
			last = true;

		if (upto > container)
		{
			elems[i].style.clear = 'both';
			upto -= container;
			first = true;
			last = false;
		}

		if (i > 0)
		{
			j = i - 1;
			while (elems[j].parentNode != holder) j--;

			if (elems[i].offsetTop > elems[j].offsetTop)
			{
				if (getStyle(elems[i], 'clear') != 'both')
				{
					elems[i].style.clear = 'both';

					div = 0;
					for (j = i - 1; j >= 0; j--)
					{
						if (elems[j].parentNode != holder) continue;
						if (getStyle(elems[j], 'clear') == 'both') break;

						div += parseInt(elems[j].getAttribute('slotspan'));
					}

					for (k = j+1; k < i; k++)
					{
						if (elems[k].parentNode != holder) continue;
						elems[k].setAttribute('slotdiv', div);
					}

					div = 0;
					for (j = i; j < elems.length; j++)
					{
						if (elems[j].parentNode != holder) continue;
						if ((j != i) && (getStyle(elems[j], 'clear') == 'both')) break;

						div += parseInt(elems[j].getAttribute('slotspan'));
					}

					for (k = i; k < j; k++)
					{
						if (elems[k].parentNode != holder) continue;
						elems[k].setAttribute('slotdiv', div);
					}

					resize_slot();
					return;
				}
			}
		}
	}
}

function resize_slot_ul(elem)
{
	var list = elem.getElementsByTagName('li');

	var s = 0;
	for (i = 0; i < list.length; i++)
		s += list[i].offsetWidth + parseInt(getStyle(list[i], 'paddingLeft')) + parseInt(getStyle(list[i], 'paddingRight'));

	for (i = 0; i < list.length; i++)
	{
		div = list.length;
		span = 1;

		container = elem.offsetWidth;
		slotm = container - s;

		var ml = Math.floor(slotm / div / 3 * 2);
		var mr = Math.floor(slotm / div / 3);

		list[i].style.marginLeft = ml + 'px';
		list[i].style.marginRight = mr + 'px';
	}
}

var dropdown_engaging = false;
function trigger_dropdown_options(elem)
{
	var opts = elem.getElementsByTagName('div')[3];

	if(getStyle(opts, 'display') != 'none')
	{
		hide(opts);
		return;
	}

	show(opts);

	var temp = window.onmousedown;
	window.onmousedown = function(event)
	{
		if (dropdown_engagaing)
			return;

		hide(opts);
		window.onmousedown = temp;
	}
}

function dropdown_change(elem)
{
	var name = elem.getElementsByTagName('div')[0].innerHTML;
	var value = elem.getElementsByTagName('input')[0].value;

	var parent = elem.parentNode.parentNode;
	parent.getElementsByTagName('div')[0].innerHTML = name;
	parent.getElementsByTagName('input')[0].value = value;
}

function performClick(node) //Samuel Liew
{
   var evt = document.createEvent("MouseEvents");
   evt.initEvent("click", true, false);
   node.dispatchEvent(evt);
}

var scrolling = false;
var scrollX, scrollY, originX, originY;

function show_scroll(elem)
{
	var scroller = elem.nextSibling;
	if (scroller && isWhitespace(scroller))
		scroller = scroller.nextSibling;

	if (!scroller || scroller.getAttribute('class') != 'scroll_holder') return;

	scroller.style.height = elem.offsetHeight + 'px';
	scroller.style.marginTop = parseInt(getStyle(elem, 'marginTop')) + 'px';
	scroller = scroller.getElementsByTagName('div')[0];

	if (elem.scrollHeight > elem.offsetHeight)
	{
		scroller.style.height = Math.floor(elem.offsetHeight / elem.scrollHeight * 100) + '%';
		scroller.style.top = (elem.scrollTop / elem.scrollHeight * scroller.offsetHeight) + 'px';
		if (scroller.offsetTop < 5) scroller.style.top = '5px';
		show(scroller);
	}
	else hide(scroller);
}

function engage_scroll(event, scroller)
{
	scrolling = true;
	scrollX = event.pageX;
	scrollY = event.pageY;
	originX = scroller.offsetLeft;
	originY = scroller.offsetTop;

	stopDefault(event);
}

function disengage_scroll()
{
	scrolling = false;
}

function move_scrollY(scroller)
{
	window.onmouseup = disengage_scroll;

	(function() {
		window.onmousemove = handleMouseMove;
		function handleMouseMove(event)
		{
			event = event || window.event;

			if (!scrolling) return;

			var temp = event.pageY - scrollY;
			scroller.style.top = (originY + temp) + 'px';

			if (scroller.offsetTop > scroller.parentNode.offsetHeight - scroller.offsetHeight)
				scroller.style.top = (scroller.parentNode.offsetHeight - scroller.offsetHeight) + 'px';

			if (scroller.offsetTop <  5)
				scroller.style.top = '5px';

			var temp = scroller.parentNode.previousSibling;
			if (temp && isWhitespace(temp))
				temp = temp.previousSibling;

			temp.scrollTop = scroller.offsetTop / scroller.offsetHeight * scroller.parentNode.scrollHeight;
		}
	})();
}

function engage_slide(event, handle)
{
	sliding = true;
	slideX = event.pageX;
	slideY = event.pageY;

	originX = handle.offsetLeft;
	originY = handle.offsetTop;

	stopDefault(event);
}

function disengage_slide()
{
	sliding = false;
}

function move_slideX(slider)
{
	window.onmouseup = disengage_slide;

	(function() {
		window.onmousemove = handleMouseMove;
		function handleMouseMove(event)
		{
			event = event || window.event;

			if (!sliding) return;

			var temp = event.pageX - slideX;
			slider.style.left = (originX + temp) + 'px';

			if (slider.offsetLeft > slider.parentNode.offsetWidth)
				slider.style.left = '100%';

			if (slider.offsetLeft <  0)
				slider.style.left = 0;

			var slide_val = ((slider.offsetLeft / slider.parentNode.offsetWidth) * 10).toFixed(1);
			if (slide_val >= 10) slide_val = '10';
			var slider_name = slider.parentNode.getAttribute('name');
			id('slide_'+slider_name+'_value').innerHTML = slide_val;
			id('slide_'+slider_name+'_value_hidden').value = slide_val;
		}
	})();
}

function findPos(obj) //lwburk
{
    var curleft = 0, curtop = 0;
    if (obj.offsetParent)
	{
        do
		{
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rating_hover(elem)
{
	elem.onmouseout = function(event)
	{
		if(event != null)
		{
			var e = event.toElement || event.relatedTarget;
			if (e.parentNode == elem || e == elem) return;
		}

		window.onmousemove = null;
		elem.getElementsByTagName('div')[0].style.width = '0%';
		elem.getElementsByTagName('input')[0].value = 0;
	}

	window.onmousemove = function(event){
		var temp = Math.ceil(((event.pageX - findPos(elem).x) / elem.offsetWidth) * 10) *10;
		var rated = elem.getElementsByTagName('div')[0];

		rated.style.width = temp + '%';
		elem.getElementsByTagName('input')[0].value = parseInt(parseFloat(temp)/10);
	}
}

function notify(name, msg)
{
	var elem = id(name);
	elem.innerHTML = msg;

	setOpacity(elem, 0);
	show(elem);

	var a = new Animator();
	a.elem = elem;
	a.transOpacity(100, 3);
}

function fetch_auto_complete(elem, script)
{
	var key = elem.value;
	if (key == '') return;

	var target = elem.parentNode.getElementsByTagName('div')[0];

	ajaxoi('GET', script+'?key='+key, function(response){
		target.innerHTML = response;
		show(target);
	});
}

function shut_auto_complete(elem)
{
	var target = elem.getElementsByTagName('div')[0];
	target.innerHTML = '';
	hide(target);
}

//AJAX
function ajaxoi(method, url, outcome)
{
	if (window.XMLHttpRequest)
		var http = new XMLHttpRequest();
	else
		var http = new ActiveXObject('Microsoft.XMLHTTP');

	http.onreadystatechange=function()
						   {
							   if ((http.readyState == 4) && (http.status == 200))
							   {
								   if (outcome) outcome(http.responseText);
							   }
						   }

	http.open(method, url, true);
	http.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	http.send();
}


// OOP
function Animator()
{
	this.elem = 'init';
	this.timeout = new Array();
}

Animator.prototype.transColor = function (target, speed, outcome, args)
{
	var r, g, b;

	var origin = getStyle(this.elem, 'color');
	if (origin.indexOf('#') >= 0)
	{
		r = origin.substring(1, 3);
		g = origin.substring(3, 5);
		b = origin.substring(5, 7);

		r = parseInt(convertBase(r, 16, 10));
		g = parseInt(convertBase(g, 16, 10));
		b = parseInt(convertBase(b, 16, 10));
	}
	else if (origin.indexOf('rgb') >= 0)
	{
		var temp = 0, n = 0;
		var a = new Array();
		while (temp >= 0)
		{
			temp = origin.indexOf(',', temp + 1);
			a[n] = temp;
			n++;
		}

		r = parseInt(origin.substring(origin.indexOf('(') + 1, a[0]));
		g = parseInt(origin.substring(a[0] + 1, a[1]));
		b = parseInt(origin.substring(a[1] + 1, origin.indexOf(')')));
	}

	origin = new Array();

	origin[0] = r;
	origin[1] = g;
	origin[2] = b;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var r = origin['0'] + Math.floor((target['0'] - origin['0']) * pos / 100);
			var g = origin['1'] + Math.floor((target['1'] - origin['1']) * pos / 100);
			var b = origin['2'] + Math.floor((target['2'] - origin['2']) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.color = 'rgb('+r+','+g+','+b+')';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transBackColor = function (target, speed, outcome, args)
{
	var r, g, b;

	var origin = getStyle(this.elem, 'backgroundColor');
	if (origin.indexOf('#') >= 0)
	{
		r = origin.substring(1, 3);
		g = origin.substring(3, 5);
		b = origin.substring(5, 7);

		r = parseInt(convertBase(r, 16, 10));
		g = parseInt(convertBase(g, 16, 10));
		b = parseInt(convertBase(b, 16, 10));
	}
	else if (origin.indexOf('rgb') >= 0)
	{
		var temp = 0, n = 0;
		var a = new Array();
		while (temp >= 0)
		{
			temp = origin.indexOf(',', temp + 1);
			a[n] = temp;
			n++;
		}

		r = parseInt(origin.substring(origin.indexOf('(') + 1, a[0]));
		g = parseInt(origin.substring(a[0] + 1, a[1]));
		b = parseInt(origin.substring(a[1] + 1, origin.indexOf(')')));
	}

	origin = new Array();

	origin[0] = r;
	origin[1] = g;
	origin[2] = b;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var r = origin['0'] + Math.floor((target['0'] - origin['0']) * pos / 100);
			var g = origin['1'] + Math.floor((target['1'] - origin['1']) * pos / 100);
			var b = origin['2'] + Math.floor((target['2'] - origin['2']) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.backgroundColor = 'rgb('+r+','+g+','+b+')';

						  if (pos >= 100) outcome(args);

					  },  Math.pow(Math.E, (pos + 1)/20)*speed);
		})();
	}
}

Animator.prototype.transBackColor_ = function (target, origin, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var r = origin['0'] + Math.floor((target['0'] - origin['0']) * pos / 100);
			var g = origin['1'] + Math.floor((target['1'] - origin['1']) * pos / 100);
			var b = origin['2'] + Math.floor((target['2'] - origin['2']) * pos / 100);
			var opac = origin['3'] + ((target['3'] - origin['3']) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.backgroundColor = 'rgba('+r+','+g+','+b+','+opac+')';

						  if (pos >= 100)
						  	if (outcome) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transTop = function (diff, speed, outcome, args)
{
	var origin = this.elem.offsetTop;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor(diff * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.top = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transTopTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = this.elem.offsetTop;

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.top = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, Math.pow(Math.E, (pos + 1)/20)*speed);
		})();
	}
}

Animator.prototype.transLeft = function (diff, speed, outcome, args)
{
	var origin = this.elem.offsetLeft;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor(diff * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.left = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transLeftTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = this.elem.offsetLeft;

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.left = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}


Animator.prototype.transHeight = function (diff, speed, outcome, args, company)
{
	var origin = this.elem.offsetHeight;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor(diff * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.height = t + 'px';

						  if (company) company();

						  if (pos >= 100)
						  	if (outcome) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transHeightTo = function (target, speed, outcome, args, plot, company)
{
	clear_timeout(this.timeout);

	var origin = this.elem.offsetHeight;

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			var temp = Math.pow(Math.E, (pos + 1)/20)*speed;
			if (plot) temp = (pos + 1)*speed;

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.height = t + 'px';

						  if (company) company();

						  if (pos >= 100)
						  	if (outcome) outcome(args);

					  }, temp);
		})();
	}
}

Animator.prototype.transWidth = function (diff, speed, outcome, args)
{
	var origin = this.elem.offsetWidth;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor(diff * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.width = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transWidthTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = this.elem.offsetWidth;

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.width = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, Math.pow(Math.E, (pos + 1)/20)*speed);
		})();
	}
}

Animator.prototype.transZoomTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = Math.floor(this.elem.offsetWidth / this.elem.parentNode.offsetWidth * 100);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.width = t + '%';

						  var pixel = (that.elem.parentNode.offsetWidth - that.elem.offsetWidth) / 2;
						  that.elem.style.marginLeft = pixel + 'px';
						  pixel = (that.elem.parentNode.offsetHeight - that.elem.offsetHeight) / 2;
						  that.elem.style.marginTop = pixel + 'px';

						  if (pos >= 100) outcome(args);

					  }, Math.pow(Math.E, (pos + 1)/20)*speed);
		})();
	}
}

Animator.prototype.transOpacity = function (target, speed, outcome, args)
{
	var origin = getStyle(this.elem, 'opacity') * 100;

	clear_timeout(this.timeout);

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  setOpacity(that.elem, t);

						  if (pos >= 100)
						  	if (outcome) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transMLeft = function (diff, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'marginLeft'));

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor(diff * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.marginLeft = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transMLeftTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'marginLeft'));

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.marginLeft = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transMTopTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'marginTop'));

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.marginTop = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transPTopTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'paddingTop'));

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.paddingTop = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.transPBotTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'paddingBottom'));

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.paddingBottom = t + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

Animator.prototype.expandPVerticalTo = function (target, speed, outcome, args)
{
	clear_timeout(this.timeout);

	var origin = parseInt(getStyle(this.elem, 'paddingTop'));
	var origin2 = parseInt(getStyle(this.elem, 'marginTop'));
	var target2 = target - origin;

	var that = this;

	for(var i = 0; i <= 100; i++)
	{
		(function()
		{
			var pos = i;
			var t = origin + Math.floor((target - origin) * pos / 100);
			var t2 = origin2 - Math.floor(target2 * pos / 100);

			that.timeout[i] = setTimeout(function()
					  {
						  that.elem.style.paddingTop = t + 'px';
						  that.elem.style.paddingBottom = t + 'px';
						  that.elem.style.marginTop = t2 + 'px';

						  if (pos >= 100) outcome(args);

					  }, (pos + 1)*speed);
		})();
	}
}

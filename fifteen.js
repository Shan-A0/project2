"use strict";
var div;
var spaceb;
var spacea;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	/*backimg=document.getElementId('puzzlearea').style.backgroundImage="url('http://www.vector-eps.com/wp-content/gallery/classic-cartoon-characters/classic-cartoon-vector19.jpg')";*/

	div = puzzlearea.getElementsByTagName('div');

	for (var n=0; n<div.length; n++)
	{
		div[n].className = 'puzzlepiece';
		div[n].style.left = (n%4*100)+'px';
		div[n].style.top = (parseInt(n/4)*100) + 'px';
		div[n].style.backgroundPosition= '-' + div[n].style.left + ' ' + '-' + div[n].style.top;
		div[n].onmouseover = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};
		div[n].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		div[n].onclick = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			}
		};
	}
	
	spacea = '300px';
	spaceb = '300px';

	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function() //shuffles the puzzle when clicked
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = calcUp(spacea, spaceb);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}
			if (rand == 1)
			{
				var tmp = calcDown(spacea, spaceb);
				if ( tmp != -1) 
				{
					swap(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = calcLeft(spacea, spaceb);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = calcRight(spacea, spaceb);
				if (tmp != -1)
				{
					swap(tmp);
				}
			}
		}
	};
};

function checkCanMove(pos) //checks if there is any posible moves
{
	if (calcLeft(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcDown(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcUp(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcRight(spacea, spaceb) == (pos-1))
	{
		return true;
	}
}


function youWin() //Tells the player when they have won
{
	alert('Y O U  W O N !');
}

function checkFinish()
{
	var flag = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt(div[i].style.top);
		var x = parseInt(div[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function calcLeft(x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);

	if (xx > 0)
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function calcRight (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (xx < 300)
	{
		for (var i =0; i<div.length; i++){
			if (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function calcUp (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy > 0)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function calcDown (x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy < 300)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (pos) {
	var temp = div[pos].style.top;
	div[pos].style.top = spaceb;
	spaceb = temp;

	temp = div[pos].style.left;
	div[pos].style.left = spacea;
	spacea = temp;
}


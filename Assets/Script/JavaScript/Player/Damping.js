#pragma strict

//===Public Var===
var coef : int = 5;
var x : float = 0.0;
var speed : float = 0.005;
var time : float = 5;

function Update () {
	x = x + speed;
	if(x>time) { x = 0; }
	
	transform.position.y = -5 + Damping( coef , x );
}

function OnGUI () {
	GUI.Box(Rect (0, 50, 150, 50), "damping : " + Damping( coef , x ) + "\n x : " + x );
}

//===Damping===
function Damping( arg1 : int , arg2 : float) : float {
	var result : float;

	result = Mathf.Exp(-arg2) * Mathf.Cos( arg1 * Mathf.PI * arg2 );
	
	return result;
}
#pragma strict

function Update () {
	//===Camera===
	GameObject.FindGameObjectWithTag("camera").transform.position.x = GameObject.FindGameObjectWithTag("Player").transform.position.x;
	GameObject.FindGameObjectWithTag("camera").transform.position.y = GameObject.FindGameObjectWithTag("Player").transform.position.y + 3;
}
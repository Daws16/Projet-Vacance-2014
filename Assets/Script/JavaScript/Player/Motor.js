#pragma strict

//=====Public Var=====
var life : int = 100;

var speed : float = 7.0;
var jumpSpeed : int = 8;

//=====Private Var=====
private var moveDirection : Vector2 = Vector2.zero;

private var backupSpeed : float;

private var doubleJumped : boolean = false;

private var canSprint : boolean = true;
private var doSprint : boolean = false;

private var changedDirection = false;

//=====Interface=====
function OnGUI () {
	GUI.Box(Rect (0, 0, 100, 50), "speed : " + parseInt(speed) + "\nsprint : " + canSprint);
}

//=====Function=====
function Sprint () {
	canSprint = false;
	doSprint = true;
	speed *= 2;
	(gameObject.GetComponent(TrailRenderer) as Renderer).enabled = true; //Activate Trail
	
	yield WaitForSeconds(2);	
	doSprint = false;
	(gameObject.GetComponent(TrailRenderer) as Renderer).enabled = false; //Desactivate Trail
	
	yield WaitForSeconds(13);
	canSprint = true;
}

//=====Awake=====
function Awake () {
	backupSpeed = speed;
}

//=====Update=====
function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	var airSpeed : float = speed /2;
	
	//===Sprint===
	if (canSprint) { if (Input.GetButtonDown("Fire2")) { // Then Sprint
		Sprint();
	}}
	
	//===Movement===
	if (controller.isGrounded) { // Player is grounded
		if (!changedDirection) { // Full speed
			moveDirection = Vector2(Input.GetAxis("Horizontal") * speed, 0);
		} else { // Half dpeed
			moveDirection = Vector2(Input.GetAxis("Horizontal") * airSpeed, 0);
		}
		
		//===Jump===
		doubleJumped = false;
		if (Input.GetButtonDown("Jump")) { // Then jump
			moveDirection.y = jumpSpeed;
		}
	} else { // Player is in air
		moveDirection.x = Input.GetAxis("Horizontal") * speed;
		
		//===Double Jump===
		if (!doubleJumped) { if (Input.GetButtonDown("Jump")) {
			doubleJumped = !doubleJumped;
			moveDirection.y = jumpSpeed;
		}}
		
		//===Fusionning Movement Vectors===
		moveDirection = Vector2(moveDirection.x, moveDirection.y);
	}
	
	//===Speed Regulation===
	if (doSprint == false) { if (speed > backupSpeed) {
		speed -= 10 * Time.deltaTime;
	} else if (speed < backupSpeed) {
		speed = backupSpeed;
	}}
	
	//===Jump Regulation===
	moveDirection.y -= 20 * Time.deltaTime;
	
	//===Applying movement===
	controller.Move(moveDirection * Time.deltaTime);	
}
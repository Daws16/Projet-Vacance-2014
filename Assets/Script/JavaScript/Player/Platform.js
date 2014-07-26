#pragma strict

function Update () {

}

//===On Trigger Enter===
function OnTriggerEnter ( other:Collider ){
            if  (other.gameObject.tag == "platform" ) {
            transform.parent = other.transform;
        }
    }
 
//===On Trigger Exit===
function OnTriggerExit ( other:Collider ) {
    if ( other.gameObject.tag == "platform" ) {
            transform.parent = null;
        }
    }   
package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

object TreatController extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def getPossibleTreats(id : Long) = Action {
  	val json: JsValue = Json.parse("""
	{
	  "user": {
	    "name" : "toto",
	    "age" : 25,
	    "email" : "toto@jmail.com",
	    "isAlive" : true,
	    "friend" : {
	      "name" : "tata",
	      "age" : 20,
	      "email" : "tata@coldmail.com"
	    }
	  }
	}
	""")
	Ok(Json.stringify(json))
  }

}
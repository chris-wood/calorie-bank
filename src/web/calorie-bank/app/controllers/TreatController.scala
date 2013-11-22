package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

// Our custom things
import models.Treat

object TreatController extends Controller {

	var seeded = false;

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def seed() {
  	val t1 = new Treat("cookie", 200)
  	Treat.insert(t1)
  	val t2 = new Treat("brownie", 400)
  	Treat.insert(t2)
  	val t3 = new Treat("latte", 150)
  	Treat.insert(t3)
  	seeded = true;
  }

  def getPossibleTreats(calorieCap : Long) = Action {
  	if (!seeded) seed() 
  	Ok("" + Treat.findByTreatName("cookie").head.calories)

 	//  	val json: JsValue = Json.parse("""
	// {
	//   "treats": [
	//   	"treat" : {
	//   		name: Cookie,
	//   		calories: 100
	//   	}
	//   ]""")
	// Ok(Json.stringify(json))
  }

}
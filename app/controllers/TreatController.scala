package controllers

import play.api.mvc._
import play.api.libs.json._
// import securesocial.core.{Identity, Authorization}

// Our custom things
import models.Treat

object TreatController extends Controller { // with securesocial.core.SecureSocial {

	var seeded = false;

  // def index = Action { implicit request =>
  //   Ok(views.html.index(request.user))
  // }

  def seed() {
  	val t1 = new Treat("cookie", 200, 1)
  	Treat.insert(t1)
  	val t2 = new Treat("brownie", 400, 2)
  	Treat.insert(t2)
  	val t3 = new Treat("latte", 150, 3)
  	Treat.insert(t3)
  	seeded = true;
  }

  def getPossibleTreats(calorieCap : String) = Action { //SecuredAction {
  	if (!seeded) seed() 
  	Ok("" + Treat.findByTreatName("cookie").head.calories)

    // TODO: in reality, we need to fetch this user's remaining calories, build a query that returns all treats below that limit, and then return a list of the treat objects jsonified

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

  // you don't want to redirect to the login page for ajax calls so
  // adding a ajaxCall = true will make SecureSocial return a forbidden error
  // instead.
  // def ajaxCall = SecuredAction(ajaxCall = true) { implicit request =>
  //   // return some json
  // }   

}

// An Authorization implementation that only authorizes uses that logged in using twitter
// case class WithProvider(provider: String) extends Authorization {
//   def isAuthorized(user: Identity) = {
//     user.identityId.providerId == provider
//   }
// }
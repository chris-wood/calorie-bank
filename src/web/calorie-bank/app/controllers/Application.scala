package controllers

import play.api._
import play.api.mvc._
import securesocial.core.{Identity, Authorization}

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }
}

// An Authorization implementation that only authorizes uses that logged in using twitter
case class WithProvider(provider: String) extends Authorization {
  def isAuthorized(user: Identity) = {
    user.identityId.providerId == provider
  }
}
package controllers

import play.api._
import play.api.mvc._
import securesocial.core.{Identity, Authorization}

object Application extends Controller with securesocial.core.SecureSocial {

// def index = Ok(views.html.index(Nil))

  def index = SecuredAction { implicit request =>
    Ok(views.html.index(request.user))
  }
}

// An Authorization implementation that only authorizes uses that logged in using twitter
case class WithProvider(provider: String) extends Authorization {
  def isAuthorized(user: Identity) = {
  	true
    // user.identityId.providerId == provider
  }
}
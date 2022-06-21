package todaysmusic.spotifyrecommendation.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.view.RedirectView
import se.michaelthelin.spotify.SpotifyApi
import se.michaelthelin.spotify.SpotifyHttpManager
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest
import java.net.URI
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/api")
class AuthController() {

    @Value("\${client.id}")
    private var clientId: String? = null

    @Value("\${client.secret}")
    private var clientSecret: String? = null

    private val redirectURI: URI = SpotifyHttpManager.makeUri("http://localhost:8080/api/get-user-code")
    private var code: String = ""

    private var spotifyApi: SpotifyApi? = null

    @PostConstruct
    fun buildSpotifyApi() {
        spotifyApi = SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRedirectUri(redirectURI)
            .build()
    }

    @GetMapping("login")
    fun spotifyLogin(): RedirectView {

        buildSpotifyApi()

        var authorizationCodeUriRequest: AuthorizationCodeUriRequest = spotifyApi!!.authorizationCodeUri()
            .scope("user-read-private, user-read-email, user-top-read")
            .show_dialog(true)
            .build()
        val uri: URI = authorizationCodeUriRequest.execute()

        val redirectView: RedirectView = RedirectView()
        redirectView.url = uri.toString()

        return redirectView
    }

    @GetMapping("get-user-code")
    fun getUserCodes(
        @RequestParam("code") userCode: String,
        response: HttpServletResponse
    ) : HashMap<String, Any> {
        code = userCode
        val authorizationRequest: AuthorizationCodeRequest = spotifyApi!!.authorizationCode(code)
            .build()

        val authorizationCodeCredentials: AuthorizationCodeCredentials = authorizationRequest.execute()

        val map: HashMap<String, Any> = HashMap()
        map["token_type"] = authorizationCodeCredentials.tokenType
        map["access_token"] = authorizationCodeCredentials.accessToken
        map["refresh_token"] = authorizationCodeCredentials.refreshToken
        map["scope"] = authorizationCodeCredentials.scope
        map["expires_in"] = authorizationCodeCredentials.expiresIn

        response.sendRedirect("http://localhost:8080/api/gohome")
        return map
    }

    @GetMapping("gohome")
    fun goHome(): ModelAndView {
        val pg:ModelAndView = ModelAndView("home")
        return pg
    }

}


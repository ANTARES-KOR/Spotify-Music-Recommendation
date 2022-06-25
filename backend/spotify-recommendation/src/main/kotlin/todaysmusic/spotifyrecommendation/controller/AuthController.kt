package todaysmusic.spotifyrecommendation.controller;

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity
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
import todaysmusic.spotifyrecommendation.service.MemberService
import java.net.URI
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/api")
class AuthController(
    private var memberController: MemberController,
    private var memberService: MemberService
) {

    @Value("\${client.id}")
    private var clientId: String? = null

    @Value("\${client.secret}")
    private var clientSecret: String? = null

//    private val redirectURI: URI = SpotifyHttpManager.makeUri("http://localhost:8080/api/get-token")
//    private val redirectURI: URI = SpotifyHttpManager.makeUri("http://localhost:8080/api/auth/callback/spotify")
    private val redirectURI: URI = SpotifyHttpManager.makeUri("http://localhost:3000/loading")
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
    fun spotifyLogin(): String {

        buildSpotifyApi()

        val authorizationCodeUriRequest: AuthorizationCodeUriRequest = spotifyApi!!.authorizationCodeUri()
            .scope("user-read-private, user-read-email, user-top-read, streaming")
            .show_dialog(true)
            .build()
        val uri: URI = authorizationCodeUriRequest.execute()

        val redirectView: RedirectView = RedirectView()
        redirectView.url = uri.toString()

        return uri.toString()
    }

    @GetMapping("get-token")
    @ResponseBody
    @CrossOrigin(origins = arrayOf("*"), allowedHeaders = arrayOf("*"))
//    @GetMapping("auth/callback/spotify")
    fun getUserCodes(
        @RequestParam("code") userCode: String,
        response: HttpServletResponse
    ) :
            HashMap<String, String>
    {
        code = userCode
        println(code)
        val authorizationRequest: AuthorizationCodeRequest = spotifyApi!!.authorizationCode(code)
            .build()

        val authorizationCodeCredentials: AuthorizationCodeCredentials = authorizationRequest.execute()

        val map: HashMap<String, String> = HashMap()
        map["token_type"] = authorizationCodeCredentials.tokenType
        map["access_token"] = authorizationCodeCredentials.accessToken
        map["refresh_token"] = authorizationCodeCredentials.refreshToken
        map["scope"] = authorizationCodeCredentials.scope
        map["expires_in"] = authorizationCodeCredentials.expiresIn.toString()
        println(authorizationCodeCredentials.accessToken)

        val res:ResponseEntity<String> = memberService.getAndSaveUserInfoByAccessToken(map)
        println(res)

        return map
    }

    @GetMapping("gohome")
    fun goHome(): ModelAndView {
        val pg:ModelAndView = ModelAndView("home")
        return pg
    }




}




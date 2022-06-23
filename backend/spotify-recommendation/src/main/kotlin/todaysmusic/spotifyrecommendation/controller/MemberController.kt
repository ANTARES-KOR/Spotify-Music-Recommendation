package todaysmusic.spotifyrecommendation.controller

import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate


@RestController
class MemberController {

    @PostMapping("/info")
    fun getAndSaveUserInfoByAccessToken (
        @RequestBody map: HashMap<String, String>
    ) : ResponseEntity<String> {
        val accessToken: String? = map["accessToken"]

        println(accessToken)

        val requestUri: String = "https://api.spotify.com/v1/me"
        val restTemplate: RestTemplate = RestTemplate()
        val headers: HttpHeaders = HttpHeaders()

        headers.contentType = MediaType.APPLICATION_JSON
        headers.set("Authorization", "Bearer $accessToken")

        val request: HttpEntity<Any> = HttpEntity<Any>(headers)

        var response: ResponseEntity<String> = restTemplate.exchange(
            requestUri,
            HttpMethod.GET,
            request,
            String::class.java
            )

        return response
    }
}
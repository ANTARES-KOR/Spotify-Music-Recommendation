package todaysmusic.spotifyrecommendation.controller

import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import todaysmusic.spotifyrecommendation.domain.Member
import todaysmusic.spotifyrecommendation.service.MemberService


@RestController
class MemberController(
    private var memberService: MemberService
) {

    @GetMapping("/token/validate")
    fun checkTokenValidate(
        @RequestHeader(value = "Authorization") accessToken: String): Boolean {
        val isValid: Boolean = memberService.checkTokenValidation(accessToken.replace("Bearer ", ""))
        return isValid
    }

}
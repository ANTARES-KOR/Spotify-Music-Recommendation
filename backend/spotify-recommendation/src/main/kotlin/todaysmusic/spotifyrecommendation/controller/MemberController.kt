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
        @RequestHeader(value = "Authorization") accessToken: String): ResponseEntity<Void> {

        val isValid: Boolean = memberService.checkTokenValidation(accessToken.replace("Bearer ", "").replace("\"", ""))
        if (!isValid) {
            return ResponseEntity<Void>(HttpStatus.BAD_REQUEST)
        }
        else {
            return ResponseEntity<Void>(HttpStatus.OK)
        }
    }

}
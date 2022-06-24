package todaysmusic.spotifyrecommendation.service

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.client.RestTemplate
import todaysmusic.spotifyrecommendation.domain.Member
import todaysmusic.spotifyrecommendation.repository.MemberRepository
import java.time.LocalDateTime

@Service
class MemberService(
    private var memberRepository: MemberRepository
) {

    fun getAndSaveUserInfoByAccessToken (
        @RequestBody map: HashMap<String, String>
    ) : ResponseEntity<String> {
        val accessToken: String? = map["access_token"]
        val refreshToken: String? = map["refresh_token"]

//        println("in Controller $map")
//        println("Token is $accessToken")

        val requestUri: String = "https://api.spotify.com/v1/me"
        val restTemplate: RestTemplate = RestTemplate()
        val headers: HttpHeaders = HttpHeaders()

        headers.contentType = MediaType.APPLICATION_JSON
        headers.set("Authorization", "Bearer $accessToken")

        val request: HttpEntity<Any> = HttpEntity<Any>(headers)

        val response: ResponseEntity<String> = restTemplate.exchange(
            requestUri,
            HttpMethod.GET,
            request,
            String::class.java
        )
        val result: Map<String, String>

        val mapper = jacksonObjectMapper()
        result = mapper.readValue(response.body, Map::class.java) as Map<String, String>

        val member: Member = Member()
        member.displayName = result["display_name"].toString()
        member.email = result["email"].toString()
        if (accessToken != null) {
            member.accessToken = accessToken
        }
        if (refreshToken != null) {
            member.refreshToken = refreshToken
        }
        member.expiresAt = LocalDateTime.now().plusHours(1)

        val present: Boolean = validateDuplicateMember(member)
        if (present) {
            return response
        }
        memberRepository.save(member)

        return response
    }

    private fun validateDuplicateMember(member: Member): Boolean {
        (return memberRepository.findMemberByDisplayName(member.displayName) == null)
    }

    fun checkTokenValidation(accessToken: String): Boolean {
        val member: Member = memberRepository.findMemberByAccessToken(accessToken) ?: return false
        return member.expiresAt?.isAfter(LocalDateTime.now()) == true
    }
}
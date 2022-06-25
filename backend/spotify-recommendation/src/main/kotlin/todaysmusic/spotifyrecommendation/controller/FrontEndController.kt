import todaysmusic.spotifyrecommendation.domain.Member
import todaysmusic.spotifyrecommendation.repository.MemberRepository
import todaysmusic.spotifyrecommendation.service.MemberService


import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import todaysmusic.spotifyrecommendation.domain.Track
import todaysmusic.spotifyrecommendation.domain.UserFilter
import todaysmusic.spotifyrecommendation.repository.UserFilterRepository
import todaysmusic.spotifyrecommendation.service.TrackService
import java.util.*

@RestController
@RequestMapping("/api")
class FrontEndController(
    @Autowired val userFilterRepository: UserFilterRepository,
    @Autowired val trackService: TrackService,
    val memberService: MemberService,
    val memberRepository: MemberRepository
) {

    @GetMapping("/getFilterInitTrack")
    fun responseInitTrack(): ResponseEntity<Any>{
        return ResponseEntity.ok().body(trackService.getInitFilterList())
    }

    @GetMapping("/getRecommandTrackList")
    fun responseRecommandTrackList(
        @RequestHeader(value = "Authorization") accessToken : String
    ): Any{
        // 코드 확인
        val token : String = accessToken.replace("Bearer ","").replace("\"","")
        println(token)

        if(memberService.checkTokenValidation(token)){
            val member : Member? = memberRepository.findMemberByAccessToken(token)
            if(member !=null){
                val userFilter = userFilterRepository.findUserFilterByDisplayName(member.displayName)
                if(userFilter!=null){
                    val requestUri: String = "http://spoti-publi-813mgem2jt2r-1181560969.ap-northeast-2.elb.amazonaws.com/model/cbr"
                    val restTemplate: RestTemplate = RestTemplate()
                    val headers = HttpHeaders()
                    headers.add("Content-Type","application/json")


                    val multiValueMap : HashMap <String, Any> = HashMap()
                    multiValueMap["music"] = userFilter!!.music
                    multiValueMap["mood"] = userFilter.mood
                    multiValueMap["speed"] = userFilter.speed
                    multiValueMap["emotion"] = userFilter.emotion
                    val request: HttpEntity<HashMap<String, Any>> = HttpEntity(multiValueMap, headers)


                    println(request)
                    var response : ResponseEntity<String> =restTemplate.exchange(
                        requestUri,
                        HttpMethod.POST,
                        request,
                        String::class.java
                    )
                    println(response.body)

                    val objMapper  = ObjectMapper()
                    var trackArr : List<Track>? = objMapper.readValue(response.body.toString())

                    println(trackArr?.get(0)?.track_name)
                    println(trackArr?.get(0)?.duration_ms)
                    println(trackArr?.get(0)?.album_image)
                    println(trackArr?.get(0)?.artist_name)
                    println(trackArr?.get(0)?.uri)
                    println(response.body)
                    return ResponseEntity.ok().body(trackArr)
                }

            }

        }
            return ResponseEntity<Void>(HttpStatus.NOT_FOUND)
    }


    @PostMapping("/saveUserFilter")
    fun saveUserFilter(
        @RequestBody userFilter: UserFilter,
        @RequestHeader(value = "Authorization") accessToken : String
    ) : Any {
        val token : String = accessToken.replace("Bearer ","").replace("\"","")
        println(token)
        // 토큰
        if(memberService.checkTokenValidation(token)){
            trackService.saveUserFilter(userFilter,token)
        }

        return ResponseEntity.ok("success")
    }

}
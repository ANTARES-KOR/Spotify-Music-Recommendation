package todaysmusic.spotifyrecommendation.Api.Controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import todaysmusic.spotifyrecommendation.Api.Domain.UserFilter
import todaysmusic.spotifyrecommendation.Api.Domain.FilterInitData
import todaysmusic.spotifyrecommendation.Api.Domain.Track
import todaysmusic.spotifyrecommendation.Api.Repository.UserFilterRepository
import todaysmusic.spotifyrecommendation.Api.Service.TrackService

@RestController
class FrontEndController(
    @Autowired val userFilterRepository: UserFilterRepository,
    @Autowired val trackService: TrackService
) {

    @GetMapping("/getFilterInitTrack")
    fun responseInitTrack(): ResponseEntity<Any>{
        val stringList: List<String> = listOf(
            "spotify:track:4Dvkj6JhhA12EX05fT7y2e",
            "spotify:track:75FEaRjZTKLhTrFGsfMUXR",
            "spotify:track:6Sq7ltF9Qa7SNFBsV5Cogx",
            "spotify:track:6xGruZOHLs39ZbVccQTuPZ",
            "spotify:track:3k3NWokhRRkEPhCzPmV8TW"
        )
        var answerFilterData = FilterInitData(stringList)
        return ResponseEntity.ok().body(answerFilterData)
    }

    @PostMapping("/saveUserFilter")
    fun saveUserFilter(
        @RequestBody userFilter : UserFilter,
        @RequestParam token : String
    ) : Any {
        println(token)
        // 토큰
        trackService.saveUserFilter(userFilter)
        return ResponseEntity.ok("success")
    }

    @GetMapping("/getPlayList")
    fun getPlayList(
        @RequestParam token : String
    ) : ResponseEntity<Any>{
        //토큰 유효 확인

        //userFilter가 있다면
        if(userFilterRepository.findUserFilterByUserEmail("bell1902@naver.com") !=null) {
            //model로 request
            return ResponseEntity.ok().body("track is now")
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("")
        }
    }

    @PostMapping("/putPreferenceTrack")
    fun putPreferenceTrack(
        @RequestParam token : String,
        @RequestBody track : Track
    ) : ResponseEntity<String>{
        //토큰이 유효 하다면 && Email을 꺼내 줘야 함
        trackService.putTrackPreference("bell1902@naver.com",track)
        return ResponseEntity.ok().body("success")
    }


}
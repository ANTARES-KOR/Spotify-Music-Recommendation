package todaysmusic.spotifyrecommendation.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import todaysmusic.spotifyrecommendation.domain.UserFilter
import todaysmusic.spotifyrecommendation.domain.FilterInitData
import todaysmusic.spotifyrecommendation.domain.Track
import todaysmusic.spotifyrecommendation.repository.UserFilterRepository
import todaysmusic.spotifyrecommendation.service.TrackService

@RestController
@RequestMapping("/api")
class FrontEndController(
    @Autowired val userFilterRepository: UserFilterRepository,
    @Autowired val trackService: TrackService
) {

    @GetMapping("/getFilterInitTrack")
    fun responseInitTrack(): ResponseEntity<Any>{
        return ResponseEntity.ok().body(trackService.getInitFilterList())
    }

    @GetMapping("/getRecommandTrackList")
    fun responseRecommandTrackList(
        @RequestParam code : String
    ): Any{
        // 코드 확인
        println(code)
        // 토큰 처리
        // 유저가 필터를 선택한 적이 있다면
        if(code  == "hi"){
            // model을 통해서 가져오기
            return ResponseEntity.ok().body("success")
        }else{
            // 없다면 error
//            return ResponseEntity.noContent().
//            he.status(HttpStatus.NOT_FOUND)
            return ResponseEntity.ok().body("non-success")
        }

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




}
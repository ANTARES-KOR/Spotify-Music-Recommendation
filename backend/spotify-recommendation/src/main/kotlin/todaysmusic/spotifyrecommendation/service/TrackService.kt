package todaysmusic.spotifyrecommendation.service

import org.springframework.stereotype.Service
import todaysmusic.spotifyrecommendation.domain.Member
import todaysmusic.spotifyrecommendation.domain.Track
import todaysmusic.spotifyrecommendation.domain.UserFilter
import todaysmusic.spotifyrecommendation.repository.MemberRepository
import todaysmusic.spotifyrecommendation.repository.PreferenceTrackRepository
import todaysmusic.spotifyrecommendation.repository.UserFilterRepository


//butter
//uri = spotify:track:4saklk6nie3yiGePpBwUoc
//artistname = BTS
//albumImg =  https://i.scdn.co/image/ab67616d0000b2733deb4b0115410a85afe31c29
//contentLength = 199054
//
//Oasis
//uri = spotify:track:4sa8O4AwMja6r1Enu35Fmz
//artistname = Crush
//albumImg = https://i.scdn.co/image/ab67616d0000b273c619210778ee5aad619703cd
//contentLength = 191279
//
//FANCY
//uri = spotify:track:60zxdAqWtdDu0vYsbXViA7
//artistname = TWICE
//albumImg = https://i.scdn.co/image/ab67616d0000b273f917c68dd4a3a36ec77f06ec
//contentLength = 213886
//
//Every End of the Day
//uri = spotify:track:5m2tbM2w8mG76uwFgla2iF
//artistname = IU
//albumImg = https://i.scdn.co/image/ab67616d0000b2739d991c33eee30c62473c22a8
//contentLength = 242207
//
//I Am You, You Are Me
//uri = spotify:track:75ai0ibymmqyCyaxwZuhnu
//artistname = ZICO
//albumImg = https://i.scdn.co/image/ab67616d0000b273e0124c9b7f7ec870a121a4f5
//contentLength = 213252
@Service
class TrackService(
    val userFilterRepository: UserFilterRepository,
    val memberRepository: MemberRepository
) {

    fun getInitFilterList() : List<Track>{
        var track1 = Track(null,"spotify:track:4saklk6nie3yiGePpBwUoc","Dynamite","BTS","https://i.scdn.co/image/ab67616d0000b2733deb4b0115410a85afe31c29",199054)
        var track2 =  Track(null,"spotify:track:4sa8O4AwMja6r1Enu35Fmz","Oasis","Crush","https://i.scdn.co/image/ab67616d0000b273c619210778ee5aad619703cd",191279)
        var track3 =  Track(null,"spotify:track:60zxdAqWtdDu0vYsbXViA7","FANCY","TWICE","https://i.scdn.co/image/ab67616d0000b273f917c68dd4a3a36ec77f06ec",213886)
        var track4 =  Track(null,"spotify:track:5m2tbM2w8mG76uwFgla2iF","Every End of the Day","IU","https://i.scdn.co/image/ab67616d0000b2739d991c33eee30c62473c22a8",242207)
        var track5 =  Track(null,"spotify:track:75ai0ibymmqyCyaxwZuhnu","I Am You, You Are Me","ZICO","https://i.scdn.co/image/ab67616d0000b273e0124c9b7f7ec870a121a4f5",213252)
        val returnTrackList = listOf(track1, track2,track3,track4,track5)
        return returnTrackList
    }

    fun saveUserFilter(userFilter: UserFilter, token : String): String {
        val member : Member? = memberRepository.findMemberByAccessToken(token)
        userFilter.displayName = member!!.displayName
        userFilterRepository.findUserFilterByDisplayName(member!!.displayName)?: userFilterRepository.save(userFilter)
        return "save success"
    }

//    fun putTrackPreference(userEmail: String, track: Track): String {
//        perferenceTrackRepository.findTrackByUserEmailAndTrackId(userEmail, track.trackId)
//            ?: perferenceTrackRepository.save(track)
//        return "success"
//    }

}
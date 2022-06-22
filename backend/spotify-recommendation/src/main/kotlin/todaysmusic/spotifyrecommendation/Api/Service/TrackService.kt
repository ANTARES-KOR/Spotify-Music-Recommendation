package todaysmusic.spotifyrecommendation.Api.Service

import org.springframework.stereotype.Service
import todaysmusic.spotifyrecommendation.Api.Domain.Track
import todaysmusic.spotifyrecommendation.Api.Domain.UserFilter
import todaysmusic.spotifyrecommendation.Api.Repository.PreferenceTrackRepository
import todaysmusic.spotifyrecommendation.Api.Repository.UserFilterRepository

@Service
class TrackService(
    val userFilterRepository: UserFilterRepository,
    val perferenceTrackRepository: PreferenceTrackRepository,
) {

    fun saveUserFilter(userFilter: UserFilter): String {
        userFilterRepository.findUserFilterByUserEmail(userFilter.userEmail)?: userFilterRepository.save(userFilter)
        return "save success"
    }

    fun putTrackPreference(userEmail: String, track: Track): String {
        perferenceTrackRepository.findTrackByUserEmailAndTrackId(userEmail, track.trackId)
            ?: perferenceTrackRepository.save(track)
        return "success"
    }

}
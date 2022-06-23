package todaysmusic.spotifyrecommendation.service

import org.springframework.stereotype.Service
import todaysmusic.spotifyrecommendation.domain.Track
import todaysmusic.spotifyrecommendation.domain.UserFilter
import todaysmusic.spotifyrecommendation.repository.PreferenceTrackRepository
import todaysmusic.spotifyrecommendation.repository.UserFilterRepository

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
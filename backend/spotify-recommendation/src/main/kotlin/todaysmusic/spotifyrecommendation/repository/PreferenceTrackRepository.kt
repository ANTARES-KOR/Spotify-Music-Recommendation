package todaysmusic.spotifyrecommendation.repository

import org.springframework.data.jpa.repository.JpaRepository
import todaysmusic.spotifyrecommendation.domain.Track

interface PreferenceTrackRepository : JpaRepository<Track, Long> {
//    fun findTrackByUserEmailAndTrackId(userEmail : String, TrackId : String): Track?
}
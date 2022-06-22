package todaysmusic.spotifyrecommendation.Api.Repository

import org.springframework.data.jpa.repository.JpaRepository
import todaysmusic.spotifyrecommendation.Api.Domain.Track

interface PreferenceTrackRepository : JpaRepository<Track, Long> {
    fun findTrackByUserEmailAndTrackId(userEmail : String, TrackId : String):Track?
}
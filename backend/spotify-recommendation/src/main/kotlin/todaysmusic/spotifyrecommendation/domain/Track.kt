package todaysmusic.spotifyrecommendation.domain

import todaysmusic.spotifyrecommendation.domain.Enum.Preference
import javax.persistence.*
import javax.transaction.Transactional

@Entity
@Transactional
class Track(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id : Long? = null,
    var uri : String,
    var track_name : String,
    @Column(name ="artist_name")
    var artist_name : String,
    @Column(name = "album_img")
    var album_image : String,
    @Column(name ="duration_ms")
    var duration_ms : Long
)
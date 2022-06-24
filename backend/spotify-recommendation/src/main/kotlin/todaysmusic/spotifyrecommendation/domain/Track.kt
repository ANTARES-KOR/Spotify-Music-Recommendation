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
    var title : String,
    @Column(name ="artist_name")
    var artistName : String,
    @Column(name = "album_img")
    var albumImg : String,
    @Column(name ="content_length")
    var contentLength : Long

)
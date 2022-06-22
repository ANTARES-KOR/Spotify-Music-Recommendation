package todaysmusic.spotifyrecommendation.Api.Domain

import todaysmusic.spotifyrecommendation.Api.Domain.Enum.Preference
import javax.persistence.*
import javax.transaction.Transactional

@Entity
@Transactional
class Track(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id : Long? = null,
    @Column(name = "user_name")
    var userName : String? = null,
    @Column(name = "user_email")
    var userEmail : String,
    @Column(name ="tack_name")
    var trackName : String,
    @Column(name = "track_id")
    var trackId : String,
    @Enumerated(EnumType.STRING)
    var preferences : Preference

)
package todaysmusic.spotifyrecommendation.domain

import javax.persistence.*
import javax.transaction.Transactional

@Entity
@Transactional
@Table(name = "user_filter")
class UserFilter(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(name = "user_name")
    var userName: String? = null,
    @Column(name = "user_email")
    var userEmail : String,
    @Column(name = "selected_track")
    var selectedTrack: String,
    var atmosphere: String,
    var tempo: String,
    var emotion: String,
)
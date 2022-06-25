package todaysmusic.spotifyrecommendation.domain

import javax.persistence.*
import javax.transaction.Transactional


//{
//    "mood":1,
//    "emotion":2,
//    "speed":1,
//    "music":1
//}
@Entity
@Transactional
@Table(name = "user_filter")
class UserFilter(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(name = "display_name")
    var displayName: String?,
    var email : String?,
    var music: String,
    var mood: Int,
    var speed: Int,
    var emotion: Int
)

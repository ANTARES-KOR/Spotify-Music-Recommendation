package todaysmusic.spotifyrecommendation.domain

import lombok.Getter
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.*


@Entity
class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0

    @Column(name = "display_name")
    var displayName: String = ""

    var email: String = ""

    @Column(name = "access_token")
    var accessToken: String = ""

    @Column(name = "refresh_token")
    var refreshToken: String = ""

    @Column(name = "expires_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    var expiresAt: LocalDateTime? = null

}
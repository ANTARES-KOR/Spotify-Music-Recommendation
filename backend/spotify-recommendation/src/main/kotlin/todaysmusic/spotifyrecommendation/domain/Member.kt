package todaysmusic.spotifyrecommendation.domain

import lombok.Getter
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.Id


@Entity
@Getter
class Member {

    @Id
    var id: Int = 0

    var display_name: String = ""

    var email: String = ""

    var access_token: String = ""

    var refresh_token: String = ""

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    var expires_at: LocalDateTime = LocalDateTime.of(0,0,0,0,0,0)

}
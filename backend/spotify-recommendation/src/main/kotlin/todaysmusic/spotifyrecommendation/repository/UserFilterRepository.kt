package todaysmusic.spotifyrecommendation.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import todaysmusic.spotifyrecommendation.domain.UserFilter

@Repository
interface UserFilterRepository : JpaRepository<UserFilter,Long>{
    fun findUserFilterByUserEmail(userEmail : String) : UserFilter?
}
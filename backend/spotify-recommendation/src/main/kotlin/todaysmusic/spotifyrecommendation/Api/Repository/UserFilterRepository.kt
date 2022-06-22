package todaysmusic.spotifyrecommendation.Api.Repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import todaysmusic.spotifyrecommendation.Api.Domain.UserFilter

@Repository
interface UserFilterRepository : JpaRepository<UserFilter,Long>{
    fun findUserFilterByUserEmail(userEmail : String) : UserFilter?
}
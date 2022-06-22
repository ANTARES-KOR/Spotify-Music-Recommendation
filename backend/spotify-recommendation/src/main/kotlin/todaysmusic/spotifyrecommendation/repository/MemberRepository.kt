package todaysmusic.spotifyrecommendation.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import todaysmusic.spotifyrecommendation.domain.Member
import javax.persistence.EntityManager

@Repository
interface MemberRepository: CrudRepository<Member, Int> {

    fun findMemberById(id: Int): Member?

    fun findMemberByAccessToken(access_token: String): Member?
}
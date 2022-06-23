package todaysmusic.spotifyrecommendation.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import todaysmusic.spotifyrecommendation.domain.Member

@Repository
interface MemberRepository: JpaRepository<Member, Int> {
    fun findMemberByAccessToken(accessToken: String) : Member?
}
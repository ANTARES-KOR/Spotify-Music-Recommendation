package todaysmusic.spotifyrecommendation.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import todaysmusic.spotifyrecommendation.domain.Member

@Repository
interface MemberRepository: JpaRepository<Member, Int> {
    fun findMemberByAccessToken(accessToken: String) : Member?

    fun findMemberByDisplayName(displayName: String) : Member?

//    @Query("select m from Member m where m.accessToken = :accessToken")
//    fun findUserBy
}
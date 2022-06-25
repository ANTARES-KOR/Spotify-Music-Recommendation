package todaysmusic.spotifyrecommendation.domain

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class SampleMusic {

    @Column(name="artist_name")
    var artistName: String = ""

    @Column(name="track_name")
    var trackName: String = ""

    @Column(name="album_name")
    var albumName: String = ""

    @Id
    @Column(name= "album_image")
    var albumImage: String = ""
}
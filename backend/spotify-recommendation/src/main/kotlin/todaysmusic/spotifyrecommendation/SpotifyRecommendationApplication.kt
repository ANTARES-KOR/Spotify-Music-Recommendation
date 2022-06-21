package todaysmusic.spotifyrecommendation

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource
import todaysmusic.spotifyrecommendation.controller.AuthController

@SpringBootApplication
@PropertySource("classpath:/env.properties")
class SpotifyRecommendationApplication

fun main(args: Array<String>) {

	runApplication<SpotifyRecommendationApplication>(*args)

}

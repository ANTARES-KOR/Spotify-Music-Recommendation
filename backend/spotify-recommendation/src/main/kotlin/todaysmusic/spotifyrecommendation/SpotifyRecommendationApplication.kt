package todaysmusic.spotifyrecommendation

<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource
import todaysmusic.spotifyrecommendation.controller.AuthController
=======
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import todaysmusic.spotifyrecommendation.Api.Domain.testResult
import todaysmusic.spotifyrecommendation.Api.requestTest.testRequest
>>>>>>> Stashed changes

@SpringBootApplication
@PropertySource("classpath:/env.properties")
class SpotifyRecommendationApplication

fun main(args: Array<String>) {

	runApplication<SpotifyRecommendationApplication>(*args)
<<<<<<< Updated upstream

=======
//	requestAnyJson()
>>>>>>> Stashed changes
}

//fun requestAnyJson() : String{
//
//	val result  = HashMap<String, Any>()
//	var jsonInString = ""
//
//
//	val restTemplate= RestTemplate()
//
//	val headers = HttpHeaders()
//
//	val entity = HttpEntity<Map<String, Any>>(headers)
//	val url = "https://jsonplaceholder.typicode.com/albums"
//	val resultMap : ResponseEntity<List<*>>
//			= restTemplate.exchange(url, HttpMethod.GET, entity, List::class.java)
//
//	result.put("statusCode", resultMap.getStatusCodeValue()); //http status code를 확인
//	println(result.get("statusCode"))
//	result.put("header", resultMap.getHeaders()); //헤더 정보 확인
//	println(result.get("header"))
//	resultMap.body?.let { result.put("body", it) };
//	println("hi"+ listOf(result.get("body")).get(0))
//
//	val mapper = ObjectMapper()
//
//	jsonInString = mapper.writeValueAsString(resultMap.body);
//	val jsonArray = JSONTokener(resultMap.body).nextValue() as JSONArray
//
//	println(jsonInString)
//	return "something"
//}


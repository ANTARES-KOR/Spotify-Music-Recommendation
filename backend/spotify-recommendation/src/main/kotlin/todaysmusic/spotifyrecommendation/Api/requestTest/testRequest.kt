package todaysmusic.spotifyrecommendation.Api.requestTest

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.web.client.RestTemplate


class testRequest {

    fun requestAnyJson(): String {

        val result = HashMap<String, Any>()
        var jsonInString = ""
        val factory = HttpComponentsClientHttpRequestFactory()

        factory.setConnectTimeout(5000)
        factory.setReadTimeout(5000)

        val restTemplate = RestTemplate()

        val headers = HttpHeaders()

        val entity = HttpEntity<Map<String, Any>>(headers)
        val url = "https://jsonplaceholder.typicode.com/users"
        val resultMap: ResponseEntity<Map<*, *>> = restTemplate.exchange(url, HttpMethod.GET, entity, Map::class.java)

        result.put("statusCode", resultMap.getStatusCodeValue()); //http status code를 확인
        result.put("header", resultMap.getHeaders()); //헤더 정보 확인
        resultMap.body?.let { result.put("body", it) };


        val mapper = ObjectMapper()
        jsonInString = mapper.writeValueAsString(resultMap.getBody());
        println(jsonInString)
        return "something"
    }
}
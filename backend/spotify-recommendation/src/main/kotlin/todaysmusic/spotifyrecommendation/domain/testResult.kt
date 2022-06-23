package todaysmusic.spotifyrecommendation.domain

class testResult (
    val userId : Int,
    val id : Int,
    val title : String
//    val id : Int,
//    val name : String,
//    val userName : String,
//    val email : String,
//
//    val address : Address,
//    val phone : String,
//    val webstie : String,
//    val company : Company
    )

class Company(
    val name : String,
    val catchPhrase : String,
    val bs : String
)

class Address(
    val street : String,
    val suit : String,
    val city : String,
    val zipCode : String,
    val geo : Geo
)

class Geo(
    val lat : String,
    val lng : String
)
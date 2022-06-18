### 수집해야 할 데이터

- genre
- audio_features
- artist_type : group, duo, solo

### 수집할 방법

수집할 노래에 대한 spotify_id를 모은다.

- 어떻게 모을 것인가?
- getNewReleases로 모으기
- playlist 이용해서 모으기

해당 id를 가지고 get Several Tracks 와 get Track's audio features 를 진행한다.
다음으로 id가 같은 데이터에 대해서 union을 해주고, 이를 csv로 변환시켜서 저장한다.

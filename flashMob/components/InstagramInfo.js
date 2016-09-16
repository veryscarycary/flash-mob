module.exports = {
  AccessToken: '188455192.66ece46.068688c5cb1e4f26ac18e7bf1bef5f3c'
  ClientID: '66ece464d4af45e39f84036987366957',
  ClientSecret: '3202a8d63c4545e09f933cafe0d958e1'
}

curl -F 'client_id=66ece464d4af45e39f84036987366957' \
-F 'client_secret=3202a8d63c4545e09f933cafe0d958e1' \
-F 'grant_type=authorization_code' \
-F 'redirect_uri=http://localhost' \
-F 'code=49da424125ea45d9b968c8d2707041b7' \
https://api.instagram.com/oauth/access_token
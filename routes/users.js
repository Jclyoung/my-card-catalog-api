var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


passport.use(new AzureAdOAuth2Strategy({
  clientID: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
  callbackURL: 'https://www.example.net/auth/azureadoauth2/callback',
  resource: '00000002-0000-0000-c000-000000000000',
  tenant: 'contoso.onmicrosoft.com'
},
function (accessToken, refresh_token, params, profile, done) {
  var waadProfile = profile || jwt.decode(params.id_token, '', true);

  User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
    done(err, user);
  });
}));
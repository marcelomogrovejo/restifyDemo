TODO List:

- Add a custom error handlers.
- Add auth: http://passportjs.org/
 	https://github.com/appcom-interactive/passport-accesstoken
	
	https://github.com/jaredhanson/passport-oauth2-client-password
	https://github.com/jaredhanson/oauth2orize/blob/master/examples/express2/db/users.js
	
- Add token expiration date:
	Increment 1 day to currentDate to create expirationDate
	1. Using just JavaScript's Date object (no libraries):                        
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
	2. Using MomentJS:
		var today = moment();
		var tomorrow = moment(today).add('days', 1);
	3. Using DateJS, but it hasn't been updated in a long time:
		var today = new Date(); // Or Date.today()
		var tomorrow = today.add(1).day();

- Add random token:
	1. Hat
		var hat = require('hat');
		var id = hat();
		console.log(id); // 1c24171393dc5de04ffcb21f1182ab28
	2. Crypto
		var token = crypto.randomBytes(64).toString('hex');
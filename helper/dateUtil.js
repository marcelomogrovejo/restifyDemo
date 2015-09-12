'use strict';

module.exports = {
	
	/**
	 * Checks the given date is expired
	 */
	isExpiredDate : function(expirationDate) {
		var expired = false;
		var currentDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 1);
		if(expirationDate.getTime() < currentDate.getTime()) {
			expired = true;
		}
		return expired;
	}
	
}
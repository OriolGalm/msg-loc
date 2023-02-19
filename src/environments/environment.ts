// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LOGIN_URL: 'http://msg.messapp.site/api/login',
  REGISTER_URL: 'http://msg.messapp.site/api/register',
  UPDATE_USER: 'http://msg.messapp.site/api/update/',
  SHOW_USER: 'http://msg.messapp.site/api/show/',
  USER_NAME: 'http://msg.messapp.site/api/showname/',
  ALL_USERS: 'http://msg.messapp.site/api/showall/',
  CHANGE_IMG: 'http://msg.messapp.site/api/image/',
  CLOUD_IMG: 'https://api.cloudinary.com/v1_1/dfwiywprm/image/upload/',
  CREATE_MSG: 'http://msg.messapp.site/api/text/',
  GET_ID: 'http://msg.messapp.site/api/getid/',
  GET_MSG: 'http://msg.messapp.site/api/gettext/',
  BLOCK_USER: 'http://msg.messapp.site/api/block/',
  UNBLOCK_USER: 'http://msg.messapp.site/api/unblock/',
  GET_BLOCKED: 'http://msg.messapp.site/api/getblocked/',
  GET_NAME: 'http://msg.messapp.site/api/getname/',
  URL_IMG: `https://res.cloudinary.com/dfwiywprm/image/upload/v1673365846/message_api/`,
  DEFAULT_IMG: 'assets/img/clouds.jpg',
  GET_USER_BY_NAME: 'http://msg.messapp.site/api/userbyname/',
  NEW_MSG_NAME: 'http://msg.messapp.site/api/getnotread/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

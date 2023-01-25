// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LOGIN_URL: 'http://localhost:8080/api/login',
  REGISTER_URL: 'http://localhost:8080/api/register',
  UPDATE_USER: 'http://localhost:8080/api/update/',
  SHOW_USER: 'http://localhost:8080/api/show/',
  USER_NAME: 'http://localhost:8080/api/showname/',
  ALL_USERS: 'http://localhost:8080/api/showall/',
  CHANGE_IMG: 'http://localhost:8080/api/image/',
  CLOUD_IMG: 'https://api.cloudinary.com/v1_1/dfwiywprm/image/upload/',
  CREATE_MSG: 'http://localhost:8080/api/text/',
  GET_ID: 'http://localhost:8080/api/getid/',
  GET_MSG: 'http://localhost:8080/api/gettext/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

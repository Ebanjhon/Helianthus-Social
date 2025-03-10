const BASE_HOST = 'http://192.168.206.161:8888';

const auth_service = '/api/auth';
const user_service = '/api/user';
const feed_service = '/api/feed';
const commnet_service = '/api/comment';
const media_service = '/api/media';

const URL_API = {
  LOGIN: BASE_HOST + auth_service + '/login',
  REGISTER: BASE_HOST + auth_service + '/login',
  GET_PROFILE: BASE_HOST + user_service,
};

export default URL_API;

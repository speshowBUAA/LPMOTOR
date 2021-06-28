import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function fakeAccountRegist(params) {
  return request('/login/regist', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

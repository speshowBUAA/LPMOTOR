import request from '@/utils/request';
export async function saveAnnotaions(params) {
  return request('/api/saveAnnotation', {
    method: 'POST',
    data: params,
  });
}
import { saveAnnotaions } from '@/services/annotation';
import { message } from 'antd';
const AnnotationModel = {
  namespace: 'annotation',
  state: {
    status: undefined,
  },
  effects: {
    *save({ payload }, { call, put }) {
      const response = yield call(saveAnnotaions, payload);
      yield put({
        type: 'save',
        payload: response,
      });

      if (response.status === 'ok') {
        message.success('标注结果保存成功！');
      };
    },
  },
  reducers: {
    saveCurrentResult(state, action) {
      return { ...state, currentResult: action.payload || {} };
    },
  },
};
export default AnnotationModel;

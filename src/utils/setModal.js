import {showModal} from '../redux/common.slice';
import {store} from '../redux/store';

export const setModal = data => {
  store.dispatch(showModal(data));
};

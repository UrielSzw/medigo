import {showSpinner} from '../redux/common.slice';
import {store} from '../redux/store';

export const setSpinner = show => {
  store.dispatch(showSpinner(show));
};

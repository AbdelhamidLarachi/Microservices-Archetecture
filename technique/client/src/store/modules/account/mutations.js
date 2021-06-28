/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { FIND } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [FIND](state, account) {
    state.email = account.email;
    state.firstName = account.firstName;
    state.lastName = account.lastName;
  },
};

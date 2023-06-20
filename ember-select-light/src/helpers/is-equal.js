import { helper } from '@ember/component/helper';

export const isEqual = ([left, right]) => left === right;

export default helper(isEqual);

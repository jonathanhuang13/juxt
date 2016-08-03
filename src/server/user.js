import { extend } from './book';
export default extend('User', {
  tableName: 'users',
  hasTimestamps: true,
});

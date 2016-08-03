import { extend } from './book';
export default extend('Item', {
  tableName: 'items',
  hasTimestamps: true,
});
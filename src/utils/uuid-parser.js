import uuid from 'node-uuid';

export function uuidUnparse(id){
  const bytes = uuid.parse(id);
  return uuid.unparse(bytes);
}

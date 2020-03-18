export function saveAsset(item) {
  return {
    type: '@assets/SAVE',
    payload: { item }
  };
}

const INITIAL_STATE = {
  data: []
};

export default function assets(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@assets/SAVE':
      return { ...state, data: [...state.data, action.item] };
    default:
      return state;
  }
}

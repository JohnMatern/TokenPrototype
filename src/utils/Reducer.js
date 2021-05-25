const Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_INIT':
			return {
				...state,
				init: action.payload
			}
		case 'SET_WEB3':
			return {
				...state,
				web3: action.payload
			};
		case 'SET_PROVIDER':
			return {
				...state,
				provider: action.payload
			};
		case 'SET_ACCOUNT':
			return {
				...state,
				account: action.payload
			};
		case 'SET_MOKI':
			return {
				...state,
				moki: action.payload
			};
		default:
			return state;
	}
};

export default Reducer;
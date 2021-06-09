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
		case 'SET_NFT':
			return {
				...state,
				nft: action.payload
			};
		case 'SET_NFTADDRESS':
			return{ 
				...state, 
				nftaddress: action.payload
			};
			case 'SET_MODAL':
				return {
				  ...state,
				  modal: action.payload
				};
			  case 'SET_TX':
				return {
				  ...state,
				  tx: action.payload
				};
		  
		default:
			return state;
	}
};

export default Reducer;
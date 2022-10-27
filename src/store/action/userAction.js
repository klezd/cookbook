import '../../firebase-config';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	browserLocalPersistence,
	setPersistence,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { getDatabase, ref, child, set, get } from 'firebase/database';
import { prepareUserObjToUploadFirebase } from '../../utils';

import {
	LOGIN,
	LOGIN_WITH_GOOGLE,
	LOGIN_WITH_FACEBOOK,
	LOGOUT,
	SIGNUP,
	ADD_USER_INFO,
	GET_USER_INFO,
	GET_USER
} from '../types';

export const signup = (displayName, email, password) => async (dispatch) => {
	dispatch({
		type: `${SIGNUP}_PENDING`
	});

	const auth = getAuth();
	return await setPersistence(auth, browserLocalPersistence).then(() => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				// Signed in
				const user = res.user;
				// const token = res._tokenResponse.refreshToken;
				dispatch({
					type: `${SIGNUP}_SUCCESS`,
					payload: { user }
				});
				dispatch(
					addUserInfo({
						name: displayName,
						email: user.email
					})
				);
				return user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
				dispatch({
					type: `${SIGNUP}_ERROR`,
					payload: { email, errorCode, errorMsg: 'Email is not available' }
				});
				return { email, errorCode, errorMsg: errorMessage };
			});
	});
};

export const signin = (email, password) => async (dispatch) => {
	dispatch({
		type: `${LOGIN}_PENDING`
	});

	const auth = getAuth();
	return await setPersistence(auth, browserLocalPersistence).then(() => {
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				// Signed in
				const user = res.user;
				// const token = res._tokenResponse.refreshToken;
				dispatch({
					type: `${LOGIN}_SUCCESS`,
					payload: { user }
				});

				return user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
				dispatch({
					type: `${LOGIN}_ERROR`,
					payload: {
						email,
						errorCode,
						errorMsg: 'Email/ Password is incorrect'
					}
				});
				return { email, errorCode, errorMsg: errorMessage };
			});
	});
};

export const loginWithGoogleAction = () => async (dispatch) => {
	dispatch(loginWithExternalService(LOGIN_WITH_GOOGLE, 'google'));
};

export const loginWithFacebookAction = () => async (dispatch) => {
	dispatch(loginWithExternalService(LOGIN_WITH_FACEBOOK, 'facebook'));
};

export const loginWithExternalService = (type, platform) => {
	let provider = null;
	provider =
		platform == 'google'
			? new GoogleAuthProvider()
			: platform == 'facebook' && new FacebookAuthProvider();

	if (!provider) {
		return (dispatch) => {
			dispatch({
				type: type + '_ERROR',
				payload: { errorMsg: 'Provider is not supported' }
			});
		};
	}

	console.log(provider);
	const auth = getAuth();
	return async (dispatch) => {
		dispatch({
			type: `${type}_PENDING`
		});
		provider.setCustomParameters({
			display: 'popup'
		});

		return await setPersistence(auth, browserLocalPersistence)
			.then(() => {
				return signInWithPopup(auth, provider)
					.then((result) => {
						// token for providers
						let credential = null;
						credential =
							platform == 'google'
								? GoogleAuthProvider.credentialFromResult(result)
								: platform == 'facebook' &&
								  FacebookAuthProvider.credentialFromResult(result);

						const token = credential.accessToken;
						// The signed-in user info.
						const user = result.user;
						dispatch({
							type: `${type}_SUCCESS`,
							payload: {
								user,
								token
							}
						});
						// TODO
						dispatch(
							addUserInfo({
								name: user.displayName,
								email: user.email
							})
						);

						localStorage.clear();
						localStorage.setItem('token', token);
						localStorage.setItem('user', JSON.stringify(user));
						return { token, user };
					})
					.catch((error) => {
						// Handle Errors here.
						const errorCode = error.code;
						console.error(error.message);
						// The email of the user's account used.
						const email = error.email;
						// The AuthCredential type that was used.
						let credential = null;
						credential =
							platform == 'google'
								? GoogleAuthProvider.credentialFromResult(error)
								: platform == 'facebook' &&
								  FacebookAuthProvider.credentialFromResult(error);

						dispatch({
							type: `${type}_ERROR`,
							payload: {
								email,
								errorCode,
								errorMsg: `Failed to login with ${platform}`
							}
						});
						return {
							email,
							errorCode,
							errorMsg: `Failed to login with ${platform}`,
							credential
						};
					});
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				console.error(error.message);
				dispatch({
					type: `${type}_ERROR`,
					payload: { errorCode, errorMsg: `Failed to login with ${platform}` }
				});
				return { errorCode, errorMsg: `Failed to login with ${platform}` };
			});
	};
};

export const signout = () => (dispatch) => {
	dispatch({
		type: `${LOGOUT}_PENDING`
	});
	const auth = getAuth();

	signOut(auth)
		.then(() => {
			dispatch({
				type: `${LOGOUT}_SUCCESS`
			});
			dispatch(unauthorizeUser());
		})
		.catch((error) => {
			dispatch({
				type: `${LOGOUT}_ERROR`,
				payload: { errorCode: error.code, errorMsg: error.message }
			});
		});
};

export const unauthorizeUser = () => (dispatch) => {
	localStorage.clear();
	dispatch({ type: 'UNAUTHORIZE' });
};

export const getUser = () => (dispatch) => {
	const auth = getAuth();
	const user = auth.currentUser;
	user && localStorage.setItem('user', user);
	dispatch({
		type: GET_USER,
		payload: { user }
	});
	// dispatch(getUserInfo());
};

/**
 *
 * @param {Object} info = {name, email}
 * @returns
 */
const infoDefault = { name: null, email: null };
export function addUserInfo(info = infoDefault) {
	const data = prepareUserObjToUploadFirebase(info);
	return async (dispatch) => {
		dispatch({
			type: `${ADD_USER_INFO}_PENDING`
		});
		const auth = getAuth();

		const userId = auth.currentUser.uid;
		const db = getDatabase();

		try {
			set(ref(db, '/users/' + userId), data).then((r) => console.log(r));
		} catch (error) {
			dispatch({
				type: `${ADD_USER_INFO}_ERROR`,
				payload: { errorCode: error.code, errorMsg: error.message }
			});
		} finally {
			dispatch({
				type: `${ADD_USER_INFO}_SUCCESS`,
				payload: data
			});
			dispatch(getUserInfo());
		}
	};
}

export const getUserInfo = (id) => (dispatch) => {
	dispatch({
		type: `${GET_USER_INFO}_PENDING`,
		payload: { id }
	});

	let userId = id;
	const auth = getAuth();
	const user = auth.currentUser;

	userId = auth.currentUser.uid;

	if (!userId && user) {
		userId = user.uid;
	}

	if (!userId) return;

	const db = getDatabase();
	const dbRef = ref(db);

	get(child(dbRef, `users/${userId}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				dispatch({
					type: `${GET_USER_INFO}_SUCCESS`,
					payload: { data, userId }
				});
			} else {
				dispatch({
					type: `${GET_USER_INFO}_ERROR`,
					payload: {
						errorCode: 404,
						errorMsg: 'User info not found or is not updated yet.'
					}
				});
			}
		})
		.catch((error) => {
			console.error(error);
			dispatch({
				type: `${GET_USER_INFO}_ERROR`,
				payload: { errorCode: error.code, errorMsg: error.message }
			});
		});
};

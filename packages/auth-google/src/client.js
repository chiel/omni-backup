import GoogleLogin from './components/GoogleLogin';

export default function authGooglePlugin(omni) {
	omni.auth.addProvider('Google', GoogleLogin);
}

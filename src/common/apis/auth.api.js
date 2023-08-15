import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";



export const signupAPI = (values) => {
    try {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    onAuthStateChanged(auth, (user) => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                resolve({ message: 'Email varification sent.', user: user })
                            })
                            .catch((error) => {
                                reject({message: error.code });
                            });
                    });
                })
                .catch((error) => {
                    if (error.code.localeCompare('auth/email-already-in-use') === 0) {
                        reject({ message: 'Your email address already registered.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginAPI = (values) => {
    try {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user.emailVerified) {
                        resolve({ message: 'Login Completed', user: user });
                    } else {
                        reject({ message: 'Your added email is not verified.' })
                    }
                })
                .catch((error) => {
                    if (error.code.localeCompare('auth/user-not-found') === 0) {
                        reject({ message: 'Please enter your registred email address.' })
                    } else if (error.code.localeCompare('auth/wrong-password') === 0) {
                        reject({ message: 'Please enter valid password.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const passwordForgotAPI = (values) => {
    try {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    resolve({ message: 'Password reset email sent!' });
                })
                .catch((error) => {
                    if (error.code.localeCompare('auth/user-not-found') === 0) {
                        reject({ message: 'Please enter your registred email address.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const logoutAPI = () => {
    try {
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                resolve({ message: 'Successfully logout' });
            }).catch((error) => {
                reject({ message: error.code })
            });
        })
    } catch (error) {
        console.log(error)
    }
}
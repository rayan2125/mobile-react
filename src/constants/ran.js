import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const translations = {
    english: {
        languageTitle: 'Choose your language',
        languageSubtitle: 'Select preferred language',
        selectedLanguageLabel: 'Selected language',
        continue: 'Continue',
        english: 'English',
        englishNative: 'अंग्रेज़ी',
        hindi: 'हिन्दी',
        hindiNative: 'Hindi',
        signUpTitle: 'Sign up',
        signUpSubtitle: 'Create your account to book appointments quickly.',
        signInTitle: 'Sign in',
        signInSubtitle: 'Welcome back! Log in to continue.',
        fullNamePlaceholder: 'Full name',
        emailPlaceholder: 'Email address',
        passwordPlaceholder: 'Enter password',
        confirmPasswordPlaceholder: 'Confirm password',
        createAccount: 'Create account',
        signIn: 'Sign in',
        alreadyAccount: 'Already have an account?',
        dontHaveAccount: "Don't have an account?",
        forgotPassword: 'Forgot password?',
    },
    hindi: {
        languageTitle: 'अपनी भाषा चुनें',
        languageSubtitle: 'ऐप उपयोग करने के लिए अपनी पसंदीदा भाषा चुनें।',
        selectedLanguageLabel: 'चुनी गई भाषा',
        continue: 'जारी रखें',
        english: 'English',
        englishNative: 'अंग्रेज़ी',
        hindi: 'हिन्दी',
        hindiNative: 'Hindi',
        signUpTitle: 'साइन अप',
        signUpSubtitle: 'अपॉइंटमेंट जल्दी बुक करने के लिए अपना अकाउंट बनाएं।',
        signInTitle: 'साइन इन',
        signInSubtitle: 'वापस स्वागत है! जारी रखने के लिए लॉग इन करें।',
        fullNamePlaceholder: 'पूरा नाम',
        emailPlaceholder: 'ईमेल पता',
        passwordPlaceholder: 'पासवर्ड दर्ज करें',
        confirmPasswordPlaceholder: 'पासवर्ड की पुष्टि करें',
        createAccount: 'खाता बनाएँ',
        signIn: 'साइन इन',
        alreadyAccount: 'पहले से खाता है?',
        dontHaveAccount: 'क्या आपका खाता नहीं है?',
        forgotPassword: 'पासवर्ड भूल गए?',
    },
    hindi: {
        languageTitle: 'अपनी भाषा चुनें',
        languageSubtitle: 'ऐप उपयोग करने के लिए अपनी पसंदीदा भाषा चुनें।',
        selectedLanguageLabel: 'चुनी गई भाषा',
        continue: 'जारी रखें',
        english: 'English',
        englishNative: 'अंग्रेज़ी',
        hindi: 'हिन्दी',
        hindiNative: 'Hindi',
        signUpTitle: 'साइन अप',
        signUpSubtitle: 'अपॉइंटमेंट जल्दी बुक करने के लिए अपना अकाउंट बनाएं।',
        signInTitle: 'साइन इन',
        signInSubtitle: 'वापस स्वागत है! जारी रखने के लिए लॉग इन करें।',
        fullNamePlaceholder: 'पूरा नाम',
        emailPlaceholder: 'ईमेल पता',
        passwordPlaceholder: 'पासवर्ड दर्ज करें',
        confirmPasswordPlaceholder: 'पासवर्ड की पुष्टि करें',
        createAccount: 'खाता बनाएँ',
        signIn: 'साइन इन',
        alreadyAccount: 'पहले से खाता है?',
        dontHaveAccount: 'क्या आपका खाता नहीं है?',
        forgotPassword: 'पासवर्ड भूल गए?',
    },
};

export default function App() {
    const [language, setLanguage] = useState(null);
    const [view, setView] = useState('language');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const labels = translations[language] || translations.english;
    const [registeredAccount, setRegisteredAccount] = useState(null);
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);

    const isRegisterDisabled = !fullName.trim() || !email.trim() || !password || !confirmPassword;
    const isSignInDisabled = !email.trim() || !password.trim();

    const clearMessages = () => {
        setAuthError('');
        setSuccessMessage('');
    };

    const handleRegister = () => {
        if (isRegisterDisabled) {
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (password !== confirmPassword) {
            setAuthError('Passwords do not match.');
            setSuccessMessage('');
            return;
        }

        if (registeredAccount?.email === normalizedEmail) {
            setAuthError('An account with this email already exists.');
            setSuccessMessage('');
            return;
        }

        setRegisteredAccount({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password,
        });
        setAuthError('');
        setSuccessMessage('Account created successfully. Please sign in.');
        setFullName('');
        setPassword('');
        setConfirmPassword('');
        setView('signin');
    };

    const handleSignIn = () => {
        if (isSignInDisabled) {
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!registeredAccount) {
            setAuthError('No account found. Please sign up first.');
            setSuccessMessage('');
            return;
        }

        if (registeredAccount.email !== normalizedEmail || registeredAccount.password !== password) {
            setAuthError('Email or password is incorrect.');
            setSuccessMessage('');
            return;
        }

        setAuthError('');
        setSuccessMessage('');
        setSelectedRole(null);
        setView('dashboard');
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setView('roleSelected');
    };

    if (view === 'signin') {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#972f2f" />
                <View style={styles.registerContainer}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>{labels.signInTitle}</Text>
                        <Text style={styles.heroSubtitle}>{labels.signInSubtitle}</Text>
                    </View>

                    <View style={styles.formCard}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder={labels.emailPlaceholder}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#94a3b8"
                        />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            onFocus={clearMessages}
                            style={styles.input}
                            placeholder={labels.passwordPlaceholder}
                            secureTextEntry
                            placeholderTextColor="#94a3b8"
                        />

                        {authError ? <Text style={styles.errorText}>{authError}</Text> : null}
                        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

                        <TouchableOpacity style={styles.textButton} onPress={() => { }}>
                            <Text style={styles.forgotText}>{labels.forgotPassword}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.primaryButton, isSignInDisabled && styles.primaryButtonDisabled]}
                            onPress={handleSignIn}
                        >
                            <Text style={styles.primaryButtonText}>{labels.signIn}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.linkButton} onPress={() => setView('register')}>
                            <Text style={styles.linkText}>{labels.dontHaveAccount} {labels.createAccount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (view === 'register') {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={styles.registerContainer}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>{labels.signUpTitle}</Text>
                        <Text style={styles.heroSubtitle}>{labels.signUpSubtitle}</Text>
                    </View>

                    <View style={styles.formCard}>
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            style={styles.input}
                            placeholder={labels.fullNamePlaceholder}
                            placeholderTextColor="#94a3b8"
                        />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholder={labels.emailPlaceholder}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#94a3b8"
                        />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholder={labels.passwordPlaceholder}
                            secureTextEntry
                            placeholderTextColor="#94a3b8"
                        />
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.input}
                            placeholder={labels.confirmPasswordPlaceholder}
                            secureTextEntry
                            placeholderTextColor="#94a3b8"
                        />

                        {authError ? <Text style={styles.errorText}>{authError}</Text> : null}
                        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.primaryButton, isRegisterDisabled && styles.primaryButtonDisabled]}
                            onPress={handleRegister}
                        >
                            <Text style={styles.primaryButtonText}>{labels.createAccount}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.linkButton} onPress={() => setView('signin')}>
                            <Text style={styles.linkText}>{labels.alreadyAccount} {labels.signIn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (view === 'dashboard' && registeredAccount) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={styles.registerContainer}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>Welcome, {registeredAccount.fullName}</Text>
                        <Text style={styles.heroSubtitle}>Choose one role to continue:</Text>
                    </View>

                    <View style={styles.formCard}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.roleButton}
                            onPress={() => handleRoleSelect('Patient')}
                        >
                            <Text style={styles.primaryButtonText}>Patient</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.roleButton}
                            onPress={() => handleRoleSelect('Doctor')}
                        >
                            <Text style={styles.primaryButtonText}>Doctor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.primaryButton, styles.signOutButton]}
                            onPress={() => {
                                setView('signin');
                                setEmail('');
                                setPassword('');
                                setSuccessMessage('');
                                setAuthError('');
                            }}
                        >
                            <Text style={styles.primaryButtonText}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (view === 'roleSelected' && registeredAccount) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={styles.registerContainer}>
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>{selectedRole} Dashboard</Text>
                        <Text style={styles.heroSubtitle}>You are now using the {selectedRole.toLowerCase()} view.</Text>
                    </View>

                    <View style={styles.formCard}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.primaryButton}
                            onPress={() => setView('dashboard')}
                        >
                            <Text style={styles.primaryButtonText}>Back to dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.primaryButton, styles.signOutButton]}
                            onPress={() => {
                                setView('signin');
                                setEmail('');
                                setPassword('');
                                setSuccessMessage('');
                                setAuthError('');
                            }}
                        >
                            <Text style={styles.primaryButtonText}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <LinearGradient colors={['#48CAE4', '#CAF0F8']} style={styles.linearGradient}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require("./assets/logo.jpg")} style={{ height: 70, width: 70, resizeMode: 'contain', borderRadius: 100, top: 30 }} />

                    </View>
                    <Image source={require("./assets/dr.png")} style={{ height: 600, width: 300, resizeMode: 'contain', right: 20, bottom: 50 }} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.title}>{labels.languageTitle}</Text>
                            <Text style={styles.subtitle}>{labels.languageSubtitle}</Text>
                        </View>
                        {/* <Image source={require("./assets/dr.png")} style={{ height: 50, width: 50 ,right:50,top:50}} /> */}

                    </View>


                    {/* <View style={styles.optionsCard}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.optionRow, language === 'english' && styles.optionRowSelected]}
                            onPress={() => setLanguage('english')}
                        >
                            <View>
                                <Text style={styles.optionLabel}>{labels.english}</Text>
                                <Text style={styles.optionSubLabel}>{labels.englishNative}</Text>
                            </View>
                            <View style={[styles.circle, language === 'english' && styles.circleSelected]}>
                                {language === 'english' ? <Text style={styles.checkMark}>✓</Text> : null}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.optionRow, language === 'hindi' && styles.optionRowSelected]}
                            onPress={() => setLanguage('hindi')}
                        >
                            <View>
                                <Text style={styles.optionLabel}>{labels.hindi}</Text>
                                <Text style={styles.optionSubLabel}>{labels.hindiNative}</Text>
                            </View>
                            <View style={[styles.circle, language === 'hindi' && styles.circleSelected]}>
                                {language === 'hindi' ? <Text style={styles.checkMark}>✓</Text> : null}
                            </View>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.languageMeta}>
                        <Text style={styles.languageMetaText}>{labels.selectedLanguageLabel}⌄</Text>
                        {/* <Text style={styles.languageMetaValue}>{language ? (language === 'hindi' ? labels.hindi : labels.english) : 'None'}</Text> */}
                    </View>

                    {/* <TouchableOpacity
                        activeOpacity={0.85}
                        style={[styles.continueButton, !language && styles.continueButtonDisabled]}
                        onPress={() => {
                            if (!language) return;
                            setView('register');
                        }}
                    >
                        <Text style={styles.continueText}>{labels.continue}</Text>
                    </TouchableOpacity> */}
                </View>
            </LinearGradient>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: '#ff',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 28,
    },
    optionsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 16,
        shadowColor: '#0f172a',
        shadowOpacity: 0.05,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
        backgroundColor: '#ffffff',
    },
    optionRowSelected: {
        borderColor: '#2563eb',
        backgroundColor: '#ffffff',
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    optionSubLabel: {
        fontSize: 14,
        color: '#475569',
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleSelected: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    checkMark: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    languageMeta: {
        // marginTop: 50,
        bottom: 50,
        // padding: 16,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#0077B6',
        borderRadius: 100,
        // borderWidth: 2,
        // borderColor: '#DB1A1A',
        alignItems: 'center',
        elevation: 100
    },
    languageMetaText: {
        color: '#fff7f7',
        fontSize: 12,
        fontFamily: "monospace",
        fontWeight: "bold",
        marginBottom: 4,
    },
    languageMetaValue: {
        fontSize: 18,
        fontWeight: "heavy",
        color: '#0f172a',
    },
    continueButton: {
        marginTop: 24,
        backgroundColor: '#7e1c1c',
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: '#7e1c1c',
    },
    continueText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    registerContainer: {
        flex: 1,
        backgroundColor: '#5b1414',
        padding: 24,
    },
    heroSection: {
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
    },
    formCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.78)',
        borderRadius: 32,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.85)',
        shadowColor: '#0f172a',
        shadowOpacity: 0.16,
        shadowRadius: 28,
        shadowOffset: { width: 0, height: 18 },
        elevation: 10,
    },
    input: {
        height: 52,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.22)',
        paddingHorizontal: 18,
        marginBottom: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        color: '#0f172a',
    },
    primaryButton: {
        backgroundColor: '#2563eb',
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonDisabled: {
        backgroundColor: '#93c5fd',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    roleButton: {
        backgroundColor: '#2563eb',
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
    },
    signOutButton: {
        backgroundColor: '#dc2626',
        marginTop: 20,
    },
    textButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    forgotText: {
        color: '#2563eb',
        fontWeight: '700',
    },
    errorText: {
        color: '#b91c1c',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    successText: {
        color: '#166534',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    linkButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: '#2563eb',
        fontWeight: '700',
    },
});
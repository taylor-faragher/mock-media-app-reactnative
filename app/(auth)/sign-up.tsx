import { View, Text, ScrollView, Image, Alert } from "react-native"
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../constants';
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import {createUser} from "../../lib/appWrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {setUser, setIsLoggedIn} = useGlobalContext();


    const submit = async () => {
        if(!form.username || !form.email || !form.password) {
            Alert.alert('Error', "Please fill in all the fileds")
        }
        setIsSubmitting(true)
        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLoggedIn(true);
            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false);
        }
        createUser();
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85%] px-4 my-6">
                <Image 
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[115px] h-[35px"
                />
                <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>
                <FormField
                    title='Username'
                    value={form.username}
                    handleChangeText={(e) => setForm({...form, username: e})}
                    otherStyles='mt-10'
                    placeholder={'UserName'}
                />
                <FormField
                    title='Email'
                    value={form.email}
                    handleChangeText={(e) => setForm({...form, email: e})}
                    otherStyles='mt-7'
                    keyboardType="email-address"
                    placeholder={'Email'}
                />

                <FormField
                    title='Password'
                    value={form.password}
                    handleChangeText={(e) => setForm({...form, password: e})}
                    otherStyles='mt-7'
                    placeholder={'Password'}
                />
                <CustomButton title='SignUp' handlePress={submit} containerStyles='mt-7' textStyles={undefined} isLoading={isSubmitting}                    
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">Have an Account Already?</Text>
                    <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp;
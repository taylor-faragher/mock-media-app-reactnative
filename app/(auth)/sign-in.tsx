import { View, Text, ScrollView, Image, Alert } from "react-native"
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../constants';
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appWrite";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if(!form.email || !form.password) {
            Alert.alert('Error', "Please fill in all the fileds")
        }
        setIsSubmitting(true)
        try {
            const result = await signIn(form.email, form.password);
            //set to global state
            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false);
        }
        signIn();
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
                <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
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
                <CustomButton title='SignIn' handlePress={submit} containerStyles='mt-7' textStyles={undefined} isLoading={isSubmitting}                    
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                    <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn;
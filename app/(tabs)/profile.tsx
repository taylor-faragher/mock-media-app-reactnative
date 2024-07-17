import { View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import {icons, images} from '../../constants';
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appWrite";
import useAppWrite from "@/lib/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import GlobalProvider, { useGlobalContext } from "@/context/GlobalProvider";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
    const {query} = useLocalSearchParams();
    const {user, setUser, setIsLoggedIn} =  useGlobalContext();
    const {data: posts, refetch} = useAppWrite(() => getUserPosts(user.$id));

    const logout = async () => {
        await signOut();
        setUser(null)
        setIsLoggedIn(false)
        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className="bg-primary border -2 h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item, index}) => (
                    <VideoCard key={index} video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                            <Image 
                                source={icons.logout}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                                <Image 
                                    source={{ uri: user?.avatar }}
                                    className="w-[90%] h-[90%] rounded-lg"
                                    resizeMode="cover"
                                />
                            </View>
                            <InfoBox title={user?.username} subtitle='' containerStyles='m-5' titleStyles="text-lg" />
                            <View className="flex-row">
                                <InfoBox title={posts.length || 0} containerStyles='mr-10' titleStyles="text-xl" subtitle="Posts" />
                                <InfoBox title='1.2k'  titleStyles="text-xl" subtitle="Followers" containerStyles='' />

                            </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
                )}
            />
        </SafeAreaView>
    )
}

export default Profile;
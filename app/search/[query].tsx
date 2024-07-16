import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../../constants';
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/appWrite";
import useAppWrite from "@/lib/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
    const {query} = useLocalSearchParams();
    const {data: posts, refetch} = useAppWrite(() => searchPosts(query));

    useEffect(() => {
        refetch()
    }, [query])

    return (
        <SafeAreaView className="bg-primary border -2 h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item, index}) => (
                    <VideoCard key={index} video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6" >
                        <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
                        <Text className="text-2xl font-psemibold text-white">{query}</Text>
                        <View className="mt-6 mb-8">
                        <SearchInput initialQuery={query}/>

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

export default Search;
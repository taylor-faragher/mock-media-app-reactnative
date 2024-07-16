import { useState } from "react";
import { FlatList, ImageBackground, TouchableOpacity, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";

const zoomIn = {
    0: {
        opacity: 1,
        scale: 0.9,
    },
    1: {
        opacity: 1,
        scale: 1.5,
    },
};

const zoomOut = {
    0: {
        opacity: 1,
        scale: 1,
    },
    1: {
        opacity: 1,
        scale: 0.9,
    },
};


const TrendingItem = (activeItem, item) => {
    const [play, setPlay] = useState(false);
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
        {play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative flex justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                <ImageBackground
                    source={{uri: activeItem.item.thumbnail}}
                    className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
                    resizeMode="cover"
                />

                <Image
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode="contain"
                />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({posts}) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            horizontal
            renderItem={({item, index}) => (
                <TrendingItem key={item.$id} activeItem={activeItem} item={item}/>
            )}
            keyExtractor={(item) => item.$id}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}
        />
    )
}

export default Trending;
import { AppButton, AppText, ProductCard } from '@/components';
import { useProductQuery } from '@/hook/query/products';
import useUserStore from '@/storage/useUserStore';
import { ProductResponse } from '@/types/product.type';
import { HomeScreenProps } from '@/types/router.type';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Image, FlatList, ActivityIndicator, } from 'react-native';


export const HomeScreen = () => {
    const { user } = useUserStore()
    const { navigate } = useNavigation<HomeScreenProps>()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductQuery()
    console.log("product list: ", data)

    const renderRightIcon = () => {
        return (
            <Pressable onPress={() => navigate("Profile")} style={styles.imageContainer}>
                <Image
                    src={`${user?.image}`}
                    width={40}
                    height={40}
                    resizeMode='cover'
                    style={styles.image}
                />
            </Pressable>
        )
    }

    const products = useMemo(
        () => data?.pages.flatMap((page: ProductResponse) => page.products) ?? [],
        [data]
    )
    return (
        <View style={styles.container}>
            <AppText
                title='Home'
                textColor={"#F5824A"}
                textFontSize={34}
                textContainerStyle={styles.header}
                renderRightImage={renderRightIcon}
            />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductCard product={item} />}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage()
                    }
                }}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
        paddingHorizontal: 16
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8
    },
    imageContainer: {
        padding: 2,
        // borderWidth:1,
        borderRadius: 80
    },
    image: {
        borderRadius: 100
    }
})

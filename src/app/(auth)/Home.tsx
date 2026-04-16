import { BellIcon, SearchIcon } from '@/assets/icons';
import { AppButton, AppHeader, AppImage, AppText, AppTextInput, ProductCard } from '@/components';
import { Icon } from '@/components/Icon';
import { useProductQuery } from '@/hook/query/products';
import { usePaginationFlatList } from '@/hook/usePaginationFlatList';
import useUserStore from '@/storage/useUserStore';
import { HomeScreenProps } from '@/types/router.type';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Pressable, FlatList, ActivityIndicator, StatusBar, } from 'react-native';


export const HomeScreen = () => {
    const { user } = useUserStore()
    const { navigate } = useNavigation<HomeScreenProps>()

    const productQuery = useProductQuery()
    const {
        listData,
        onEndReached,
        onRefresh,
        refreshing,
        isFetchingNextPage
    } = usePaginationFlatList({
        query: productQuery,
        selectData: (page) => page.products
    })

    const renderRightIcon = () => {
        return (
            <Pressable onPress={() => navigate("Profile")} style={styles.imageContainer}>
                <AppImage
                    uri={`${user?.image}`}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Pressable>
        )
    }

    const renderSearch = () => {
        return (
            <AppTextInput
                placeHolder='Search'
                inputContainerStyle={styles.searchContaniner}
                renderPrefixIcon={<Icon name='SearchIcon' />}
                renderSuffixIcon={<Icon name='BellIcon' />}
            />
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#614B8B"} />
            <AppHeader
                title='Home Page'
                subtitle='Sub title text'
                renderRightItem={renderRightIcon}
                renderSearchItem={renderSearch}
                containerStyle={{
                    paddingBottom:40
                }}
            />
            <View style={styles.listContainer}>
                <FlatList
                    data={listData}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    onEndReached={onEndReached}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={() =>
                        isFetchingNextPage ? <ActivityIndicator size="large" /> : null
                    }
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
        // paddingHorizontal: 16
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8
    },
    imageContainer: {
        padding: 2,
        borderRadius: 80
    },
    image: {
        borderRadius: 100
    },
    searchContaniner: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 500,
        flexDirection: "row",
        alignItems: "center",
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -40,   // 🔥 pulls container over header
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 16,
        zIndex: 5,
    }
})

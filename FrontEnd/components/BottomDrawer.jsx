import React, { useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';

export function BottomDrawer({ height, isVisible, onClose, children }) {
    const translateY = useRef(new Animated.Value(height)).current;

    const toggleDrawer = () => {
        const toValue = isVisible ? 0 : height;
        Animated.timing(translateY, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        toggleDrawer();
    }, [isVisible]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > height / 2) {
                    onClose();
                } else {
                    toggleDrawer();
                }
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.drawerContainer,
                {
                    transform: [{ translateY }],
                },
            ]}
            {...panResponder.panHandlers}
        >
            <View style={[styles.drawer, { height }]}>
                <View style={styles.drawerHandle} />
                {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    drawer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    drawerHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

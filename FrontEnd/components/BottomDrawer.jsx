import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

export function BottomDrawer({ height, isVisible, onClose, children }) {
    const translateY = useRef(new Animated.Value(height)).current;

    const toggleDrawer = () => {
        const toValue = isVisible ? height : 0;
        Animated.timing(translateY, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        toggleDrawer();
    }, [isVisible]);

    return (
        <Animated.View
            style={[
                styles.drawerContainer,
                {
                    transform: [{ translateY }],
                },
            ]}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={[styles.drawer, { height }]}>{children}</View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    drawer: {
        backgroundColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
});


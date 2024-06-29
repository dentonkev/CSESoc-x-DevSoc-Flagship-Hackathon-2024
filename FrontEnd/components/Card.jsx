import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export function NutritionCard({}) {
return (
    <Card>
        <Card.Title title="Nutritional Values" subtitle="Food Type"/>
        <Card.Content>
            <Text variant="bodyMedium">Calories:</Text>
            <Text variant="bodyMedium">Carbs:</Text>
            <Text variant="bodyMedium">Fats:</Text>
            <Text variant="bodyMedium">Protein:</Text>
        </Card.Content>
    </Card>
    );
}

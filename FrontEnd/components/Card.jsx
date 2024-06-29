import * as React from 'react';
import { Card, Text } from 'react-native-paper';

export function NutritionCard({ data }) {
    return (
        <Card>
            <Card.Title title="Nutritional Values"/>
            <Card.Content>
                <Text variant='bodyMedium'>Food: {data.Food}</Text>
                <Text variant='bodyMedium'>Calories: {data.Calories}</Text>
                <Text variant='bodyMedium'>Carbohydrates: {data.Carbohydrates}</Text>
                <Text variant='bodyMedium'>Fats: {data.Fat}</Text>
                <Text variant='bodyMedium'>Protein: {data.Protein}</Text>
                <Text variant='bodyMedium'>Sodium: {data.Sodium}</Text>
                <Text variant='bodyMedium'>Sugars: {data.Sugars}</Text>
                <Text variant='bodyMedium'>Servings: {data.Servings}</Text>
                <Text variant='bodyMedium'>Health Rating: {data['Health Rating (Out of 5)']}</Text>
            </Card.Content>
        </Card>
    );
}


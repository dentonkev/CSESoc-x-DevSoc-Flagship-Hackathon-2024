import React from 'react';
import { Card, Text } from 'react-native-paper';

export function NutritionCard({ data }) {
    return (
        <Card>
            <Card.Title title={data.Food} />
            <Card.Content>
                <Text style={{ fontSize: 18 }}>🔥 Calories: {data.Calories} kcal</Text>
                <Text style={{ fontSize: 18 }}>🥖 Carbohydrates: {data.Carbohydrates} g</Text>
                <Text style={{ fontSize: 18 }}>🧈 Fats: {data.Fat} g</Text>
                <Text style={{ fontSize: 18 }}>🍗 Protein: {data.Protein} g</Text>
                <Text style={{ fontSize: 18 }}>🧂 Sodium: {data.Sodium} mg</Text>
                <Text style={{ fontSize: 18 }}>🍬 Sugars: {data.Sugars} g</Text>
                <Text style={{ fontSize: 18 }}>🍽️ Servings: {data.Servings}</Text>
                <Text style={{ fontSize: 18 }}>⭐ Health Star Rating: {data['Health Rating (Out of 5)']}/5</Text>
            </Card.Content>
        </Card>
    );
}

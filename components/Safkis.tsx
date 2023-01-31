import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Divider, TextInput, List, IconButton, FAB, Text } from 'react-native-paper';

interface Order {
	tilaaja: string,
	ravintola: string,
	ruoka: string
}

const Safkis : React.FC = () : React.ReactElement => {

	// Tilamuuttujat    
	const [tilaaja, setTilaaja] = useState('');
	const [ravintola, setRavintola] = useState('');
	const [ruoka, setRuoka] = useState('');
	const [tilauksetRavintoloittan, setTilauksetRavintoloittan] = useState(new Map<string, Order[]>());

	// Lisätään uusi tilaus
	const lisaaTilaus = () => {
		let tilaukset = tilauksetRavintoloittan.get(ravintola) || [];
		tilaukset.push({ tilaaja, ravintola, ruoka });
		setTilauksetRavintoloittan(new Map(tilauksetRavintoloittan.set(ravintola, tilaukset)));
		setTilaaja("");
		setRavintola("");
		setRuoka("");
	};

	// Poistetaan tilaus
	const poistaTilaus = (ravintola: string, index: number) => {
		
		const tilaukset = tilauksetRavintoloittan.get(ravintola);
		
		if (tilaukset) {
			const uudetTilaukset = [...tilaukset];
			uudetTilaukset.splice(index, 1);

			if(uudetTilaukset.length === 0) {
				tilauksetRavintoloittan.delete(ravintola);
			} else {
					tilauksetRavintoloittan.set(ravintola,uudetTilaukset);
				}
					if(tilauksetRavintoloittan !== new Map(tilauksetRavintoloittan)) {
						setTilauksetRavintoloittan(new Map(tilauksetRavintoloittan));
					}
		}
	};

	return (
		<SafeAreaProvider>
					
		<Appbar.Header style={styles.appBar}>
			<Appbar.Content color='#42f59b' title="Safkis" />
		</Appbar.Header>

		<View style={styles.container}>

			<Text style={styles.whiteColor} variant="headlineSmall">Täytä tilaus:</Text>
			
			<TextInput
					mode='outlined' 
					placeholder='Tilaaja'
					value={tilaaja}
					onChangeText={setTilaaja}
			/>
			<TextInput 
					mode='outlined'
				placeholder='Ravintola'
				value={ravintola}
				onChangeText={setRavintola}
			/>
			<TextInput
			mode='outlined'
				placeholder='Ruoka'
				value={ruoka}
				onChangeText={setRuoka}
			/>

			<FAB style={styles.FAB} label="Lisää tilaukseen" color='black' onPress={lisaaTilaus} />

			<Divider style={styles.divider} />
            <ScrollView>
			<List.Section>
				{Array.from(tilauksetRavintoloittan).map(([ravintola, tilaukset], index) => (

					<List.Accordion
						key={index}
						style={{backgroundColor: '#42f59b'}}
						title={ravintola}
						left={(props) => <List.Icon {...props} icon="food" color='#101010' />}
					>
						{tilaukset.map((tilaus, idx) => (
							<List.Item
								key={idx}
								title={tilaus.ruoka}
								titleStyle={styles.listItem}
								description={tilaus.tilaaja}
								descriptionStyle={styles.descStyle}
								right={(props) => (
									<IconButton
										icon="close-thick"
										iconColor='white'
										onPress={() => poistaTilaus(ravintola, idx)}
									/>
								)}
							/>
						))}
					</List.Accordion>
				))}
			</List.Section>
            </ScrollView>
		</View>

		</SafeAreaProvider>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121',
		padding: 20
	},
  appBar: {
    backgroundColor: '#101010'
  },
  divider: {
    marginVertical: 20
  },
  FAB: {
    marginTop: 16,
    backgroundColor: '#42f59b',
	},
	whiteColor: {
		color: 'white'
	},
	listItem: {
		color: 'white' 
	},
	descStyle: {
		color: '#42f59b',
	}
});

export default Safkis;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { FAB, Appbar, Divider, List, TextInput, Dialog, Portal, Button, Text, Provider, IconButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DropDown from "react-native-paper-dropdown";

const Randomizer: React.FC = () => {

	// Tilamuuttujat
  const [pelaajat, setPelaajat] = useState<string[]>([]);
  const [tiimienMaara, setTiimienMaara] = useState<number>(2);
  const [tiimit, setTiimit] = useState<string[][]>([]);
  const [pelaajanNimi, setPelaajanNimi] = useState<string>('');
  const [dialogi, setDialogi] = useState<boolean>(false);
  const [naytaDropDown, setNaytaDropDown] = useState(false);
  
	// DropDownin label-arvo parit
	const dropdown = [
											{ label: "2",	value: 2 },
											{	label: "3",	value: 3 },
											{	label: "4",	value: 4 },
											{	label: "5",	value: 5 },
											{	label: "6",	value: 6 },
											{ label: "7",	value: 7 },
											{	label: "8",	value: 8 },
										];

	// Lisätään pelaaja listaan
  const kasittelePelaajanLisays = (name: string) => {
    setPelaajat([...pelaajat, name]);
    setDialogi(false);
    setPelaajanNimi('');
  };

	// Poistetaan pelaaja listasta
  const kasittelePoisto = (nimi: string) => {
    setPelaajat(pelaajat.filter(pelaaja => pelaaja !== nimi));
  };

	// Sekoitus
  const kasitteleSekoitus = () => {
    if (pelaajat.length === 0) {
      return;
    }
			// Sekoita pelaajat
			const sekoitetutPelaajat = pelaajat.sort(() => Math.random() - 0.5);

			// Pelaajien jako tiimeihin
			const uudetTiimit: React.SetStateAction<string[][]> = [];
				// Luodaan tarvittavat tiimit
				for (let i = 0; i < tiimienMaara; i++) {
					uudetTiimit.push([]);
				}
				// Jaa pelaajat luotuihin tiimeihin
				sekoitetutPelaajat.forEach((pelaaja, index) => {
					uudetTiimit[index % tiimienMaara].push(pelaaja);
				});
			
			setTiimit(uudetTiimit);
  };

  return (
    <SafeAreaProvider>
        
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content color='#42f59b'  title="Randomizer" />
    </Appbar.Header>

    <Provider>
    
    <View style={styles.container}>
        
    <Portal>
			<Dialog visible={dialogi} style={styles.dialogi} onDismiss={() => setDialogi(false)}>
			<Dialog.Title style={styles.whiteColor}>Lisää Pelaaja</Dialog.Title>
			<Dialog.Content style={styles.dialogi}>
					<TextInput
					mode='outlined'
					value={pelaajanNimi}
					placeholder='Nimi'
					onChangeText={(text) => setPelaajanNimi(text)}
					/>
			</Dialog.Content>
			<Dialog.Actions>
					<Button textColor='red' onPress={() => setDialogi(false)}>Peruuta</Button>
					<Button textColor='#42f59b' onPress={() => kasittelePelaajanLisays(pelaajanNimi)}>Lisää</Button>
			</Dialog.Actions>
			</Dialog>
		</Portal>

		<ScrollView style={{marginBottom: 65}}>
			
			<Text style={styles.whiteColor} variant="headlineSmall">Tiimien määrä</Text>

			<DropDown
				mode={"outlined"}
				dropDownStyle={styles.dropdown}
				activeColor={'#42f59b'}
				dropDownItemStyle={{backgroundColor: '#212121'}}
				dropDownItemSelectedStyle={{backgroundColor: '#212121'}}
				dropDownItemTextStyle={{color: 'white'}}
				visible={naytaDropDown}
				showDropDown={() => setNaytaDropDown(true)}
				onDismiss={() => setNaytaDropDown(false)}
				value={tiimienMaara}
				setValue={setTiimienMaara}
				list={dropdown}
			/>

		<Divider style={styles.divider} />

		<Text style={styles.whiteColor} variant="headlineSmall">Pelaajat:</Text>
        
		<List.Section>
			{(pelaajat.length === 0) 
			? <List.Subheader style={styles.whiteColor}>Ei pelaajia</List.Subheader>
			: <>
					{pelaajat.map((pelaaja, idx) => (
						<List.Item
								key={idx}
								title={pelaaja}
								style={styles.listItem}
								titleStyle={styles.listItem}
								right={() => (
								<IconButton
										icon="close-thick"
										iconColor='white'
										onPress={() => kasittelePoisto(pelaaja)}
								/>
								)}
							/>
					))}
				</>
			}
		</List.Section>

		<Divider style={styles.divider} />

		<Text variant="headlineSmall" style={styles.whiteColor}>Tiimit:</Text>
        
		{tiimit.map((tiimi, index) => (
				<View key={index}>
						<List.Section>
								<List.Subheader style={styles.whiteColor}>Tiimi {index + 1}</List.Subheader>
								{tiimi.map((pelaaja, index) => (
										<List.Item titleStyle={styles.listItem} key={index} title={pelaaja} />
						
								))}
						</List.Section>
				</View>
		))}

		</ScrollView>
        
		<FAB label='Lisää pelaaja' color='black' icon='plus-thick' style={styles.FAB1} onPress={() => setDialogi(true)} />
		<FAB label='Sekoita tiimit' color='black' icon='shuffle' style={styles.FAB2} onPress={kasitteleSekoitus} />

    </View>

    </Provider>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121',
		padding: 20
	},
	appBar: {
		backgroundColor: '#101010'
	},
	listItem: {
		marginVertical: -15,
		color: 'white' 
	},
	whiteColor: {
		color: 'white'
	},
	FAB1: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#42f59b'
	},
	FAB2: {
		position: 'absolute',
		margin: 16,
		left: 0,
		bottom: 0,
		backgroundColor: '#42f59b'
	},
	divider: {
		marginVertical: 20
	},
	dropdown: {
		top: 55,
		backgroundColor: 'gray',
	},
	dialogi: {
    backgroundColor: '#393939',
  },
});

export default Randomizer;

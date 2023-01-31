# LAN-party-helper
**Status:** work in progress

**TLDR:** Small utility app to be used at LAN parties for organizing food orders and shuffling teams. 

App is built with React Native using Expo framework and React-native-paper UI components. (App is in Finnish)

## ToDo:

 - Input error checking
 - Add ContextApi
 - Add AsyncStorage/other method to save the data

## Funtionalities

### Randomizer

Randomizer component takes two kinds of input from the user:
 - Desired number of teams
 - Names of all the players user wants to include

User can then shuffle players into teams by pressing a button. Repeating this shuffles the teams again and again.

User can also remove players that were already added.

Default and minimum number of teams is 2 and maximum is 8.

### Safkis

Safkis component takes 3 inputs from the user:

 - Persons name
 - Restaurant name
 - Name of the meal

After inputting this info and pressing Add order button, the order is added into a list below.
List is organized in a way that it gathers orders from the same restaurant under that restaurants name (List.Section).
It is also possible to remove orders from the list.


## Screenshots
**Randomizer:**
![Randomizer1](https://lh4.googleusercontent.com/MwKwK3c0swGvX9lfgiy_x_UoTYKR6qb5t-7lMzaGmNVSGf0OTDuqGzhRXgbw8MLvIXQ=w2400)

**Safkis:**
![Safkis](https://lh3.googleusercontent.com/OWQkLv32-2cvOtEjgqohaqO0Q2IW4CyXMO6oUCgumrt2EFCJhGR7TtFQShhC8y0OvLE=w2400)



# 📱 TechLearn — TP React Native
### Maîtrise des Composants de Base
**Filière :** Ingénierie du Développement des Applications Informatiques

---

## 📋 Table des matières

1. [À propos du projet](#-à-propos-du-projet)
2. [REST API — Concepts fondamentaux](#-rest-api--concepts-fondamentaux)
3. [Structure du projet](#-structure-du-projet)
4. [Composants React Native utilisés](#-composants-react-native-utilisés)
5. [Installation et lancement](#-installation-et-lancement)
6. [Contenu du TP](#-contenu-du-tp)
7. [Livrables](#-livrables)

---

## 🎯 À propos du projet

**TechLearn** est une application mobile développée avec **React Native + Expo** dans le cadre du TP *Maîtrise des Composants de Base*.

L'application présente une plateforme de cours informatique avec :
- Une bannière d'accueil avec image distante
- Des statistiques et badges de catégories
- Une liste de cours affichée avec `FlatList`
- Un design clair et professionnel

---

## 🌐 REST API — Concepts fondamentaux

> Une **API REST** (Representational State Transfer) est une interface qui permet à deux applications de communiquer via le protocole **HTTP**.

### Les 4 méthodes HTTP principales

| Méthode | Action | Exemple |
|---------|--------|---------|
| `GET` | Lire / Récupérer des données | Afficher la liste des cours |
| `POST` | Créer une nouvelle ressource | Ajouter un nouveau cours |
| `PUT` | Modifier une ressource existante | Modifier un cours |
| `DELETE` | Supprimer une ressource | Supprimer un cours |

---

### Structure d'une requête REST

```
https://api.techlearn.com/v1/cours
        \_______/  \_/ \______/
        domaine  version  ressource
```

### Exemple de réponse JSON (GET /cours)

```json
{
  "status": 200,
  "data": [
    {
      "id": "1",
      "titre": "React Native",
      "technologie": "Mobile",
      "niveau": "Débutant",
      "duree": "8h",
      "image": "https://images.unsplash.com/photo-1512941937669",
      "description": "Créez des applications mobiles avec JavaScript."
    },
    {
      "id": "2",
      "titre": "JavaScript ES6+",
      "technologie": "Web",
      "niveau": "Débutant",
      "duree": "10h",
      "image": "https://images.unsplash.com/photo-1627398242454",
      "description": "Maîtrisez le langage web le plus utilisé."
    }
  ]
}
```

---

### Les codes de statut HTTP

| Code | Signification |
|------|---------------|
| `200 OK` | Requête réussie |
| `201 Created` | Ressource créée avec succès |
| `400 Bad Request` | Requête mal formée |
| `401 Unauthorized` | Non authentifié |
| `403 Forbidden` | Accès refusé |
| `404 Not Found` | Ressource introuvable |
| `500 Internal Server Error` | Erreur côté serveur |

---

### Appeler une API REST dans React Native

```javascript
// Exemple avec fetch() — récupérer les cours depuis une API
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function App() {
  const [cours, setCours] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    // Appel API au chargement du composant
    fetch('https://api.techlearn.com/v1/cours')
      .then(response => response.json())   // Convertir en JSON
      .then(data => {
        setCours(data);                    // Stocker les données
        setChargement(false);
      })
      .catch(error => {
        console.error('Erreur API :', error);
        setChargement(false);
      });
  }, []);

  if (chargement) {
    return <Text>Chargement...</Text>;
  }

  return (
    <FlatList
      data={cours}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.titre}</Text>
          <Text>{item.technologie}</Text>
        </View>
      )}
    />
  );
}
```

---

### Les principes REST (contraintes)

| Principe | Description |
|----------|-------------|
| **Stateless** | Chaque requête est indépendante, le serveur ne garde pas l'état du client |
| **Client-Serveur** | Séparation claire entre frontend (mobile) et backend (API) |
| **Cacheable** | Les réponses peuvent être mises en cache |
| **Uniform Interface** | URL cohérentes et prévisibles (`/cours`, `/cours/1`) |
| **Layered System** | Possibilité d'ajouter des couches intermédiaires (proxy, CDN) |

---

### REST vs les autres architectures

| Architecture | Utilisation | Protocole |
|-------------|-------------|-----------|
| **REST** | API web standard | HTTP/HTTPS |
| **GraphQL** | Requêtes flexibles | HTTP |
| **SOAP** | Services entreprise | XML/HTTP |
| **WebSocket** | Communication temps réel | WS |

---

## 📁 Structure du projet

```
TechLearn/
│
├── App.js              ← Fichier principal (tout le code du TP)
├── package.json        ← Dépendances du projet
├── app.json            ← Configuration Expo
├── assets/             ← Images locales (icône, splash)
│   ├── icon.png
│   └── splash.png
└── node_modules/       ← Ne pas modifier
```

---

## 🧩 Composants React Native utilisés

### `View`
> Conteneur de base, équivalent du `<div>` en HTML.

```jsx
<View style={styles.carte}>
  {/* Contenu à l'intérieur */}
</View>
```

---

### `Text`
> Affiche du texte à l'écran, équivalent du `<p>` en HTML.

```jsx
<Text style={styles.titre}>React Native</Text>
```

---

### `Image`
> Affiche une image locale ou distante via une URL.

```jsx
<Image
  source={{ uri: 'https://images.unsplash.com/...' }}
  style={{ width: '100%', height: 200 }}
/>
```

---

### `ScrollView`
> Conteneur défilable. Charge **tout** le contenu en mémoire.

```jsx
<ScrollView>
  {/* Tout le contenu peut défiler */}
</ScrollView>
```

---

### `FlatList`
> Liste optimisée. Charge seulement les éléments **visibles** à l'écran.

```jsx
<FlatList
  data={DATA}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Item cours={item} />}
/>
```

> 💡 **Différence clé :**
> - `ScrollView` → adapté pour les petites listes (< 20 éléments)
> - `FlatList` → adapté pour les grandes listes (performance optimisée)

---

### `StyleSheet`
> Système de styles React Native (équivalent du CSS).

```javascript
const styles = StyleSheet.create({
  carte: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,       // Coins arrondis
    padding: 16,            // Marge interne
    elevation: 3,           // Ombre Android
  },
});
```

---

### `SafeAreaView`
> Évite que le contenu passe sous l'encoche ou la barre de statut.

```jsx
<SafeAreaView style={{ flex: 1 }}>
  {/* Contenu protégé */}
</SafeAreaView>
```

---

## 🎨 Flexbox dans React Native

React Native utilise **Flexbox** pour la mise en page.

```javascript
// Aligner des éléments horizontalement
const styles = StyleSheet.create({
  ligne: {
    flexDirection: 'row',         // Horizontal (défaut: column)
    justifyContent: 'space-between', // Répartition horizontale
    alignItems: 'center',            // Alignement vertical
  },
});
```

| Propriété | Valeurs courantes |
|-----------|------------------|
| `flexDirection` | `row`, `column` |
| `justifyContent` | `center`, `space-between`, `space-around`, `flex-start`, `flex-end` |
| `alignItems` | `center`, `flex-start`, `flex-end`, `stretch` |

---

## 🚀 Installation et lancement

### Prérequis
- [Node.js](https://nodejs.org) (version LTS)
- [VS Code](https://code.visualstudio.com)
- Application **Expo Go** sur téléphone (optionnel)

### Étapes

```bash
# 1. Créer le projet
npx create-expo-app TechLearn
cd TechLearn

# 2. Remplacer App.js par le fichier du TP

# 3. Lancer dans le navigateur
npx expo start --web

# OU lancer sur téléphone (scanner le QR code)
npx expo start
```

---

## 📚 Contenu du TP

### Section 1 — Introduction et Configuration *(30 min)*
- ✅ Initialisation du projet avec Expo
- ✅ Nettoyage du fichier `App.js`
- ✅ Compréhension de `View` (conteneur) et `Text` (contenu)

### Section 2 — Mise en page avec View et ScrollView *(45 min)*
- ✅ Image distante en haut via URL
- ✅ Titre et description dans `Text`
- ✅ `ScrollView` pour le défilement
- ✅ `StyleSheet` : hauteur fixe image + texte centré

### Section 3 — Affichage avec FlatList *(1h15)*
- ✅ Tableau `DATA` avec `id`, `titre`, `image`, `technologie`
- ✅ Composant `Item` personnalisé avec props
- ✅ `FlatList` : `data`, `keyExtractor`, `renderItem`
- ✅ Cartes avec `borderRadius` et `elevation`

### Section 4 — Styles avancés et Flexbox *(30 min)*
- ✅ `flexDirection: 'row'` pour les badges et les lignes
- ✅ `justifyContent` : `space-around`, `space-between`
- ✅ `alignItems: 'center'` dans toutes les lignes
- ✅ `padding` interne pour espacer le texte des bords

---

## 📦 Livrables

| Fichier | Description |
|---------|-------------|
| `App.js` | Code source complet avec commentaires |
| `TP_ReactNative.docx` | Document Word avec vérification + code + screenshots |

---

## 🔗 Ressources utiles

- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [Documentation Expo](https://docs.expo.dev)
- [MDN — REST API](https://developer.mozilla.org/fr/docs/Glossary/REST)
- [Images Unsplash (gratuites)](https://unsplash.com)
- [Flexbox Cheatsheet](https://reactnative.dev/docs/flexbox)

---

<div align="center">

**TechLearn** — TP React Native  
Ingénierie du Développement des Applications Informatiques

</div>

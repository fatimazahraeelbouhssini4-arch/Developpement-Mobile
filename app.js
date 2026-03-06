// ============================================================
// App.js — TechLearn : Plateforme de Cours en Informatique
// TP : Maîtrise des Composants de Base en React Native
// Etudiant : Ingénierie du Développement des Applications
// ============================================================

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// ============================================================
// DONNÉES — Tableau de cours informatique
// Chaque objet = un cours avec id, titre, image, technologie
// ============================================================
const DATA = [
  {
    id: '1',
    titre: 'React Native',
    technologie: 'Mobile',
    niveau: 'Débutant',
    duree: '8h',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    description: 'Créez des applications mobiles iOS et Android avec JavaScript.',
  },
  {
    id: '2',
    titre: 'JavaScript ES6+',
    technologie: 'Web',
    niveau: 'Débutant',
    duree: '10h',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80',
    description: 'Maîtrisez les bases du langage web le plus utilisé au monde.',
  },
  {
    id: '3',
    titre: 'Python & Data',
    technologie: 'Data Science',
    niveau: 'Intermédiaire',
    duree: '12h',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
    description: 'Analysez des données et créez des algorithmes intelligents.',
  },
  {
    id: '4',
    titre: 'Git & GitHub',
    technologie: 'DevOps',
    niveau: 'Débutant',
    duree: '4h',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80',
    description: 'Versionnez votre code et collaborez avec votre équipe.',
  },
  {
    id: '5',
    titre: 'SQL & Bases de Données',
    technologie: 'Base de données',
    niveau: 'Intermédiaire',
    duree: '9h',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80',
    description: 'Concevez et interrogez des bases de données relationnelles.',
  },
  {
    id: '6',
    titre: 'UI/UX Design',
    technologie: 'Design',
    niveau: 'Débutant',
    duree: '6h',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    description: 'Créez des interfaces belles et intuitives pour vos utilisateurs.',
  },
];

// ============================================================
// Couleurs associées à chaque technologie
// ============================================================
const TECH_COLORS = {
  'Mobile':          { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  'Web':             { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Data Science':    { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  'DevOps':          { bg: '#FDF4FF', text: '#7E22CE', dot: '#A855F7' },
  'Base de données': { bg: '#FFFBEB', text: '#B45309', dot: '#F59E0B' },
  'Design':          { bg: '#FFF1F2', text: '#BE123C', dot: '#F43F5E' },
};

// ============================================================
// COMPOSANT Item — Affiche UNE carte de cours
// Reçoit "cours" en props depuis FlatList
// ============================================================
const Item = ({ cours }) => {
  // Couleur selon la technologie du cours
  const couleur = TECH_COLORS[cours.technologie] || { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' };

  return (
    // View = conteneur de la carte
    <View style={styles.carte}>

      {/* Image du cours chargée depuis internet */}
      <Image
        source={{ uri: cours.image }}
        style={styles.carteImage}
      />

      {/* Zone de contenu texte */}
      <View style={styles.carteContenu}>

        {/* Ligne haut : badge technologie + durée (flexDirection: 'row') */}
        <View style={styles.carteLigneHaut}>

          {/* Badge coloré selon la technologie */}
          <View style={[styles.badgeTech, { backgroundColor: couleur.bg }]}>
            <View style={[styles.badgeDot, { backgroundColor: couleur.dot }]} />
            <Text style={[styles.badgeTechTexte, { color: couleur.text }]}>
              {cours.technologie}
            </Text>
          </View>

          {/* Durée */}
          <Text style={styles.duree}>⏱ {cours.duree}</Text>
        </View>

        {/* Titre */}
        <Text style={styles.carteTitre}>{cours.titre}</Text>

        {/* Description (max 2 lignes) */}
        <Text style={styles.carteDescription} numberOfLines={2}>
          {cours.description}
        </Text>

        {/* Ligne bas : niveau + bouton (flexDirection: 'row') */}
        <View style={styles.carteLigneBas}>
          <Text style={styles.niveauTexte}>📊 {cours.niveau}</Text>
          <View style={styles.bouton}>
            <Text style={styles.boutonTexte}>Voir le cours →</Text>
          </View>
        </View>

      </View>
    </View>
  );
};

// ============================================================
// COMPOSANT PRINCIPAL — App
// ============================================================
export default function App() {
  return (
    <SafeAreaView style={styles.fond}>
      {/* Barre de statut claire */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ScrollView = enveloppe tout le contenu pour permettre le défilement */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── SECTION 2 : BANNIÈRE avec Image + Titre + Description ── */}
        <View style={styles.banniere}>

          {/* Image distante via URL */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80' }}
            style={styles.banniereImage}
          />

          {/* Overlay avec texte par-dessus l'image */}
          <View style={styles.banniereOverlay}>
            <Text style={styles.banniereTag}>PLATEFORME D'APPRENTISSAGE</Text>
            <Text style={styles.banniereTitre}>
              Devenez un{'\n'}développeur expert
            </Text>
            <Text style={styles.banniereDescription}>
              Apprenez les technologies les plus demandées dans l'industrie du logiciel.
            </Text>
          </View>
        </View>

        {/* ── SECTION 4 : STATS avec Flexbox row ── */}
        {/* justifyContent: 'space-around' répartit les 3 stats équitablement */}
        <View style={styles.statsLigne}>
          <View style={styles.statItem}>
            <Text style={styles.statChiffre}>6</Text>
            <Text style={styles.statLabel}>Cours</Text>
          </View>
          <View style={styles.statSeparateur} />
          <View style={styles.statItem}>
            <Text style={styles.statChiffre}>49h</Text>
            <Text style={styles.statLabel}>Contenu</Text>
          </View>
          <View style={styles.statSeparateur} />
          <View style={styles.statItem}>
            <Text style={styles.statChiffre}>100%</Text>
            <Text style={styles.statLabel}>Pratique</Text>
          </View>
        </View>

        {/* ── SECTION 4 : BADGES CATÉGORIES avec Flexbox row ── */}
        <View style={styles.sectionEntete}>
          <Text style={styles.sectionTitre}>Technologies</Text>
        </View>

        {/* ScrollView horizontal pour les badges */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesLigne}
        >
          {['Tous', 'Mobile', 'Web', 'Data Science', 'DevOps', 'Design'].map((cat, index) => (
            <View
              key={cat}
              style={[styles.badgeCategorie, index === 0 && styles.badgeCategorieActif]}
            >
              <Text style={[styles.badgeCategorieTexte, index === 0 && styles.badgeCategorieTexteActif]}>
                {cat}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* ── SECTION 3 : FLATLIST des cours ── */}
        {/*
          FlatList vs ScrollView :
          ScrollView = charge tout en mémoire
          FlatList   = charge seulement ce qui est visible → plus performant
        */}
        <View style={styles.sectionEntete}>
          <Text style={styles.sectionTitre}>Tous les cours</Text>
          <Text style={styles.sectionCompte}>{DATA.length} disponibles</Text>
        </View>

        <FlatList
          data={DATA}                         // Tableau de données
          keyExtractor={(item) => item.id}     // Clé unique pour chaque item
          renderItem={({ item }) => (          // Rendu de chaque item
            <Item cours={item} />
          )}
          scrollEnabled={false}               // ScrollView parent gère le scroll
          contentContainerStyle={styles.liste}
          ItemSeparatorComponent={() => (
            <View style={{ height: 16 }} />
          )}
        />

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerTexte}>TechLearn — TP React Native</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// STYLES — StyleSheet.create()
// Design clair et professionnel, fond blanc
// ============================================================
const styles = StyleSheet.create({

  // Fond général blanc cassé
  fond: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ── Bannière ──
  banniere: {
    height: 260,
    position: 'relative',
  },
  banniereImage: {
    width: '100%',
    height: 260,                  // Hauteur fixe de l'image (exigence TP)
    resizeMode: 'cover',
  },
  banniereOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.58)',
    justifyContent: 'flex-end',   // Texte en bas de l'image
    padding: 20,
    paddingBottom: 24,
  },
  banniereTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#93C5FD',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  banniereTitre: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 35,
    marginBottom: 8,
    textAlign: 'left',
  },
  banniereDescription: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
    textAlign: 'left',
  },

  // ── Statistiques (flexDirection: 'row') ──
  statsLigne: {
    flexDirection: 'row',           // Les 3 stats alignées horizontalement
    justifyContent: 'space-around', // Espace égal entre les stats
    alignItems: 'center',           // Centrage vertical
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statChiffre: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  statSeparateur: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },

  // ── En-tête de section ──
  sectionEntete: {
    flexDirection: 'row',           // Titre + compteur en ligne
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitre: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionCompte: {
    fontSize: 13,
    color: '#94A3B8',
  },

  // ── Badges catégories horizontaux ──
  badgesLigne: {
    flexDirection: 'row',           // Badges côte à côte
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  badgeCategorie: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  badgeCategorieActif: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  badgeCategorieTexte: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  badgeCategorieTexteActif: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // ── FlatList ──
  liste: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  // ── Carte de cours ──
  carte: {
    backgroundColor: '#FFFFFF',     // Fond blanc
    borderRadius: 16,               // Bordures arrondies
    overflow: 'hidden',
    elevation: 2,                   // Ombre Android
    shadowColor: '#94A3B8',         // Ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  carteImage: {
    width: '100%',
    height: 170,                    // Hauteur fixe de l'image de la carte
    resizeMode: 'cover',
  },
  carteContenu: {
    padding: 16,                    // Padding interne (texte ne colle pas aux bords)
  },
  carteLigneHaut: {
    flexDirection: 'row',           // Badge + durée en ligne
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeTech: {
    flexDirection: 'row',           // Point coloré + texte en ligne
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  badgeTechTexte: {
    fontSize: 11,
    fontWeight: '600',
  },
  duree: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  carteTitre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  carteDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginBottom: 14,
  },
  carteLigneBas: {
    flexDirection: 'row',           // Niveau + bouton en ligne
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  niveauTexte: {
    fontSize: 12,
    color: '#94A3B8',
  },
  bouton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  boutonTexte: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },

  // ── Footer ──
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    marginTop: 8,
  },
  footerTexte: {
    fontSize: 13,
    color: '#CBD5E1',
  },

});

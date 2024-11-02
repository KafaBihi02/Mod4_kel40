import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import axios from "axios";

export default function AnimeScreen() {
  const [thisSeasonAnimes, setThisSeasonAnimes] = useState([]);
  const [topAnimes, setTopAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchThisSeasonAnimes = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
        setThisSeasonAnimes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchThisSeasonAnimes();
  }, []);

  useEffect(() => {
    const fetchTopAnimes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
        setTopAnimes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopAnimes();
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>MyAnimeList</Text>
        
        <Text style={styles.sectionTitle}>This Season</Text>
        <FlatList
          horizontal
          data={thisSeasonAnimes}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.animeCard}>
              <Image 
                source={{ uri: item.images.jpg.image_url }} 
                style={styles.animeImage}
              />
              <Text style={styles.animeTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.navButton, page === 1 && styles.disabledButton]} 
            onPress={handlePrevPage}
            disabled={page === 1}
          >
            <Text style={styles.navButtonText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleNextPage}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={topAnimes}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.topAnimeCard}>
              <Image 
                source={{ uri: item.images.jpg.image_url }} 
                style={styles.topAnimeImage} 
              />
              <View style={styles.animeInfo}>
                <Text style={styles.topAnimeTitle}>{item.title}</Text>
                <Text style={styles.animeScore}>Score: {item.score}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  animeCard: {
    marginRight: 16,
    width: 200,
  },
  animeImage: {
    width: 200,
    height: 280,
    borderRadius: 8,
  },
  animeTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  navButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  topAnimeCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  topAnimeImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  animeInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  topAnimeTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  animeScore: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
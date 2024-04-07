import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FAB } from 'react-native-paper';

interface ImageInfo {
  url: string;
  name: string;
  description: string;
}

const HomeScreen = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);

  const addImage = () => {
    const newImage: ImageInfo = {
      url: 'URL_DE_LA_IMAGEN',
      name: 'Nombre de la imagen',
      description: 'Descripción de la imagen',
    };
    setImages([...images, newImage]);
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => deleteImage(index)}>
            <FastImage
              style={styles.image}
              source={{
                uri: image.url,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.imageInfo}>
              <Text style={styles.imageName}>{image.name}</Text>
              <Text style={styles.imageDescription}>{image.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <FAB
        icon="plus"
        onPress={addImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  imageInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageDescription: {
    color: 'white',
    fontSize: 10,
  },
});

export default HomeScreen;

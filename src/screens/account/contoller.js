import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

export const handleProfileImage = async image => {
  return new Promise(async resolve => {
    try {
      const uri = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const pathForFireStorage = await getPathForFirebaseStorage(uri);

      await storage().ref(filename).putFile(pathForFireStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => {
          resolve(url);
        });
    } catch (error) {
      console.warn(error);
    }
  });
};

const getPathForFirebaseStorage = async uri => {
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};

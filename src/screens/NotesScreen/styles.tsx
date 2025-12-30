import { StyleSheet } from "react-native";
import { fs, hp, wp } from "../../utils/useDynamicSize";
import { Fonts } from "../../common/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:wp(2.5)
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4F46E5',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    lineHeight: 32,
  },
});

export default styles
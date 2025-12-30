import { StyleSheet } from "react-native";
import { hp, wp } from "../../utils/useDynamicSize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
   contentContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(1),
    paddingTop: hp(2),
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    justifyContent: 'space-between',
  },
  section: {
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
   rowTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
   subLabel: {
    fontSize: 12,
    marginTop: 2,
  },
   radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default styles

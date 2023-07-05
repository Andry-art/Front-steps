import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  steps?: number;
  time: string;
  distance?: number;
}

const CommonInfo: FC<Props> = ({ steps, time, distance }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>{t('main.steps')}</Text>
        <Text style={styles.info}>{steps?.toLocaleString()}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>{t('main.time')}</Text>
        <Text style={styles.info}>{time}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>{t('main.km')}</Text>
        <Text style={styles.info}>{distance?.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    width: '30%',
    borderRadius: 8,
    marginBottom: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default CommonInfo;

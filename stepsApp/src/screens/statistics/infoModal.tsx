import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  date?: string;
  steps?: number;
  tokens?: number;
  totalSteps?: number;
  totalTokens?: number;
  year?: boolean;
}

const InfoModal: FC<Props> = ({ date, steps, tokens, totalSteps, totalTokens, year }) => {
  const { t } = useTranslation();

  return (
    <>
      {steps ? (
        <View style={styles.infoContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>
              {year ? t('statistic.month_info') : t('statistic.date')}
            </Text>
            <Text style={styles.info}>{date}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{t('statistic.steps')}</Text>
            <Text style={styles.info}>{steps}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{t('statistic.tokens')}</Text>
            <Text style={styles.info}>{tokens}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>{t('statistic.total_steps')}</Text>
            <Text style={styles.info}>{totalSteps}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{t('statistic.total_tokens')}</Text>
            <Text style={styles.info}>{totalTokens}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.white,
    width: '80%',
    padding: 20,
    marginTop: 40,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InfoModal;

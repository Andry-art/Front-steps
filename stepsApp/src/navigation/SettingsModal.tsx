import React, { FC, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { logOutAction } from '../action/registrationAction';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

interface Props {
  isModalOpen: boolean;
  close: () => void;
}

const SettingsModal: FC<Props> = ({ isModalOpen, close }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const logOut = () => {
    dispatch(logOutAction());
  };
  const openLanguageModal = () => {
    // close();
    setIsLanguageOpen(true);
  };
  const closeLanguage = () => {
    setIsLanguageOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isModalOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isLanguageOpen ? (
            <>
              <TouchableOpacity onPress={() => changeLanguage('en')}>
                <Text style={i18n.language === 'en' ? styles.modalTextActive : styles.modalText}>
                  {t('modal.english')}
                </Text>
              </TouchableOpacity>
              <View style={styles.seporator} />
              <TouchableOpacity onPress={() => changeLanguage('ru')}>
                <Text style={i18n.language === 'ru' ? styles.modalTextActive : styles.modalText}>
                  {t('modal.russian')}
                </Text>
              </TouchableOpacity>
              <View style={styles.seporator} />
              <TouchableOpacity onPress={closeLanguage}>
                <Text style={styles.modalText}>{t('modal.close')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={openLanguageModal}>
                <Text style={styles.modalText}>{t('modal.language')}</Text>
              </TouchableOpacity>
              <View style={styles.seporator} />
              <TouchableOpacity onPress={logOut}>
                <Text style={styles.modalText}>{t('modal.log_out')}</Text>
              </TouchableOpacity>
              <View style={styles.seporator} />
              <TouchableOpacity onPress={close}>
                <Text style={styles.modalText}>{t('modal.close')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  modalTextActive: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  seporator: {
    width: 300,
    height: 2,
    backgroundColor: COLORS.gray,
  },
});

export default SettingsModal;

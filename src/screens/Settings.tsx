import React, {useCallback, useLayoutEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import { NativeModules } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';
import {useTheme} from '../hooks/';
import {Block, Button, Input, Image, Switch, Modal, Text} from '../components/';

interface ISettings {
  serverUrl: string;
  projectKey: string;
}

const Settings = () => {
  const { assets, colors, sizes, gradients} = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {ImqaWrappingClass} = NativeModules;
  const [ settings, setSettings] = useState<ISettings>({
    serverUrl: '',
    projectKey: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  const handleChange = useCallback(
      (value) => {
        setSettings((state) => ({...state, ...value}));
      },
      [setSettings],
  );

  const handleSave = useCallback(() => {
    ImqaWrappingClass?.setAgentConfig(settings?.serverUrl, settings?.projectKey);
  }, [settings]);

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: sizes.padding}}>
        <Block>
          <Block
              color={colors.card}
              marginTop={sizes.m}
              paddingTop={sizes.m}
              paddingHorizontal={sizes.padding}>
            <Block>
              <Input
                  label="Server URL"
                  placeholder="IMQA 수집 서버 URL을 입력해주세요"
                  onChangeText={(value) => handleChange({serverUrl: value})}
                  marginBottom={sizes.sm} />
              <Input
                  label="Project Key"
                  marginBottom={sizes.sm}
                  onChangeText={(value) => handleChange({projectKey: value})}
                  placeholder="프로젝트 키를 입력해주세요"
              />

              <Button
                  flex={1}
                  gradient={gradients.primary}
                  marginBottom={sizes.base}
                  onPress={handleSave}>
                <Text white bold transform="uppercase">
                  저장 후 재시작하기
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Settings;

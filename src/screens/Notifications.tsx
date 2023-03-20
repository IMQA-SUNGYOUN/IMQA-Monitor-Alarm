import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import { NativeModules } from 'react-native';
import {useData, useTheme} from '../hooks';
import {IArticle, ICategory} from '../constants/types';
import {Block, Button, Notification, Text} from '../components';
import axios from 'axios';

const Notifications = () => {
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [notifyCategories, setNotifyCategories] = useState<ICategory[]>([]);
  const {colors, gradients, sizes} = useTheme();
  const { ImqaWrappingClass } = NativeModules;
  const [number, setNumber] = useState("");

  // init Notifications
  useEffect(() => {
    ImqaWrappingClass.setScreenName('Notifications');
    ImqaWrappingClass.startCreateRender();
    // const start = performance.now();
    setArticles(data?.articles);
    setNotifyCategories(data?.notifyCategories);
    setSelected(data?.notifyCategories[0]);
    // const end = performance.now();
    // console.log(`MyComponent render time: ${end - start} milliseconds`);
    ImqaWrappingClass.endCreateRender();
  }, [data.articles, data.notifyCategories]);

  // update Notifications on category change
  useEffect(() => {
    ImqaWrappingClass.startRender();
    const category = data?.notifyCategories?.find(
      (category) => category?.id === selected?.id,
    );

    const newArticles = data?.articles?.filter(
      (article) => article?.category?.id === category?.id,
    );

    setArticles(newArticles);
    return () => {
      ImqaWrappingClass.endRender();
    };
  }, [data, selected, setArticles]);

  useEffect(() => {
    ImqaWrappingClass.startResumeRender();
    // ImqaWrappingClass.
    return () => {
      ImqaWrappingClass.endResumeRender();
    };
  });

  const onPressArt = () => {
    console.log("test");
    ImqaWrappingClass.startNetworkRender("collector.imqa.io", "/","GET", "https");
    axios.get('https://collector.imqa.io')
  .then(function (response) {
    ImqaWrappingClass.endNetworkRender("200");
    setNumber(response.data.msg)
  })
  .catch(function (error) {
    ImqaWrappingClass.endNetworkRender("500");
  });
  }

  return (
    <Block>
      {/* Notifications Rank list */}
      <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: -sizes.padding, y: 0}}>
          {notifyCategories?.map((category) => {
            const isSelected = category?.id === selected?.id;
            return (
              <Button
                radius={sizes.m}
                marginHorizontal={sizes.s}
                key={`category-${category?.id}}`}
                onPress={() => setSelected(category)}
                gradient={gradients?.[isSelected ? 'primary' : 'light']}>
                <Text
                  p
                  bold={isSelected}
                  white={isSelected}
                  black={!isSelected}
                  transform="capitalize"
                  marginHorizontal={sizes.m}>
                  {number}
                </Text>
              </Button>
            );
          })}
        </Block>
      </Block>
      
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{paddingHorizontal: sizes.padding}}
        contentContainerStyle={{paddingBottom: sizes.l}}
        renderItem={({item}) => <Notification {...item}  onPress={onPressArt}/>}
      />
    </Block>
  );
};

export default Notifications;

import React, {useEffect, useState, useLayoutEffect} from 'react';
import {FlatList, NativeModules} from 'react-native';
import {useData, useTheme,} from '../hooks';
import {IArticle, ICategory} from '../constants/types';
import {Block, Button, Notification, Text} from '../components';
import axios from 'axios';
import { MpmAgent } from 'react-native-module-sample';


const Notifications = () => {
  const data = useData();
  const [selected, setSelected] = useState<ICategory>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [notifyCategories, setNotifyCategories] = useState<ICategory[]>([]);
  const {colors, gradients, sizes} = useTheme();
  const [number, setNumber] = useState("");
  const Perf = NativeModules.PerformanceLogger;
  const [mounted, setMounted] = useState(false);

  // const {MpmAgent} = NativeModules;

  useLayoutEffect(() => {
    console.log("Notifications");
    
    MpmAgent?.setBehaviorData("Notifications");
  }, []);

  useEffect(() => {
    MpmAgent?.startReactNativeRender("Notifications",true);
    setArticles(data?.articles);
    setNotifyCategories(data?.notifyCategories);
    setSelected(data?.notifyCategories[0]);
    MpmAgent?.endReactNativeRender("Notifications",true);
  }, []);

  // init Notifications
  useEffect(() => {
    
  }, [data.articles, data.notifyCategories]);

  // update Notifications on category change
  useEffect(() => {
    // ImqaWrappingClass.startRender();
    const category = data?.notifyCategories?.find(
      (category) => category?.id === selected?.id,
    );

    const newArticles = data?.articles?.filter(
      (article) => article?.category?.id === category?.id,
    );

    setArticles(newArticles);
  }, [data, selected, setArticles]);

  const onPressArt = () => {
    requestAxios();
    // ImqaWrappingClass.startNetworkRender("https://imqa.io/","/sample","GET","https");
    // String componentName, String startTime, String hostName,String pathName, String method, String protocol
  //   RNMpmAgentModule.startReactNativeNetwork( "Notifications", "https://imqa.io","/sample","GET","http");
  //   axios.get('https://collector.imqa.io/222o2o2o')
  // .then(function (response) {
  //   // setTimeout(() => {  
  //     RNMpmAgentModule.endReactNativeNetwork("Notifications","200");
  //   setNumber(response.data.msg)
  // })
  // .catch(function (error) {
  //   RNMpmAgentModule.endReactNativeNetwork("Notifications","500");
  //   // console.log("eeerrorororo")
  //   // ImqaWrappingClass.collectCrash("API 통신 실패");
  //   // ImqaWrappingClass.endNetworkRender("500");
  // });
  }

  function requestAxios(){
    
  //   let url = "http://121.0.136.27:3980/sample";
  //   RNMpmAgentModule.startReactNativeNetwork( 
  //           url,
  //           "/sample",
  //           "post",
  //           url?.split('://')[0]);

  // fetch("http://121.0.136.27:3980/")
  // .then(response => {
  //   // LOG  {"_bodyBlob": {"_data": {"__collector": [Object], "blobId": "4cc55615-81df-471f-9a4d-76f09f040454", "offset": 0, "size": 22}}, "_bodyInit": {"_data": {"__collector": [Object], "blobId": "4cc55615-81df-471f-9a4d-76f09f040454", "offset": 0, "size": 22}}, "bodyUsed": false, "headers": {"map": {"connection": "keep-alive", "content-length": "22", "content-type": "application/json; charset=utf-8", "date": "Sun, 07 May 2023 07:15:16 GMT", "etag": "W/\"16-Mu/KSH5sxGduHuyPUKlaa1fFwYE\"", "x-powered-by": "Express"}}, "ok": true, "status": 200, "statusText": "", "type": "default", "url": "http://121.0.136.27:3980/"} res
  //   RNMpmAgentModule.endReactNativeNetwork(response.status.toString());  
  //   return response;
  // })
  // .catch(error => {
  //   RNMpmAgentModule.endReactNativeNetwork(response.status.toString());  
  // });
    const axiosInstance = axios.create({
      baseURL:"http://121.0.136.27:3980/"
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        try{
          // MpmAgent.startReactNativeNetwork( 
            // config.baseURL?.toString(),
            // config.url?.toString(),
            // config.method?.toString(),
            // config.baseURL?.split('://')[0]);
        }catch(e){
          console.error(e);
        }
        return config;
      },
      error => {
        // MpmAgent.endReactNativeNetwork("500");
      }
    );

    axiosInstance.interceptors.response.use( response => {
      // MpmAgent.endReactNativeNetwork(response.status.toString());
      return response;
    });

    axiosInstance.get("/");
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

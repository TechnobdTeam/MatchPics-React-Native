import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } from 'react-native-iap';
  import React, {Component} from 'react';
  import * as NB from 'native-base';
  
  import NativeButton from 'apsl-react-native-button';
  
  // App Bundle > com.dooboolab.test
  
  const itemSkus = Platform.select({
    ios: [
      'com.cooni.point1000',
      'com.cooni.point5000', // dooboolab
    ],
    android: [
      'android.test.purchased',
      'android.test.canceled',
      'android.test.refunded',
      'android.test.item_unavailable',
      // 'point_1000', '5000_point', // dooboolab
    ],
  });
  
  const itemSubs = Platform.select({
    ios: [
      'com.cooni.point1000',
      'com.cooni.point5000', // dooboolab
    ],
    android: [
      'test.sub1', // subscription
    ],
  });
  
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Platform.select({
        ios: 0,
        android: 24,
      }),
      paddingTop: Platform.select({
        ios: 0,
        android: 24,
      }),
      backgroundColor: 'white',
    },
    header: {
      flex: 20,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTxt: {
      fontSize: 26,
      color: 'green',
    },
    content: {
      flex: 80,
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    btn: {
        flexDirection: 'column',
      height: 48,
      width: 240,
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: '#00c40f',
      borderRadius: 0,
      borderWidth: 0,
    },
    txt: {
      fontSize: 16,
      color: 'white',
      textAlignVertical: 'center'
    },
  });
  
  export default class Page extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        productList: [],
        receipt: '',
        availableItemsMessage: '',
      };
    }
  
    async componentDidMount() {
      try {
        const result = await RNIap.initConnection();
        await RNIap.consumeAllItemsAndroid();
        console.log('result', result);
      } catch (err) {
        console.warn(err.code, err.message);
      }
  
      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            try {
              // if (Platform.OS === 'ios') {
              //   finishTransactionIOS(purchase.transactionId);
              // } else if (Platform.OS === 'android') {
              //   // If consumable (can be purchased again)
              //   consumePurchaseAndroid(purchase.purchaseToken);
              //   // If not consumable
              //   acknowledgePurchaseAndroid(purchase.purchaseToken);
              // }
              const ackResult = await finishTransaction(purchase);
            } catch (ackErr) {
              console.warn('ackErr', ackErr);
            }
  
            this.setState({receipt}, () => this.goNext());
          }
        },
      );
  
      purchaseErrorSubscription = purchaseErrorListener(
        (error) => {
          console.log('purchaseErrorListener', error);
          Alert.alert('purchase error', JSON.stringify(error));
        },
      );
    }
  
    componentWillUnmount() {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    }
  
    goNext = () => {
      Alert.alert('Receipt', this.state.receipt);
    };
  
    getItems = async () => {
      try {
        const products = await RNIap.getProducts(itemSkus);
        // const products = await RNIap.getSubscriptions(itemSkus);
        console.log('Products', products);
        this.setState({productList: products});
      } catch (err) {
        console.warn(err.code, err.message);
      }
    };
  
    getSubscriptions = async () => {
      try {
        const products = await RNIap.getSubscriptions(itemSubs);
        console.log('Products', products);
        this.setState({productList: products});
      } catch (err) {
        console.warn(err.code, err.message);
      }
    };
  
    getAvailablePurchases = async () => {
      try {
        console.info(
          'Get available purchases (non-consumable or unconsumed consumable)',
        );
        const purchases = await RNIap.getAvailablePurchases();
        console.info('Available purchases :: ', purchases);
        if (purchases && purchases.length > 0) {
          this.setState({
            availableItemsMessage: `Got ${purchases.length} items.`,
            receipt: purchases[0].transactionReceipt,
          });
        }
      } catch (err) {
        console.warn(err.code, err.message);
        Alert.alert(err.message);
      }
    };
  
    // Version 3 apis
    requestPurchase = async (sku) => {
      try {
        RNIap.requestPurchase(sku);
      } catch (err) {
        console.warn(err.code, err.message);
      }
    };
  
    requestSubscription = async (sku) => {
      try {
        RNIap.requestSubscription(sku);
      } catch (err) {
        Alert.alert(err.message);
      }
    };
  
    render(){
      const {productList, receipt, availableItemsMessage} = this.state;
      const receipt100 = receipt.substring(0, 100);
  
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>MatchPics Subscription</Text>
          </View>
          <View style={styles.content}>
            <ScrollView style={{alignSelf: 'stretch'}}>
              <View style={{height: 50}} />
              <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,justifyContent: 'center',alignItems:'center',height:59,paddingLeft:62,paddingRight:62, marginLeft: 20, marginRight: 20}} onPress={this.getAvailablePurchases}>
                    <NB.Text style={{fontSize: 16,color:'#ffffff',fontFamily:'OpenSans-Bold'}}>Get available purchases</NB.Text>
            </NB.Button> 
              {/* <NB.Text
                
                activeOpacity={0.5}
                style={styles.btn}
                textStyle={styles.txt}>
                Get available purchases
              </NB.Text> */}
  
              <Text style={{margin: 5, fontSize: 15, alignSelf: 'center'}}>
                {availableItemsMessage}
              </Text>
  
              <Text style={{margin: 5, fontSize: 9, alignSelf: 'center'}}>
                {receipt100}
              </Text>

              <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,justifyContent: 'center',alignItems:'center',height:59,paddingLeft:62,paddingRight:62, marginLeft: 20, marginRight: 20}} 
              onPress={() => this.getItems()}>
                    <NB.Text style={{fontSize: 16,color:'#ffffff',fontFamily:'OpenSans-Bold'}}> Get Products ({productList.length})</NB.Text>
            </NB.Button> 
  
              {/* <NB.Text
                onPress={() => this.getItems()}
                activeOpacity={0.5}
                style={styles.btn}
                textStyle={styles.txt}>
                Get Products ({productList.length})
              </NB.Text> */}
              {productList.map((product, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        marginTop: 20,
                        fontSize: 12,
                        color: 'black',
                        minHeight: 100,
                        alignSelf: 'center',
                        paddingHorizontal: 20,
                      }}>
                      {JSON.stringify(product)}
                    </Text>

                    <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,justifyContent: 'center',alignItems:'center',height:59,paddingLeft:62,paddingRight:62, marginLeft: 20, marginRight: 20}} 
                        onPress={() => this.requestSubscription(product.productId)}>
                        <NB.Text style={{fontSize: 16,color:'#ffffff',fontFamily:'OpenSans-Bold'}}> Request purchase for above product ({productList.length})</NB.Text>
                    </NB.Button> 

                    {/* <NB.Text
                      // onPress={(): void => this.requestPurchase(product.productId)}
                      onPress={() =>
                        this.requestSubscription(product.productId)
                      }
                      activeOpacity={0.5}
                      style={styles.btn}
                      textStyle={styles.txt}>
                      Request purchase for above product
                    </NB.Text> */}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      );
    }
  }

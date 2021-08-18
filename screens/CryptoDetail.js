import React , {useState, useEffect} from 'react';
import {HeaderBar, CurrencyLabel, TextButton, PriceAlert } from '../components'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
    Animated
} from 'react-native';

import {  dummyData, COLORS, SIZES, FONTS, icons} from '../constants';
import {VictoryScatter, VictoryAxis, VictoryLine, VictoryChart} from 'victory-native'

import {VictoryCustomTheme} from '../styles'

const CryptoDetail = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0)
    const numberOfCharts = [1,2,3]

    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [chartOpions, setChartOptions] = useState(dummyData.chartOptions)
    const [selectedOption, setSelectedOption] = useState(chartOpions[0])
    // console.log(route.params)
    useEffect(()=>{
        const {currency} = route.params
        setSelectedCurrency(currency)
    },[])

    const optionOnClickHandler = (option)=>{
        setSelectedOption(option )
    }

    const renderDots = ()=>{
        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return(
            <View style={{
                height:30, marginTop:15
            }}>
                <View
                    style={{
                        flexDirection:'row', alignItems:'center', justifyContent:'center'
                    }}
                >
                    {
                        numberOfCharts.map((item, index)=>{
                            const opacity = dotPosition.interpolate({
                                inputRange:[index -1, index, index+1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate:'clamp'
                            })

                            const dotSize = dotPosition.interpolate({
                                inputRange:[index -1, index, index+1],
                                outputRange: [SIZES.base * 0.8, 10, SIZES.base*0.8],
                                extrapolate:'clamp'
                            })

                            const dotColor = dotPosition.interpolate({
                                inputRange:[index -1, index, index+1],
                                outputRange: [COLORS.gray , COLORS.primary, COLORS.gray],
                                extrapolate:'clamp'
                            })
                             return (
                                 <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius:SIZES.radius, 
                                        marginHorizontal:6 ,
                                        width:dotSize, 
                                        height:dotSize, 
                                        backgroundColor:dotColor
                                    }}
                                 />
                                     
                             )
                        })
                    }
                </View>
            </View>
        )
    }
    const renderChart = ()=>{
        return(
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal:SIZES.radius,
                    alignItems:'center',
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.white,
                    ...styles.shadow
                }}
            >
                {/* Header */}
                <View style={{flexDirection:'row', marginTop:SIZES.padding, marginHorizontal:SIZES.padding}}>
                    <View style={{flex:1}}>
                        <CurrencyLabel  
                            icon={selectedCurrency?.image} 
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}
                        />
                    </View>
                    <View>
                        <Text style={{...FONTS.h3}}>${selectedCurrency?.amount}</Text>
                        <Text style={{color:selectedCurrency?.type == 'I' ? COLORS.green:COLORS.red, ...FONTS.body3}}>{selectedCurrency?.changes}</Text>
                    </View>
                </View>
                {/* Chart */}
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment='center'
                    snapToInterval={SIZES.width-40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset: {x: scrollX}}}
                    ], {useNativeDriver:false})}
                >
                    {
                        numberOfCharts.map((item, index)=>(

                <View
                    key={`chart-${index}`}
                    style={{
                        marginLeft:index == 0 ? SIZES.base : 0
                    }}
                >

                
                <View
                    key={index}
                    style={{marginTop:-25}}
                >
                    <VictoryChart
                        theme={VictoryCustomTheme}
                        height={220}
                        width={SIZES.width-40}
                    >
                        <VictoryLine
                            style={{
                                data:{stroke:COLORS.secondary},
                                parent:{border:'1px solid #ccc'}
                            }}
                            data={selectedCurrency?.chartData}
                            categories={{
                                x:["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                                y:["15", "30", "45"]
                            }}
                        >
                            <VictoryScatter
                                data={selectedCurrency?.chartData}
                                size={7}
                                style={{
                                    data:{
                                        fill:COLORS.secondary
                                    }
                                }}
                            >
                                <VictoryAxis 
                                    style={{
                                        grid:{
                                            stroke:'transparent'
                                        }
                                    }}
                                />
                                <VictoryAxis 
                                    dependentAxis
                                    style={{
                                        axis:{stroke:'transparent'},
                                        grid:{stroke:'gray'}
                                    }}
                                />
                            </VictoryScatter>
                        </VictoryLine>
                    </VictoryChart>
                </View>
                </View>
                 ))
                }
                </Animated.ScrollView>
                {/* options */}
                <View style={{
                    width:'100%', paddingHorizontal:SIZES.padding, flexDirection:'row',justifyContent:'space-between'
                }}>
                    {
                        chartOpions.map((option) => {

                            return(

                                <TextButton 
                                    key={`option-${option.id}`}
                                    label={option.label}
                                    customContainerStyle={{
                                        height:30,
                                        width:60,
                                        borderRadius:15,
                                        backgroundColor:selectedOption.id == option.id?  COLORS.primary :COLORS.lightGray
                                    }}
                                    customLabelStyle={{
                                        color:selectedOption.id == option.id?  COLORS.white :COLORS.gray
                                    }}
                                    onPress={()=>optionOnClickHandler(option)}
                                />
                            )
                        }
                        )
                    }
                </View>
                {/* Dots */}
                {renderDots()}
                
            </View>
        )
    }

    const renderBuy = ()=>{
        return(
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal:SIZES.radius,
                    padding:SIZES.radius,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.white,
                    ...styles.shadow
                }}
            >
                <View style={{flexDirection:'row', alignItems:'center', marginBottom:SIZES.radius}}>
                    {/* Currency */}
                    <View style={{flex:1}}>
                         <CurrencyLabel 
                            icon={selectedCurrency?.image}
                            currency={`${selectedCurrency?.currency} wallet`}
                            code={selectedCurrency?.code}
                         />
                    </View>
                    {/* Ammount */}
                    <View
                        style={{
                            flexDirection:'row', alignItems:'center'
                        }}
                    >
                        <View style={{marginRight:SIZES.base}}>
                            <Text style={{...FONTS.h3}}>${selectedCurrency?.wallet.value}</Text>
                            <Text style={{textAlign:"right", color:COLORS.gray, ...FONTS.body4}}>{selectedCurrency?.wallet.crypo} {selectedCurrency?.code}</Text>
                        </View>
                        <Image
                            source={icons.right_arrow}
                            resizeMode='cover'
                            style={{width:20, height:20, tintColor:COLORS.gray}}
                        />
                    </View>
                </View>
                <TextButton 
                    label="Buy"
                    onPress={()=>navigation.navigate('Transaction', {currency:selectedCurrency})}

                />  
            </View>
        )
    }
    const renderAbout = ()=>{
        return(
            <View style={{
                marginTop:SIZES.padding, 
                marginHorizontal:SIZES.radius, 
                padding:SIZES.radius, 
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.white,
                ...styles.shadow
            }}>
                <Text style={{...FONTS.h3}}>About {selectedCurrency?.currency}</Text>
                <Text style={{marginTop:SIZES.base, ...FONTS.body3}}>{selectedCurrency?.description}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:COLORS.lightGray
            }}
        >
            <HeaderBar right={true} />
            <ScrollView>
                <View
                    style={{flex:1, paddingBottom:SIZES.padding}}
                >
                    {renderChart()}
                    {renderBuy() }
                    {renderAbout()}
                    <PriceAlert 
                        customContainerStyle={{
                            marginTop:SIZES.padding,
                            marginHorizontal:SIZES.radius
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default CryptoDetail;
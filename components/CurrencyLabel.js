import React from 'react'
import {View, Image, Text} from 'react-native'
import {COLORS,SIZES,FONTS} from '../constants'
const CurrencyLabel = ({icon, currency, code}) => {
    return (
        <View
            style={{flexDirection:'row'}}
        >
            <Image source={icon} resizeMode='contain'
                style={{
                    width:25,
                    height:25
                }}
            />
                <Text></Text>
            <View style={{marginLeft:SIZES.base}}>
                <Text style={{...FONTS.h3}}>{currency}</Text>
                <Text style={{color:COLORS.gray, ...FONTS.body4}}>{code}</Text>
            </View>
        </View>
    )
}

export default CurrencyLabel

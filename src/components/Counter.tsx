import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native'

const ITEMS_VISIBLE = 5
const ITEM_HEIGHT = 40

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: ITEM_HEIGHT * ITEMS_VISIBLE,
    width: 100,
  },
  item: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: ITEM_HEIGHT,
    fontSize: 20,
    fontWeight: '300',
  },
  selected: {
    fontSize: 30,
    fontWeight: '700',
  },
  selector: {
    position: 'absolute',
    width: '100%',
    borderBottomColor: '#d1d5db',
    borderBottomWidth: 1,
    borderTopColor: '#d1d5db',
    borderTopWidth: 1,
    height: ITEM_HEIGHT,
    top: ITEM_HEIGHT * Math.floor(ITEMS_VISIBLE / 2),
  },
  unit: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 2,
    textAlignVertical: 'center',
    color: '#d1d5db',
  },
})

interface Props {
  data: Array<number | undefined>
  defaultValue: number
  onChange: (selected: number) => void
  unit?: string
  fractionDigits?: number
}

export default function Counter({ data, unit, defaultValue, onChange, fractionDigits }: Props) {
  const ref = useRef<FlatList>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(() =>
    data.findIndex((d) => d === defaultValue),
  )

  const handleScrollStart = (_event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSelectedIndex(undefined)
  }

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const selectedIndex = getIndexFromEvent(event)
    setSelectedIndex(selectedIndex)
    onChange(data[selectedIndex]!)
    ref.current!.scrollToIndex({ index: selectedIndex - Math.floor(ITEMS_VISIBLE / 2) })
  }

  const getItemLayout = (data: Array<number | undefined> | null | undefined, index: number) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  }

  return (
    <View style={styles.root}>
      <View style={styles.selector} />
      {unit && <Text style={styles.unit}>{unit}</Text>}
      <FlatList
        ref={ref}
        initialScrollIndex={selectedIndex! - Math.floor(ITEMS_VISIBLE / 2)}
        getItemLayout={getItemLayout}
        renderItem={({ item, index }) => {
          return (
            <Text style={[styles.item, index === selectedIndex ? styles.selected : undefined]}>
              {item !== undefined ? item.toFixed(fractionDigits) : ''}
            </Text>
          )
        }}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScrollBeginDrag={handleScrollStart}
        onMomentumScrollEnd={handleScrollEnd}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

function getIndexFromEvent(event: NativeSyntheticEvent<NativeScrollEvent>) {
  return (
    Math.floor((event.nativeEvent.contentOffset.y + ITEM_HEIGHT * 0.2) / ITEM_HEIGHT) +
    Math.floor(ITEMS_VISIBLE / 2)
  )
}

import React, { useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import Button from '../components/button'
import IconButton from '../components/icon-button'
import Scores from '../components/scores'
import { saveScoreHistory } from '../db'

export default function ScoreCounter() {
  const [scores, setScores] = useState<number[]>([])
  const sum = useMemo(() => scores.reduce((acc, score) => acc + score, 0), [scores])

  function add(value: number) {
    return () => {
      setScores([...scores, value])
    }
  }

  function remove() {
    setScores(scores.filter((_, index) => index !== scores.length - 1))
  }

  async function done() {
    if (scores.length > 0) {
      await saveScoreHistory(scores)
      setScores([])
    }
  }

  return (
    <View className="h-full">
      <View className="flex-1 relative">
        <Scores>{scores}</Scores>
        <View className="absolute bottom-4 right-4">
          <Text className="text-right text-4xl text-gray-300 mb-2">{scores.length}</Text>
          <Text className="text-right text-6xl text-gray-800">{sum}</Text>
        </View>
      </View>
      <View className="mx-4 mb-2 border-t border-gray-100" />
      <View className="flex flex-row">
        <View className="w-1/2" />
        <IconButton name="backspace" onPress={remove} />
        <IconButton name="done" onPress={done} />
      </View>
      <View className="flex flex-row">
        <View className="w-1/4" />
        <Button textStyle="text-gray-400" onPress={add(1)}>
          1
        </Button>
        <Button textStyle="text-gray-800" onPress={add(4)}>
          4
        </Button>
        <Button textStyle="text-red-600" onPress={add(7)}>
          7
        </Button>
      </View>
      <View className="flex flex-row">
        <Button textStyle="text-gray-300" onPress={add(0)}>
          X
        </Button>
        <Button textStyle="text-gray-800" onPress={add(3)}>
          3
        </Button>
        <Button textStyle="text-blue-500" onPress={add(6)}>
          6
        </Button>
        <Button textStyle="text-yellow-400" onPress={add(9)}>
          9
        </Button>
      </View>
      <View className="flex flex-row">
        <Button textStyle="text-gray-400" onPress={add(2)}>
          2
        </Button>
        <Button textStyle="text-blue-500" onPress={add(5)}>
          5
        </Button>
        <Button textStyle="text-red-600" onPress={add(8)}>
          8
        </Button>
        <Button textStyle="text-yellow-400" onPress={add(10)}>
          10
        </Button>
      </View>
    </View>
  )
}

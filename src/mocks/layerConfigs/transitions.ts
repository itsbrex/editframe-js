import { TransitionKey, TransitionOptions, TransitionType } from 'constant'

export const MockTransitionOptionsValue = {
  [TransitionKey.duration]: 1,
  [TransitionKey.type]: TransitionType.crossfadeIn,
}

export const mockTransitionsOptions = ({
  duration = MockTransitionOptionsValue.duration,
  type = MockTransitionOptionsValue.type,
}: TransitionOptions = MockTransitionOptionsValue): TransitionOptions[] => [
  {
    duration,
    type,
  },
]

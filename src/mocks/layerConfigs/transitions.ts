import { TransitionKey, TransitionOptions, TransitionType } from 'constant'

export const MockTransitionOptionsValue = {
  [TransitionKey.options]: {
    duration: 1,
  },
  [TransitionKey.type]: TransitionType.crossfadeIn,
}

export const mockTransitionsOptions = ({
  options = MockTransitionOptionsValue.options,
  type = MockTransitionOptionsValue.type,
}: TransitionOptions = MockTransitionOptionsValue): TransitionOptions[] => [
  {
    options,
    type,
  },
]

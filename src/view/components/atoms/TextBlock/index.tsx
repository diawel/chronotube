import Text, { TextPropsType } from 'src/view/components/atoms/Text'

export type TextBlockPropsType = TextPropsType

const TextBlock: React.FC<TextBlockPropsType> = (props) => {
  return (
    <div>
      <Text {...props} />
    </div>
  )
}

export default TextBlock

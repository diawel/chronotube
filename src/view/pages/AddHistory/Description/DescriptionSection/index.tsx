import { ReactNode } from 'react'
import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import TextBlock from 'src/view/components/atoms/TextBlock'
import styled from 'styled-components'

export type DescriptionSectionPropsType = {
  text: ReactNode
  figure: ReactNode
}

const DescriptionSection: React.FC<DescriptionSectionPropsType> = (props) => {
  const { text, figure } = props
  return (
    <Wrapper>
      <TextWrapper>
        <TextBlock color={color.black} size={fontSize.regular}>
          {text}
        </TextBlock>
      </TextWrapper>
      {figure}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const TextWrapper = styled.div`
  margin-bottom: 8px;
`

export default DescriptionSection

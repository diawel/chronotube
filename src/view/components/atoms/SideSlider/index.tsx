import styled from 'styled-components'
import { ReactNode } from 'react'

export type SideSliderPropsType = {
  margin: string
  children: ReactNode[]
}

const SideSlider: React.FC<SideSliderPropsType> = (props) => {
  const { margin, children } = props
  return (
    <OuterWrapper>
      <InnerWrapper padding={margin}>
        {children.map((content, index) => {
          return (
            <Content key={index} padding={margin}>
              {content}
            </Content>
          )
        })}
      </InnerWrapper>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  overflow: auto;
  scroll-snap-type: x mandatory;
`

type InnerWrapperStyleType = {
  padding: string
}

const InnerWrapper = styled.div<InnerWrapperStyleType>(
  (style) => `
    display: flex;
    padding-right: calc(${style.padding} * 2);
    width: fit-content;
  `
)

type ContentStyleType = {
  padding: string
}

const Content = styled.div<ContentStyleType>(
  (style) => `
    width: calc(100vw - ${style.padding} * 3);
    padding-left: ${style.padding};
    scroll-snap-align: start;
  `
)

export default SideSlider

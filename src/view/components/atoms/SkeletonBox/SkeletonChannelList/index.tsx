import { useContext } from 'react'
import { DeviceContext } from 'src/index'
import styled from 'styled-components'
import SkeletonBox from '..'

const cardsCount = 24

const SkeletonChannelList: React.FC = () => {
  const deviceType = useContext(DeviceContext)
  const gap = deviceType == 'mobile' ? '16px' : '24px'

  return (
    <Wrapper gap={gap}>
      {[...Array(cardsCount)].map((element, ei) => {
        return (
          <CardWrapper {...{ gap }} key={ei}>
            <SkeletonBox
              width="100%"
              aspectRatio="10 / 13"
              borderRadius="24px"
            />
          </CardWrapper>
        )
      })}
      {[...Array(cardsCount)].map((element, ei) => {
        return <FillBox key={ei} gap={gap} />
      })}
    </Wrapper>
  )
}

type WrapperStyleType = {
  gap: string
}

const Wrapper = styled.div<WrapperStyleType>(
  (style) => `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 calc(${style.gap} / 2);
    width: 100%;
    box-sizing: border-box;
  `
)

type FillBoxStyleType = {
  gap: string
}

const FillBox = styled.div<FillBoxStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: 0 calc(${style.gap} / 2);
    content-visibility: hidden;
  `
)

type CardWrapperStyleType = {
  gap: string
}

const CardWrapper = styled.div<CardWrapperStyleType>(
  (style) => `
    width: 200px;
    max-width: calc(50% - ${style.gap});
    margin: 0 calc(${style.gap} / 2) ${style.gap};
  `
)

export default SkeletonChannelList

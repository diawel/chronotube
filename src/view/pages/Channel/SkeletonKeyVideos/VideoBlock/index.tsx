import SkeletonVideoBox from 'src/view/components/atoms/SkeletonBox/SkeletonVideoBox'
import EnclosedTitle from 'src/view/components/molecules/EnclosedTitle'
import styled from 'styled-components'

export type VideoBlockPropsType = {
  subtitle: string
}

const VideoBlock: React.FC<VideoBlockPropsType> = (props) => {
  const { subtitle } = props
  return (
    <Wrapper>
      <TitleWrapper>
        <EnclosedTitle text={subtitle} />
      </TitleWrapper>
      <SkeletonVideoBox />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 48px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

export default VideoBlock

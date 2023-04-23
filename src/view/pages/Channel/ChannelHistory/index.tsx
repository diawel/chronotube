import EnclosedTitle from 'src/view/components/molecules/EnclosedTitle'
import styled from 'styled-components'
import ListedVideoBox from 'src/view/components/molecules/ListedVideoBox'
import { dateToString } from 'src/common/utils/dateToString'
import { color } from 'src/common/styles/color'
import TextBlock from 'src/view/components/atoms/TextBlock'
import { fontSize } from 'src/common/styles/fontSize'
import { ReactNode } from 'react'

export type ChannelHistoryPropsType = {
  histories: { id: string; title: string; playbackDate: Date }[]
  subscribeDate: Date
}

const ChannelHistory: React.FC<ChannelHistoryPropsType> = (props) => {
  const { histories, subscribeDate } = props

  let isSubscribed = false
  const insertSubscribeCard = (nodeList: ReactNode[]) => {
    nodeList.push(
      <PlaybackWrapper key={'subscribeCard'}>
        <SubscribeBanner>
          <TextBlock color={color.black} size={fontSize.small}>
            {`${dateToString(subscribeDate)}にチャンネル登録`}
          </TextBlock>
        </SubscribeBanner>
      </PlaybackWrapper>
    )
    isSubscribed = true
  }

  const historyList = histories.map((history) => {
    let elements: ReactNode[] = []
    if (!isSubscribed && history.playbackDate > subscribeDate)
      insertSubscribeCard(elements)
    elements.push(
      <PlaybackWrapper key={history.id}>
        <a
          href={`https://www.youtube.com/watch?v=${history.id}`}
          target="_blank"
          rel="nofollow"
        >
          <ListedVideoBox
            id={history.id}
            title={history.title}
            snippet={dateToString(history.playbackDate)}
          />
        </a>
      </PlaybackWrapper>
    )
    return elements
  })

  if (!isSubscribed) insertSubscribeCard(historyList)

  return (
    <div>
      <TitleWrapper>
        <EnclosedTitle text="すべての再生履歴" />
      </TitleWrapper>
      {historyList}
    </div>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

const SubscribeBanner = styled.div`
  padding: 4px 16px 6px;
  display: flex;
  justify-content: center;
  border: 1px solid ${color.black};
  border-radius: 8px;
`

const PlaybackWrapper = styled.div`
  margin-bottom: 12px;
`

export default ChannelHistory

import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import TextBlock from 'src/view/components/atoms/TextBlock'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import styled from 'styled-components'
import Text from 'src/view/components/atoms/Text'
import Button from 'src/view/components/atoms/Button'
import { subscription } from 'src/common/utils/db/subscription'
import { watchHistory } from 'src/common/utils/db/watchHistory'
import { useNavigate } from 'react-router-dom'
import TextWithFigure from 'src/view/components/molecules/TextWithFigure'
import { ml, mlString } from 'src/common/utils/switchLanguages'

const Wrapper = styled.div`
  margin-top: 80px;
`

const TitleWrapper = styled.div`
  margin-bottom: 16px;
`

const Clear: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <TitleWrapper>
        <TextBlock color={color.black} size={fontSize.medium} weight="bold">
          {ml({
            ja: 'すべてのデータを削除',
            en: 'Clear all data',
          })}
        </TextBlock>
      </TitleWrapper>
      <TextWithFigure
        text={ml({
          ja: (
            <>
              このボタンを押すと、すべてのデータが削除されます。再生履歴は
              <Text weight="bold">再ログインを行っても復元されません。</Text>
              必ずバックアップを取得してから、削除を行ってください。
            </>
          ),
          en: (
            <>
              All data will be deleted if you click this button. Watch history
              will not be restored even if you log in again. Be sure to back up
              your watch history before deleting.
            </>
          ),
        })}
        figure={
          <Button
            onClick={() => {
              if (
                confirm(
                  mlString({
                    ja: '本当に削除しますか？',
                    en: 'Do you really want to clear all data?',
                  })
                )
              ) {
                subscription.channels.clear()
                watchHistory.histories.clear()
                navigate('/')
              }
            }}
          >
            <PrimaryButton
              text={mlString({
                ja: 'すべてのデータを削除',
                en: 'Clear all data',
              })}
            />
          </Button>
        }
      />
    </Wrapper>
  )
}

export default Clear
